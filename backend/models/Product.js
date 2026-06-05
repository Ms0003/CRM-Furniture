const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [120, "Product title cannot exceed 120 characters"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      maxlength: [60, "Category cannot exceed 60 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [1200, "Description cannot exceed 1200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    imageUrl: {
      type: String,
      required: [true, "Product image URL is required"],
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
