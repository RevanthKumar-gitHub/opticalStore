const asyncHandler = require("express-async-handler");
const db = require("../db");
const bcrypt = require("bcryptjs");
const setCookie = require("../utils/jwtToken");
const { emailValidate, phoneNumberValidate } = require("../utils/validating");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error("All Fields are Mandatory!");
  }

  try {
    await emailValidate(email);
    await phoneNumberValidate(phone);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  const isEmailExists = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (isEmailExists.rows.length > 0) {
    res.status(400);
    throw new Error("Email Already Exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //insert new user
  try {
    const { rows } = await db.query(
      "INSERT INTO users(name,email,password,phone) VALUES($1,$2,$3,$4) RETURNING user_id,email,name",
      [name, email, hashedPassword, phone]
    );
    const user = rows[0];
    if (user) {
      //set token
      setCookie("Registartion SuccessFull!", res, 201, user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory!");
  }
  //validate email
  try {
    await emailValidate(email);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

  //fetchLogin
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  let user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  delete user.password;
  //set cookie
  setCookie("Login successfull", res, 200, user);
});

const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({
      success: true,
      message: "User Logged out!",
    });
};

const getMyProfile = (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};

module.exports = { login, register, logout ,getMyProfile };
