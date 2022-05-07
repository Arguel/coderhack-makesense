const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("config");

// Environment settings
const {
  app: { secretKey },
} = config;

exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix(),
  };

  return jwt.encode(payload, secretKey);
};

exports.createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, secretKey);
};

exports.decodedToken = function (token) {
  return jwt.decode(token, secretKey, true);
};
