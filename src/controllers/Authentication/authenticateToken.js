require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader;
  if (token == null) return res.sendStatus(404);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    // {expiresIn:'15s'},
    (err, user) => {
      if (err) return res.send("Invalid token").sendStatus(403);
      req.user = user;
      next();
    }
  );
};

module.exports = authenticateToken;
