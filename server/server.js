const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// REGISTER
// ===============================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, department, password } = req.body;

    if (!name || !email || !department || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      department: department.trim(),
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===============================
// LOGIN
// ===============================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.json({
    message: "Campus Marketplace API is running",
  });
});


// ---------------------------------------------------------
// MONGODB CONNECTION
// ---------------------------------------------------------
// Vercel can create/reuse serverless function instances.
// We keep track of the connection so that we don't create
// unnecessary MongoDB connections on every request.

let mongoConnection = null;

async function connectToMongoDB() {
  // If MongoDB is already connected, use the existing connection.
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // If a connection attempt is already in progress,
  // wait for that same connection instead of creating another one.
  if (!mongoConnection) {
    mongoConnection = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    await mongoConnection;

    console.log("MongoDB connected successfully");
  } catch (error) {
    // Clear the failed connection so the next request
    // can try connecting to MongoDB again.
    mongoConnection = null;

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    throw error;
  }
}


// ---------------------------------------------------------
// DATABASE CONNECTION MIDDLEWARE
// ---------------------------------------------------------
// Every API request waits for MongoDB before reaching
// the authentication routes.
//
// This prevents errors such as:
// "Operation users.findOne() buffering timed out"

app.use(async (req, res, next) => {
  try {
    await connectToMongoDB();
    next();
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});


// Export the Express application for Vercel.
module.exports = app;
