const express = require("express");

const route = express.Router();

const {
  addProductPage,
  insertProduct,
  viewProductPage,
  deleteProduct,
  editProductPage,
  updateProduct,
} = require("../controllers/productsController");

const upload = require("../middleware/products");

// Add Product Page
route.get("/addProductPage", addProductPage);
// Insert Product
route.post("/insertProduct", upload.single("product_image"), insertProduct);

// View Products
route.get("/viewProductPage", viewProductPage);

// Delete Product
route.get("/deleteProduct/:id", deleteProduct);

// Edit Product Page
route.get("/editProductPage/:id", editProductPage);

// Update Product
route.post("/updateProduct/:id", upload.single("product_image"), updateProduct);

module.exports = route;
