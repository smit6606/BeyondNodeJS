const mongoose = require("mongoose");

// MongoDB Schema
const dishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// MongoDB Model
const dishes = mongoose.model("restaurant-menu", dishSchema);

module.exports = dishes;
