const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = require("express").Router();

const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_EMAIL = "admin@example.com"; // Define the admin's email

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }

    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// ✅ SignUp Route
router.post("/signup", async (req, res) => {
  console.log("Received data from frontend:", req.body);

  try {
    const { userDetails, trustedPersonDetails } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email: userDetails.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userDetails.password, 12);

    // Assign role based on email
    //const role = userDetails.email === ADMIN_EMAIL ? "admin" : "user";

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

    return res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// ✅ Login Route (Generates JWT Token)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with role
    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "2h" });

    res.json({ message: "Login successful", role: user.role, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Fetch User Details by Email
router.get("/user", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).select("-password"); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin-Only Route (Protected)
router.get("/admin", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome to the admin panel!" });
});

// ✅ Update User Details
router.put("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    console.log("Updating user:", userId, updatedData);

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
});

// ✅ Delete User and Trusted Person
router.delete("/user", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required for deletion" });
    }

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User and trusted person details deleted successfully!" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// ✅ Get All Users (No Admin Check)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("firstName lastName email"); // Only return firstName, lastName, and email
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

// ✅ Fetch User Details by ID

router.get("/auth/users/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email: email });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


// ✅ Delete User by ID
router.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});



module.exports = router;
