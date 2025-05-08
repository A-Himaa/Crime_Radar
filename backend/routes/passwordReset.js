const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User'); // Update path as needed
const router = express.Router();

// @route   POST /password/forget-password
// @desc    Handle forgot password by sending reset email
router.post('/forget-password', async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    // 2. Generate reset token & expiration
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    // 3. Save token & expiration in user doc
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // 4. Configure mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 5. Create reset link
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`; // Adjust frontend domain

    // 6. Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      text: `Hi ${user.name || ''},\n\nYou requested a password reset.\n\nClick this link to reset your password:\n${resetLink}\n\nIf you didn't request this, just ignore this email.\n\nThanks.`
    };

    // 7. Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email!' });
  } catch (error) {
    console.error('Error in /forget-password:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
