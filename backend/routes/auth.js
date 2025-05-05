const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For authentication token
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Login Route
const adminEmail = "admin@example.com";
const adminPassword = "admin123";

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with:", email);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found!");
      return res.status(400).json({ success: false, message: "User not found!" });
    }
    console.log("User found:", user);
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match!");
      return res.status(400).json({ success: false, message: "Invalid credentials!" });
    }
    const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

    // Generate JWT Token (Optional: For authentication)
    console.log("Login successful!");
    return res.status(200).json({ success: true, token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
