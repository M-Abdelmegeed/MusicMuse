const Song = require("../../models/Song");
const Redis = require("redis");
require("dotenv").config();

const DEFAULT_EXPIRATION = process.env.DEFAULT_EXPIRATION;
const getSongs = async (req, res) => {
  const redisClient = Redis.createClient();
  (async () => {
    await redisClient.connect();
  })();

  redisClient.on("connect", () => console.log("Redis Client Connected"));
  redisClient.on("error", (err) =>
    console.log("Redis Client Connection Error", err)
  );
  //   const userID = req.user.id;
  try {
    const cacheData = await redisClient.GET(`songs`);
    console.log(cacheData);
    if (cacheData) {
      // Cache hit
      console.log("Cache hit");
      res.send(JSON.parse(cacheData));
    } else {
      // Cache miss
      const songs = await Song.find({}).exec();
      redisClient.setEx(`songs`, 120, JSON.stringify(songs));
      res.json(songs);
    }
  } catch (err) {
    // Handle MongoDB or other errors
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = getSongs;
