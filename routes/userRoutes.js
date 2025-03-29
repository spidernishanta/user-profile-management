const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

// register user
router.post("/register", register);

// login user
router.post("/login", login);

//get profile
router.get("/profile", auth, getProfile);

//update profile
router.put("/profile", auth, updateProfile);

module.exports = router;
