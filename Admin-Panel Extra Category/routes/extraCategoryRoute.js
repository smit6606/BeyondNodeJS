const express = require("express");

const route = express.Router();

const {
  addExtraCategoryPage,
  insertExtraCategory,
  viewExtraCategoryPage,
  deleteExtraCategory,
  editExtraCategoryPage,
  updateExtraCategory,
} = require("../controllers/extraCategoryController");

// Add Extra Category Page
route.get("/addExtraCategoryPage", addExtraCategoryPage);

// Insert Extra Category
route.post("/insertExtraCategory", insertExtraCategory);

// View Extra Category Page
route.get("/viewExtraCategoryPage", viewExtraCategoryPage);

// Delete
route.get("/deleteExtraCategory/:id", deleteExtraCategory);

// Update Extra Category Page
route.get("/editExtraCategoryPage/:id", editExtraCategoryPage);

// Update Extra Category
route.post("/updateExtraCategory/:id", updateExtraCategory);

module.exports = route;
