const express = require("express");

const route = express.Router();

const {
  addSubCategoryPage,
  insertSubCategory,
  viewSubCategoryPage,
  deleteSubCategory,
  editSubCategoryPage,
  updateSubCategory,
} = require("../controllers/subCategoryController");

// Add SubCategory Page
route.get("/addSubCategoryPage", addSubCategoryPage);

// Insert SubCategory
route.post("/insertSubCategory", insertSubCategory);

// View SubCategory Page
route.get("/viewSubCategoryPage", viewSubCategoryPage);

// delete SubCategory
route.get("/deleteSubCategory/:id", deleteSubCategory);

// update SubCategory Page
route.get("/editSubCategoryPage/:id", editSubCategoryPage);

// update SubCategory
route.post("/updateSubCategory/:id", updateSubCategory);

module.exports = route;
