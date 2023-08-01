const jwt = require("jsonwebtoken");
const generateToken = (person) => {
  const user = {
    name: person.name,
    email: person.email,
    id: person._id,
    username: person.username,
    role: person.role,
  };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800s",
  });
  console.log({
    name: person.name,
    accessToken: accessToken,
  });
  return {
    name: person.name,
    accessToken: accessToken,
  };
};
module.exports = generateToken;
