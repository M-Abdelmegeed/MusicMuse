const Song = require("../../models/Song");

const addSong = (req, res) => {
  const body = req.body;
  const filePath = body.filePath;
  const songName = body.name;
  const artist = body.artist;
};
module.exports = addSong;
