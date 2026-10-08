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

    // User who created the listing
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
