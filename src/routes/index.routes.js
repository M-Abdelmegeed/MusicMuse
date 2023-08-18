const express = require("express");
const registerUser = require("../controllers/Authentication/register");
const authenticateToken = require("../controllers/Authentication/authenticateToken");
const userLogin = require("../controllers/Authentication/login");
const googleLogin = require("../controllers/Authentication/googleLogin");
const authorize = require("../controllers/Authentication/authorize");
const addSong = require("../controllers/Songs/addSong");
const deleteSong = require("../controllers/Songs/deleteSong");
const getSongs = require("../controllers/Songs/getSongs");
const getGenres = require("../controllers/Songs/getGenres");

const router = express.Router();
router.post("/registerUser", registerUser);
router.post("/login", userLogin);
router.post("/addSong", authenticateToken, authorize, addSong);
router.post("/getSongs", authenticateToken, getSongs);
router.post("/getGenres", authenticateToken, getGenres);
router.post("/deleteSong", authenticateToken, authorize, deleteSong);
router.post("/googleLogin", (req, res) => {
  console.log("Received a POST request to /googleLogin");
  googleLogin(); // Call the function to set up the GoogleStrategy.
  res.send("Google login initialized!");
});
router.get("/error", (req, res) => {
  res.send("Login Failed!");
});
router.get("/", (req, res) => {
  res.send("Welcome to MusicMuse!");
});

module.exports = router;
