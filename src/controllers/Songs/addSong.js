const Song = require("../../models/Song");
const uploadToS3 = require("../AWS/uploadToS3");
const getObjectUrl = require("../AWS/getObjectUrl");

const addSong = async (req, res) => {
  const body = req.body;
  const filePath = body.filePath;
  const songName = body.songName;
  const artist = body.artist;
  const genre = body.genre;
  var file = filePath.split("/");
  var filename = file[file.length - 1];
  await uploadToS3("mymusic10", filename, filePath);
  const url = await getObjectUrl("mymusic10", filename);
  console.log(url);
  const newSong = new Song({
    songName: songName,
    artist: artist,
    genre: genre,
    url: url,
    objectName: filename,
  });
  await newSong.save();
  res.send("New song saved successfully");
};
module.exports = addSong;
