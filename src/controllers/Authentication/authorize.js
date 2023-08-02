const authorize = (req, res, next) => {
  console.log(req.user);
  if (req.user.role === "ADMIN") {
    next();
  } else {
    res.status(300).send("Foribidden");
  }
};

module.exports = authorize;
