const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  url: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String },
  likedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  objectName: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Song", songSchema);
