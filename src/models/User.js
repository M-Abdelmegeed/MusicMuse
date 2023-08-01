const mongoose = require("mongoose");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validateEmail, "invalid email"],
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    // required: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  googleId: { type: String, unique: true, sparse: true },
  songs: [{ type: mongoose.Types.ObjectId, ref: "song" }],
  role: { type: String, default: "USER" },
});

module.exports = mongoose.model("User", userSchema);
