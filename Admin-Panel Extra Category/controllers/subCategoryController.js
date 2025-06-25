const category = require("../models/categoryModel");
const subCategory = require("../models/subCategoryModel");
const extraCategory = require("../models/extraCategoryModel");
const products = require("../models/productsModel");

// Add SubCategory Page
const addSubCategoryPage = async (req, res) => {
  try {
    const allCategory = await category.find({});

    res.render("subcategory/addSubCategoryPage", {
      allCategory: allCategory,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

// Insert SubCategory
const insertSubCategory = async (req, res) => {
  console.log(req.body);

  try {
    const insert = await subCategory.create(req.body);

    if (insert) {
      req.flash("success", "Subcategory inserted...");
    } else {
      req.flash("error", "Subcategory insertion failed...");
    }

    res.redirect("/subCategory/addSubCategoryPage");
  } catch (e) {
    console.log(e);
    req.flash("error", `Exception ${e}`);
    res.redirect("/subCategory/addSubCategoryPage");
  }
};

// View SubCategory
const viewSubCategoryPage = async (req, res) => {
  try {
    const subCategoryData = await subCategory
      .find()
      .populate("category_id")
      .exec();

    console.log("Sub Category Records", subCategoryData);

    if (subCategoryData) {
      res.render("subcategory/viewSubCategoryPage", {
        subCategoryData: subCategoryData,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      res.redirect("subcategory/viewSubCategoryPage");
      req.flash("error", "SubCategory not found..");
    }
  } catch (e) {
    console.log(e);
    res.redirect("subcategory/viewSubCategoryPage");
  }
};

// Delete SubCategory
const deleteSubCategory = async (req, res) => {
  const deleteId = req.params.id;

  console.log("Delete SubCategory Id", deleteId);

  try {
    const deletExtraCategory = await extraCategory.deleteMany({
      subCategory_id: deleteId,
    });

    const productDeleteData = await products.deleteMany({
      subcategory_id: req.params.id,
    });

    if (deletExtraCategory) {
      const deleteSubCategory = await subCategory.findByIdAndDelete(deleteId);
      console.log(deleteSubCategory);

      if (deleteSubCategory) {
        req.flash(
          "success",
          `${deleteSubCategory.subcategory_title} deleted successfully...`
        );
      } else {
        req.flash("error", "SubCategory Deletion failed...");
      }
    } else {
      req.flash("error", "Deletion Failed....");
    }

    res.redirect("/subcategory/viewSubCategoryPage");
  } catch (e) {
    console.log(e);
    res.redirect("/subcategory/viewSubCategoryPage");
  }
};

// Update SubCategory Page
const editSubCategoryPage = async (req, res) => {
  try {
    const allCategory = await category.find({});
    const subcategoryData = await subCategory.findById(req.params.id);

    allCategory && subcategoryData
      ? res.render("subcategory/editSubCategoryPage", {
          allCategory,
          subcategoryData,
          success: "",
          error: "",
        })
      : res.redirect("back");
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

// Update SubCategory
const updateSubCategory = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  try {
    const updateData = await subCategory.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (updateData) {
      req.flash("success", "SubCateory is updated...");
    } else {
      req.flash("error", "SubCateory is not updated...");
    }
    res.redirect("/subcategory/viewSubCategoryPage");
  } catch (e) {
    console.log(e);

    res.redirect("back");
  }
};

module.exports = {
  addSubCategoryPage,
  insertSubCategory,
  viewSubCategoryPage,
  deleteSubCategory,
  editSubCategoryPage,
  updateSubCategory,
};
