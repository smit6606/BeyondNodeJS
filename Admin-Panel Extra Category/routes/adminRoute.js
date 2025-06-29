const express = require("express");
const multer = require("multer");
const router = express.Router();
const passport = require("passport");
const {
  signInPage,
  signUpPage,
  adminRegister,
  dashboard,
  adminProfile,
  editAdmin,
  addAdmin,
  viewAdmin,
  deleteAdmin,
  editAdminFunction,
  editProfile,
  updateProfile,
  adminChecked,
  logout,
  forgotPassword,
  otpVerifyPage,
  checkEmail,
  checkOTP,
  newPasswordPage,
  newSetPassword,
  changePassword,
  updatePassword,
} = require("../controllers/adminController");

console.log("Admin route loaded");

const upload = require("../middleware/adminMulter");

// GET Routes
router.get("/", passport.checkLostPasswordAuthentication, signInPage);
router.get("/signUpPage", signUpPage);
router.get("/dashboard", passport.checkAuthentication, dashboard);
router.get("/adminProfile", passport.checkAuthentication, adminProfile);
router.get("/addAdmin", passport.checkAuthentication, addAdmin);
router.get("/viewAdmin", passport.checkAuthentication, viewAdmin);
router.get("/logout", passport.checkAuthentication, logout);
router.get(
  "/forgotPassword",
  passport.checkLostPasswordAuthentication,
  forgotPassword
);
router.get(
  "/otpVerifyPage",
  passport.checkLostPasswordAuthentication,
  otpVerifyPage
);
router.get(
  "/newPasswordPage",
  passport.checkLostPasswordAuthentication,
  newPasswordPage
);
router.get("/deleteAdmin/:id", passport.checkAuthentication, deleteAdmin);
router.get("/editAdmin", passport.checkAuthentication, editAdmin);
router.get("/changePassword", passport.checkAuthentication, changePassword);
router.get("/editProfile/:id", passport.checkAuthentication, editProfile);

// POST Routes
router.post("/register", upload.single("admin_image"), adminRegister);
router.post("/dashboard", dashboard);
router.post(
  "/adminChecked",
  passport.authenticate("local-auth", {
    failureRedirect: "/",
    failureFlash: true,
  }),
  adminChecked
);

router.post("/check-email", checkEmail);
router.post("/checkOTP", checkOTP);
router.post("/newSetPassword", newSetPassword);
router.post("/updatePassword", updatePassword);
router.post(
  "/editAdminFunction/:id",
  upload.single("admin_image"),
  editAdminFunction
);
router.post("/updateProfile/:id", upload.single("admin_image"), updateProfile);

router.use(
  "/category",
  passport.checkAuthentication,
  require("./categoryRoute")
);

router.use(
  "/subCategory",
  passport.checkAuthentication,
  require("./subCategoryRoute")
);

router.use(
  "/extraCategory",
  passport.checkAuthentication,
  require("./extraCategoryRoute")
);

router.use(
  "/product",
  passport.checkAuthentication,
  require("./productsRoute")
);

module.exports = router;
