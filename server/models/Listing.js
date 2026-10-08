const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    // =========================================================
    // BASIC LISTING INFORMATION
    // =========================================================

    title: {
      type: String,
      required: [true, "Listing title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    // =========================================================
    // PRICE
    // =========================================================

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: Number.isFinite,
        message: "Price must be a valid number",
      },
    },

    // =========================================================
    // MARKETPLACE FILTERS
    // =========================================================

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: [
          "Electronics",
          "Books",
          "Furniture",
          "Clothing",
          "Vehicles",
          "Accessories",
          "Sports",
          "Other",
        ],
        message: "Invalid category",
      },
    },

    condition: {
      type: String,
      required: [true, "Condition is required"],
      trim: true,
      enum: {
        values: ["New", "Like New", "Good", "Fair"],
        message: "Invalid item condition",
      },
    },

    // =========================================================
    // SELLER
    // =========================================================

    // Every registered user can create a listing.
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is required"],
      index: true,
    },

    // =========================================================
    // IMAGE
    // =========================================================

    image: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "Image URL cannot exceed 2000 characters"],
    },

    // =========================================================
    // LISTING STATUS
    // =========================================================

    status: {
      type: String,
      enum: ["active", "sold"],
      default: "active",
      index: true,
    },

    // Automatically recorded when the listing becomes sold.
    soldAt: {
      type: Date,
      default: null,
    },
  },

  {
    // Automatically creates:
    // createdAt
    // updatedAt
    timestamps: true,
  }
);

// =========================================================
// DATABASE INDEXES
// =========================================================

// Newest active listings
listingSchema.index({
  status: 1,
  createdAt: -1,
});

// Category filtering
listingSchema.index({
  category: 1,
});

// Condition filtering
listingSchema.index({
  condition: 1,
});

// Price filtering / sorting
listingSchema.index({
  price: 1,
});

// Seller's listings
listingSchema.index({
  seller: 1,
  createdAt: -1,
});

// =========================================================
// AUTOMATIC SOLD DATE HANDLING
// =========================================================

listingSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === "sold" && !this.soldAt) {
      this.soldAt = new Date();
    }

    if (this.status === "active") {
      this.soldAt = null;
    }
  }

  next();
});

module.exports = mongoose.model("Listing", listingSchema);
