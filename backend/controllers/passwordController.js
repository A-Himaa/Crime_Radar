const User = require('../models/User'); // adjust path
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Secret for JWT token used in reset
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate token (valid for 1 hour)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Store token temporarily in DB (or in-memory or Redis in production)
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    // Simulate sending email with reset link
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    console.log('Password reset link:', resetLink);

    res.status(200).json({ message: 'Password reset link sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
