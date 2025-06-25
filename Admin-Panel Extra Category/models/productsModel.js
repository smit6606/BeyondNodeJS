const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    extraCategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExtraCategory",
      required: true,
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    product_description: {
      type: String,
      trim: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
