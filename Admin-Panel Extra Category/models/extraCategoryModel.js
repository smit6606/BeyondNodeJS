const mongoose = require("mongoose");

const extraCategorySchema = mongoose.Schema({
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
  extraCategory_title: {
    type: String,
    required: true,
  },
  extraCategory_description: {
    type: String,
    required: true,
  },
});

const extraCategory = mongoose.model(
  "ExtraCategory",
  extraCategorySchema,
  "ExtraCategory"
);

module.exports = extraCategory;
