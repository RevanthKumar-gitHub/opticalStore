const { login, register, logout, getMyProfile } = require("../controllers/admin");
const isAuthenticated = require("../middlewares/auth");
const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout",isAuthenticated,logout);
router.get("/profile",isAuthenticated,getMyProfile);

module.exports = router;
