const category = require("../models/categoryModel");
const subCategory = require("../models/subCategoryModel");
const extraCategory = require("../models/extraCategoryModel");
const products = require("../models/productsModel");

// Add Product Page
const addProductPage = async (req, res) => {
  try {
    const allCategory = await category.find();
    const allSubCategory = await subCategory.find();
    const allExtraCategory = await extraCategory.find();

    if (allCategory && allSubCategory && allExtraCategory) {
      res.render("product/addProductPage", {
        success: req.flash("success"),
        error: req.flash("error"),
        allCategory,
        allSubCategory,
        allExtraCategory,
      });
    } else {
      res.redirect("back");
    }
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

// Insert Product
const insertProduct = async (req, res) => {
  console.log(req.body);
  try {
    req.body.product_image = req.file.path;
    const productInsert = await products.create(req.body);

    if (productInsert) {
      req.flash("success", "Product is inserted...");
    } else {
      req.flash("error", "Product is insertion failed...");
    }
    res.redirect("/product/addProductPage");
  } catch (e) {
    console.log(e);
  }
};

// View Products
const viewProductPage = async (req, res) => {
  try {
    const allProducts = await products
      .find()
      .populate("category_id")
      .populate("subCategory_id")
      .populate("extraCategory_id");

    console.log(allProducts);

    if (allProducts) {
      res.render("product/viewProductPage", {
        productData: allProducts,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      res.redirect("/product/viewProductPage");
    }
  } catch (e) {
    console.log(e);
    res.redirect("/product/viewProductPage");
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDelete = await products.findByIdAndDelete(productId);

    if (productDelete) {
      req.flash("success", "Product is deleted...");
    } else {
      req.flash("error", "Product is deletion failed...");
    }
    res.redirect("/product/viewProductPage");
  } catch (e) {
    console.log(e);
    res.redirect("/product/viewProductPage");
  }
};

// Edit Product Page
const editProductPage = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = await products
      .findById(productId)
      .populate("category_id")
      .populate("subCategory_id")
      .populate("extraCategory_id");

    const allCategory = await category.find();
    const allSubCategory = await subCategory.find();
    const allExtraCategory = await extraCategory.find();

    console.log("SubCategory Data : ", allSubCategory);

    if (productData) {
      res.render("product/editProductPage", {
        productData,
        allCategory,
        allSubCategory,
        allExtraCategory,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      res.redirect("/product/viewProductPage");
    }
  } catch (e) {
    console.log(e);
    res.redirect("/product/viewProductPage");
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (req.file) {
      req.body.product_image = req.file.path;
    }
    const productUpdate = await products.findByIdAndUpdate(productId, req.body);

    if (productUpdate) {
      req.flash("success", "Product is updated...");
    } else {
      req.flash("error", "Product is updation failed...");
    }
    res.redirect("/product/viewProductPage");
  } catch (e) {
    console.log(e);
    res.redirect("/product/viewProductPage");
  }
};

module.exports = {
  addProductPage,
  insertProduct,
  viewProductPage,
  deleteProduct,
  editProductPage,
  updateProduct,
};
