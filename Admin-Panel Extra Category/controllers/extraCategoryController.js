const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const ExtraCategory = require("../models/extraCategoryModel");

// Add Extra Category Page
const addExtraCategoryPage = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    const allSubCategory = await SubCategory.find({});

    if (allCategory && allSubCategory) {
      res.render("extracategory/addExtraCategoryPage", {
        success: req.flash("success"),
        error: req.flash("error"),
        allCategory,
        allSubCategory,
      });
    } else {
      res.redirect("/extraCategory/addExtraCategoryPage");
    }
  } catch (e) {
    console.log(e);
    res.redirect("/extraCategory/addExtraCategoryPage");
  }
};

// Insert Extra Categoru
const insertExtraCategory = async (req, res) => {
  console.log(req.body);

  try {
    const insertExtraCategory = await ExtraCategory.create(req.body);

    insertExtraCategory
      ? req.flash("success", `${req.body.extraCategory_title} is interted...`)
      : req.flash(
          "error",
          `${req.body.extraCategory_title} is intertion failed...`
        );

    res.redirect("/extraCategory/addExtraCategoryPage");
  } catch (e) {
    console.log(e);
    res.redirect("/extraCategory/addExtraCategoryPage");
  }
};

// View Extra Category Page
const viewExtraCategoryPage = async (req, res) => {
  try {
    const extraCategoryData = await ExtraCategory.find()
      .populate("category_id")
      .populate("subCategory_id");

    console.log(extraCategoryData);

    extraCategoryData
      ? res.render("extracategory/viewExtraCategoryPage", {
          success: req.flash("success"),
          error: req.flash("error"),
          extraCategoryData,
        })
      : res.redirect("back");
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

// Delete Extra Category
const deleteExtraCategory = async (req, res) => {
  console.log(req.params);

  try {
    const deleteExtraCategory = await ExtraCategory.deleteOne({
      _id: req.params.id,
    });

    if (deleteExtraCategory) {
      req.flash("success", "Extra Category Deleted...");
    } else {
      req.flash("error", "Extra Category Deletion Failed...");
    }
    res.redirect("/extraCategory/viewExtraCategoryPage");
  } catch (e) {
    console.log(e);
    req.flash("error", `Exception : ${e}`);
    res.redirect("/extraCategory/viewExtraCategoryPage");
  }
};
// Edit Extra Category Page
const editExtraCategoryPage = async (req, res) => {
  try {
    const extraCategoryData = await ExtraCategory.findById(req.params.id);
    const allCategory = await Category.find({});
    const allSubCategory = await SubCategory.find({});

    if (extraCategoryData && allCategory && allSubCategory) {
      res.render("extracategory/editExtraCategoryPage", {
        success: req.flash("success"),
        error: req.flash("error"),
        extraCategoryData,
        allCategory,
        allSubCategory,
      });
    } else {
      req.flash("error", "Extra Category not found...");
      res.redirect("/extraCategory/viewExtraCategoryPage");
    }
  } catch (e) {
    console.log(e);
    req.flash("error", `Exception : ${e}`);
    res.redirect("/extraCategory/viewExtraCategoryPage");
  }
};
// Update Extra Category
const updateExtraCategory = async (req, res) => {
  console.log(req.body);

  try {
    const updateExtraCategory = await ExtraCategory.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (updateExtraCategory) {
      req.flash("success", `${req.body.extraCategory_title} is updated...`);
    } else {
      req.flash(
        "error",
        `${req.body.extraCategory_title} is updation failed...`
      );
    }
    res.redirect("/extraCategory/viewExtraCategoryPage");
  } catch (e) {
    console.log(e);
    req.flash("error", `Exception : ${e}`);
    res.redirect("/extraCategory/viewExtraCategoryPage");
  }
};

module.exports = {
  addExtraCategoryPage,
  insertExtraCategory,
  viewExtraCategoryPage,
  deleteExtraCategory,
  editExtraCategoryPage,
  updateExtraCategory,
};
