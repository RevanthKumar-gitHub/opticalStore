const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const setCookie = (message, res, statusCode, user) => {
  const token = generateToken(user);
  const options = {
    httpOnly: true,
    maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    token,
    user,
  });
};

module.exports = setCookie;
