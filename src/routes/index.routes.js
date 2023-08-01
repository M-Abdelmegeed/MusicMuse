const express = require("express");
const registerUser = require("../controllers/Authentication/register");
const authenticateToken = require("../controllers/Authentication/authenticateToken");
const userLogin = require("../controllers/Authentication/login");
const googleLogin = require("../controllers/Authentication/googleLogin");
const googleSuccess = require("../controllers/Authentication/googleSuccess");

const router = express.Router();
router.post("/registerUser", registerUser);
router.post("/login", userLogin);
router.post("/googleLogin", (req, res) => {
  console.log("Received a POST request to /googleLogin");
  googleLogin(); // Call the function to set up the GoogleStrategy.
  res.send("Google login initialized!");
});
router.get("/success", googleSuccess);
router.get("/error", (req, res) => {
  res.send("Login Failed!");
});
router.get("/", (req, res) => {
  res.send("Welcome to MusicMuse!");
});

module.exports = router;