const asyncHandler = require("express-async-handler");
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies ? req.cookies : null;
  if (!token) {
    res.status(401);
    throw new Error("User in not authenticated");
  }
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const { rows } = await db.query(
    "SELECT user_id,email,name,phone FROM users WHERE user_id = $1",
    [decodedUser.user_id]
  );

  req.user = rows[0];
  next();
});

module.exports = isAuthenticated;
