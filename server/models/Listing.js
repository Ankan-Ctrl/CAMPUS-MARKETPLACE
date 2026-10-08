const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    // Listing title
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Detailed description of the item
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    // Selling price
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Marketplace category
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    // Condition of the item
    condition: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    // Every user can be a seller.
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional image URL
    image: {
      type: String,
      default: "",
      maxlength: 2000,
    },

    // Listing availability
    // active = available
    // sold = sold offline
    status: {
      type: String,
      enum: ["active", "sold"],
      default: "active",
    },

    // Date/time when the seller marked the listing as sold
    soldAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
