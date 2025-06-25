const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory_title: {
    type: String,
    required: true,
  },
  subcategory_description: {
    type: String,
    required: true,
  },
});

const subCategory = mongoose.model(
  "SubCategory",
  subCategorySchema,
  "SubCategory"
);

module.exports = subCategory;
