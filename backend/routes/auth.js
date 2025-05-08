const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET_KEY = "your_secret_key";

// Hardcoded admin credentials
const adminEmail = "admin@example.com";
const adminPassword = "admin123";

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with:", email);

  try {
    // 🔒 Check for hardcoded admin first
    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign({ email, role: "admin" }, SECRET_KEY, { expiresIn: "2h" });

      return res.status(200).json({
        success: true,
        token,
        email,
        role: "admin"
      });
    }

    // 👤 Otherwise, check database for regular users
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found!");
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ success: false, message: "Invalid credentials!" });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "2h" });

    return res.status(200).json({
      success: true,
      token,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
