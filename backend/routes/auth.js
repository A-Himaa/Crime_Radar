const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the User model
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY; // Store in .env file

// Hardcoded admin credentials (you can change this or store it in the .env file)
const adminEmail = "admin@example.com";
const adminPassword = "admin123";

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with:", email);

    // ✅ Handle Admin Login Directly
    if (email === adminEmail && password === adminPassword) {
      console.log("Admin login successful!");
      const token = jwt.sign({ email, role: "admin" }, SECRET_KEY, { expiresIn: "2h" });
      return res.status(200).json({
        success: true,
        token,
        email,
        role: "admin", // Send admin role to frontend
      });
    }

    // ✅ Check for Regular User in MongoDB
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

    // Generate JWT Token with user role
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "2h" });

    console.log("User login successful!");

    // Send token and role to frontend
    return res.status(200).json({
      success: true,
      token,
      email: user.email,
      role: user.role, // Send role for frontend
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
