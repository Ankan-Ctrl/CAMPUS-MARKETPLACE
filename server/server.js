const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// =========================================================
// BASIC EXPRESS CONFIGURATION
// =========================================================

// Allow requests from the frontend.
app.use(cors());

// Allow the server to receive JSON request bodies.
app.use(express.json());


// =========================================================
// MONGODB CONNECTION
// =========================================================

// Store the current MongoDB connection attempt.
// This helps Vercel reuse an existing connection.
let mongoConnection = null;

async function connectToMongoDB() {

  // readyState === 1 means MongoDB is already connected.
  // In that case, we don't need to connect again.
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // If there is no connection attempt currently running,
  // start a new MongoDB connection.
  if (!mongoConnection) {

    mongoConnection = mongoose.connect(
      process.env.MONGODB_URI,
      {
        // Stop waiting after 10 seconds if MongoDB
        // cannot be reached.
        serverSelectionTimeoutMS: 10000,
      }
    );
  }

  try {

    // Wait for MongoDB to finish connecting.
    await mongoConnection;

    console.log("MongoDB connected successfully");

  } catch (error) {

    // The connection attempt failed.
    // Clear it so a future request can try again.
    mongoConnection = null;

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    // Pass the error to the caller.
    throw error;
  }
}


// =========================================================
// TEST / HEALTH ROUTE
// =========================================================

// This route simply checks whether the API is running.
// It does NOT need MongoDB.
app.get("/", (req, res) => {

  res.json({
    message: "Campus Marketplace API is running",
  });

});


// =========================================================
// DATABASE MIDDLEWARE
// =========================================================

// IMPORTANT:
// This middleware is BEFORE the authentication routes.
//
// Therefore, whenever someone calls /api/...,
// MongoDB will be connected before the route runs.

app.use("/api", async (req, res, next) => {

  try {

    // Make sure MongoDB is connected.
    await connectToMongoDB();

    // MongoDB is ready, so continue to the requested route.
    next();

  } catch (error) {

    console.error(
      "Database middleware error:",
      error.message
    );

    return res.status(500).json({
      message: "Database connection failed",
    });

  }

});


// =========================================================
// REGISTER
// =========================================================

// POST /api/auth/register
app.post("/api/auth/register", async (req, res) => {

  try {

    const {
      name,
      email,
      department,
      password
    } = req.body;


    // Make sure all required fields are present.
    if (!name || !email || !department || !password) {

      return res.status(400).json({
        message: "All fields are required",
      });

    }


    // Normalize the email before storing/searching it.
    const normalizedEmail = email
      .toLowerCase()
      .trim();


    // Check whether the user already exists.
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });


    if (existingUser) {

      return res.status(409).json({
        message: "User already exists",
      });

    }


    // Hash the password before saving it.
    // The actual password will never be stored directly.
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // Create the user in MongoDB.
    const user = await User.create({

      name: name.trim(),

      email: normalizedEmail,

      department: department.trim(),

      password: hashedPassword,

    });


    // Return the newly created user.
    // Password is intentionally NOT returned.
    return res.status(201).json({

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

    console.error(
      "Registration error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });

  }

});


// =========================================================
// LOGIN
// =========================================================

// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // Make sure both fields were provided.
    if (!email || !password) {

      return res.status(400).json({
        message: "Email and password are required",
      });

    }


    // Normalize the email.
    const normalizedEmail = email
      .toLowerCase()
      .trim();


    // Find the user in MongoDB.
    const user = await User.findOne({
      email: normalizedEmail,
    });


    // User does not exist.
    if (!user) {

      return res.status(401).json({
        message: "Invalid email or password",
      });

    }


    // Compare the entered password with
    // the hashed password stored in MongoDB.
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );


    // Password is incorrect.
    if (!passwordMatch) {

      return res.status(401).json({
        message: "Invalid email or password",
      });

    }


    // Login successful.
    // Do not send the password to the frontend.
    return res.json({

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

    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });

  }

});


// =========================================================
// VERCEL EXPORT
// =========================================================

// Vercel handles the server itself.
// Do NOT use app.listen() here.
module.exports = app;
