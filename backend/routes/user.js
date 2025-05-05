const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// SignUp Route
router.post('/signup', async (req, res) => {
  try {
    const { userDetails, trustedPersonDetails } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email: userDetails.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userDetails.password, 12);

    // Create new user instance
    const newUser = new User({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      phone: userDetails.phone,
      nic: userDetails.nic,
      password: hashedPassword,
      trustedPerson: trustedPersonDetails,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User signed up successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
