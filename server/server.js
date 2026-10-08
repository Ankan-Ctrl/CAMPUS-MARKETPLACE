// =========================================================
// IMPORTS
// =========================================================

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Listing = require("./models/Listing");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();


// =========================================================
// EXPRESS APP
// =========================================================

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
// This allows Vercel serverless instances to reuse
// an existing connection when possible.
let mongoConnection = null;


async function connectToMongoDB() {

  // readyState === 1 means MongoDB is already connected.
  // No new connection is necessary.
  if (mongoose.connection.readyState === 1) {
    return;
  }


  // Start a new connection only if one is not
  // already being attempted.
  if (!mongoConnection) {

    mongoConnection = mongoose.connect(
      process.env.MONGODB_URI,
      {
        // Stop waiting if MongoDB cannot be reached
        // within 10 seconds.
        serverSelectionTimeoutMS: 10000,
      }
    );

  }


  try {

    // Wait for the MongoDB connection.
    await mongoConnection;

    console.log(
      "MongoDB connected successfully"
    );

  } catch (error) {

    // Clear the failed connection so that a future
    // request can attempt to reconnect.
    mongoConnection = null;

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    throw error;
  }
}


// =========================================================
// HEALTH CHECK
// =========================================================

// GET /
//
// Used to check whether the API is running.
//
// This route does not require MongoDB.

app.get("/", (req, res) => {

  res.json({
    message:
      "Campus Marketplace API is running",
  });

});


// =========================================================
// DATABASE MIDDLEWARE
// =========================================================
//
// Every /api request must have an active MongoDB
// connection before its route is executed.
//
// IMPORTANT:
// This must appear BEFORE the API routes.

app.use("/api", async (req, res, next) => {

  try {

    // Make sure MongoDB is connected.
    await connectToMongoDB();

    // MongoDB is ready.
    next();

  } catch (error) {

    console.error(
      "Database middleware error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Database connection failed",
    });

  }

});


// =========================================================
// AUTHENTICATION
// =========================================================


// =========================================================
// REGISTER
// =========================================================
//
// POST /api/auth/register
//
// Creates a new user in MongoDB.

app.post(
  "/api/auth/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        department,
        password,
      } = req.body;


      // Make sure all required fields exist.
      if (
        !name ||
        !email ||
        !department ||
        !password
      ) {

        return res.status(400).json({
          message:
            "All fields are required",
        });

      }


      // Normalize the email.
      const normalizedEmail =
        email.toLowerCase().trim();


      // Check whether the email already exists.
      const existingUser =
        await User.findOne({
          email: normalizedEmail,
        });


      if (existingUser) {

        return res.status(409).json({
          message:
            "User already exists",
        });

      }


      // Hash the password before storing it.
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );


      // Create the user.
      const user =
        await User.create({

          name: name.trim(),

          email: normalizedEmail,

          department:
            department.trim(),

          password:
            hashedPassword,

        });


      // Never send the password back.
      return res.status(201).json({

        message:
          "User registered successfully",

        user: {

          id: user._id,

          name: user.name,

          email: user.email,

          department:
            user.department,

          role: user.role,

        },

      });

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);


// =========================================================
// LOGIN
// =========================================================
//
// POST /api/auth/login

app.post(
  "/api/auth/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;


      // Check required fields.
      if (!email || !password) {

        return res.status(400).json({
          message:
            "Email and password are required",
        });

      }


      // Normalize email.
      const normalizedEmail =
        email.toLowerCase().trim();


      // Find user.
      const user =
        await User.findOne({
          email: normalizedEmail,
        });


      if (!user) {

        return res.status(401).json({
          message:
            "Invalid email or password",
        });

      }


      // Compare the entered password with
      // the hashed password stored in MongoDB.
      const passwordMatch =
        await bcrypt.compare(
          password,
          user.password
        );


      if (!passwordMatch) {

        return res.status(401).json({
          message:
            "Invalid email or password",
        });

      }


      // Login successful.
      return res.json({

        message:
          "Login successful",

        user: {

          id: user._id,

          name: user.name,

          email: user.email,

          department:
            user.department,

          role: user.role,

        },

      });

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);


// =========================================================
// LISTINGS
// =========================================================


// =========================================================
// CREATE LISTING
// =========================================================
//
// POST /api/listings
//
// Every registered user can create a listing.
//
// There is NO requirement for a special "seller" role.
//
// A buyer can also sell.

app.post(
  "/api/listings",
  async (req, res) => {

    try {

      const {
        title,
        description,
        price,
        category,
        condition,
        seller,
        image,
      } = req.body;


      // Check required fields.
      if (
        !title ||
        !description ||
        price === undefined ||
        !category ||
        !condition ||
        !seller
      ) {

        return res.status(400).json({

          message:
            "All required fields must be provided",

        });

      }


      // Make sure the user exists.
      const user =
        await User.findById(seller);


      if (!user) {

        return res.status(404).json({

          message:
            "Seller not found",

        });

      }


      // Create the listing.
      const listing =
        await Listing.create({

          title,

          description,

          price,

          category,

          condition,

          seller,

          image: image || "",

          // Every new listing starts as active.
          status: "active",

        });


      return res.status(201).json({

        message:
          "Listing created successfully",

        listing,

      });

    } catch (error) {

      console.error(
        "Create listing error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);


// =========================================================
// GET ALL ACTIVE LISTINGS
// =========================================================
//
// GET /api/listings
//
// Only active listings are returned.
//
// Sold listings remain in MongoDB but are not shown
// in the normal marketplace.

app.get(
  "/api/listings",
  async (req, res) => {

    try {

      const listings =
        await Listing.find({
          status: "active",
        })
          .populate(
            "seller",
            "name email department"
          )
          .sort({
            createdAt: -1,
          });


      return res.json({
        listings,
      });

    } catch (error) {

      console.error(
        "Get listings error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);


// =========================================================
// GET ONE LISTING
// =========================================================
//
// GET /api/listings/:id

app.get(
  "/api/listings/:id",
  async (req, res) => {

    try {

      const listing =
        await Listing.findById(
          req.params.id
        ).populate(
          "seller",
          "name email department"
        );


      if (!listing) {

        return res.status(404).json({

          message:
            "Listing not found",

        });

      }


      return res.json({
        listing,
      });

    } catch (error) {

      console.error(
        "Get listing error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);


// =========================================================
// UPDATE LISTING
// =========================================================
//
// PUT /api/listings/:id
//
// The owner can modify an active listing.
//
// Editable fields:
//
// title
// description
// price
// category
// condition
// image
//
// Sold listings cannot be edited.

app.put(
  "/api/listings/:id",
  async (req, res) => {

    try {

      const {
        seller,
        title,
        description,
        price,
        category,
        condition,
        image,
      } = req.body;


      // Find the listing.
      const listing =
        await Listing.findById(
          req.params.id
        );


      if (!listing) {

        return res.status(404).json({

          message:
            "Listing not found",

        });

      }


      // Make sure the requesting user owns
      // the listing.
      if (
        !seller ||
        listing.seller.toString() !==
          seller.toString()
      ) {

        return res.status(403).json({

          message:
            "You can only modify your own listing",

        });

      }


      // Sold listings cannot be edited.
      if (listing.status === "sold") {

        return res.status(400).json({

          message:
            "Sold listings cannot be modified",

        });

      }


      // Update only fields that were supplied.
      if (title !== undefined) {
        listing.title = title;
      }

      if (description !== undefined) {
        listing.description =
          description;
      }

      if (price !== undefined) {
        listing.price = price;
      }

      if (category !== undefined) {
        listing.category =
          category;
      }

      if (condition !== undefined) {
        listing.condition =
          condition;
      }

      if (image !== undefined) {
        listing.image = image;
      }


      // Save updated listing.
      await listing.save();


      return res.json({

        message:
          "Listing updated successfully",

        listing,

      });

    } catch (error) {

      console.error(
        "Update listing error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);


// =========================================================
// MARK LISTING AS SOLD
// =========================================================
//
// PATCH /api/listings/:id/sold
//
// The actual transaction happens OFFLINE.
//
// This endpoint only records that the seller
// has completed the offline sale.

app.patch(
  "/api/listings/:id/sold",
  async (req, res) => {

    try {

      const {
        seller,
      } = req.body;


      // Find the listing.
      const listing =
        await Listing.findById(
          req.params.id
        );


      if (!listing) {

        return res.status(404).json({

          message:
            "Listing not found",

        });

      }


      // Make sure the requesting user owns
      // the listing.
      if (
        !seller ||
        listing.seller.toString() !==
          seller.toString()
      ) {

        return res.status(403).json({

          message:
            "You can only mark your own listing as sold",

        });

      }


      // Check whether it is already sold.
      if (listing.status === "sold") {

        return res.status(400).json({

          message:
            "Listing is already marked as sold",

        });

      }


      // Mark listing as sold.
      listing.status = "sold";

      listing.soldAt = new Date();


      // Save the changes.
      await listing.save();


      return res.json({

        message:
          "Listing marked as sold",

        listing,

      });

    } catch (error) {

      console.error(
        "Mark listing sold error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);


// =========================================================
// DELETE LISTING
// =========================================================
//
// DELETE /api/listings/:id
//
// Only the owner can delete the listing.

app.delete(
  "/api/listings/:id",
  async (req, res) => {

    try {

      const {
        seller,
      } = req.body;


      // Find listing.
      const listing =
        await Listing.findById(
          req.params.id
        );


      if (!listing) {

        return res.status(404).json({

          message:
            "Listing not found",

        });

      }


      // Make sure the requesting user owns
      // the listing.
      if (
        !seller ||
        listing.seller.toString() !==
          seller.toString()
      ) {

        return res.status(403).json({

          message:
            "You can only delete your own listing",

        });

      }


      // Delete listing.
      await Listing.findByIdAndDelete(
        req.params.id
      );


      return res.json({

        message:
          "Listing deleted successfully",

      });

    } catch (error) {

      console.error(
        "Delete listing error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);


// =========================================================
// VERCEL EXPORT
// =========================================================
//
// Do NOT use app.listen() here.
// Vercel handles the Express application.

module.exports = app;
