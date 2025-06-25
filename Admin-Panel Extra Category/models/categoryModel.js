const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  c_title: {
    type: String,
    required: true,
  },
  c_description: {
    type: String,
    required: true,
  },
  c_image: {
    type: String,
    required: true,
  },
});

const category = mongoose.model("Category", categorySchema, "Category");

module.exports = category;
