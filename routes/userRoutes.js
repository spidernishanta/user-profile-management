const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const user = new User({ name, email, password, address });
    await user.save();

    //generate jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token: token, message: "user created successfully", success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email format");
    }

    //find user by email
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }

    //password checking
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    //token generation with expiration of 1h
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token: token, message: "login successful", success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//get profile
router.get("/profile", auth, async (req, res) => {
  try {
    const userData = {
      name: req.user.name,
      email: req.user.email,
      address: req.user.address,
      bio: req.user.bio,
      profilePic: req.user.profilePic,
    };
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//update profile
router.put("/profile", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "address", "bio", "profilePic"];
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidUpdate) throw new Error("Invalid updates!");
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json({message: "profile updated successfully", success: true});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
