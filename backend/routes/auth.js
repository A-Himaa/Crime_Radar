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

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT Token (Optional: For authentication)
    const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
