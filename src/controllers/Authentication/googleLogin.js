const passport = require("passport");
const User = require("../../models/User");
const generateToken = require("./generateToken");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const googleLogin = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        scope: ["profile", "email"],
        state: true,
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log(profile._json);
        const user = await User.findOne({ googleId: profile.id }).catch((err) =>
          cb(err)
        );
        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            name: profile._json.name,
            email: profile._json.email,
            googleId: profile.id,
          });
          const result = await newUser.save();
          done(null, result);
        }
      }
    )
  );
  //serialize user
  passport.serializeUser((user, done) => done(null, user.id));

  //deserialize user
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

module.exports = googleLogin;
