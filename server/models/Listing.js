const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    // Product/listing title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Detailed description of the item
    description: {
      type: String,
      required: true,
      trim: true,
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
    },

    // Condition of the item
    condition: {
      type: String,
      required: true,
      trim: true,
    },

    // Reference to the user who created the listing
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional image URL
    image: {
      type: String,
      default: "",
    },
  },
  {
    // Automatically creates createdAt and updatedAt
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
