const { expressjwt: jwt } = require("express-jwt");

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}

const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "payload"
});

module.exports = auth;
