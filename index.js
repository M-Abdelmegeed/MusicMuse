const express = require("express"); // express server
require("dotenv").config(); // use the env variables
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/routes/index.routes"); // used to handle routes
const passport = require("passport");
const session = require("express-session");
const googleLogin = require("./src/controllers/Authentication/googleLogin");
const generateToken = require("./src/controllers/Authentication/generateToken");
const Genre = require("./src/models/Genre");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: "50mb" }));
app.use(router);
const uri = process.env.MONGO_DB_CONNECTION;
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("MongoDB connection successful");
        app.listen(PORT);
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
}
new Database();
googleLogin();
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/error"); // Or handle login failure appropriately
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const response = generateToken(user);
      res.json(response);
    });
  })(req, res, next);
});

app.use((req, res) => {
  res.status(404).send("Error: routes doesn't exist (-_-)");
});
