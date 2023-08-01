require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("./generateToken");

const userLogin = async (req, res) => {
  // Authenticate User
  const email = req.body.email;
  const password = req.body.password;
  const person = await User.findOne({ email: email }).exec();
  if (!person) {
    res.status(400).send("No account exists for this email");
  }
  const match = bcrypt.compareSync(
    password + process.env.PEPPER,
    person.password
  );
  if (!match) {
    res.status(400).send("User not found");
  } else {
    const response = generateToken(person);
    res.json(response);
  }
};

module.exports = userLogin;
