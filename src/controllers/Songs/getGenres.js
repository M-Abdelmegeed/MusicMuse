const Genre = require("../../models/Genre");
const Redis = require("redis");
require("dotenv").config();

const getGenres = async (req, res) => {
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
      const genres = await Genre.find({}).exec();
      redisClient.setEx(`genres`, 3000, JSON.stringify(genres));
      res.json(genres);
    }
  } catch (err) {
    // Handle MongoDB or other errors
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = getGenres;
