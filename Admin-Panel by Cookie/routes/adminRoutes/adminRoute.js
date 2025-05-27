const express = require("express");
const multer = require("multer");
const router = express.Router();
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
} = require("../../controllers/adminController/adminCtr");

console.log("Admin route loaded");

// Multer config (if you're uploading files later, for now it's unused)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// GET Routes
router.get("/", signInPage);
router.get("/signUpPage", signUpPage);
router.get("/dashboard", dashboard);
router.get("/adminProfile", adminProfile);
router.get("/addAdmin", addAdmin);
router.get("/viewAdmin", viewAdmin);
router.get("/logout", logout);
router.get("/forgotPassword", forgotPassword);
router.get("/otpVerifyPage", otpVerifyPage);
router.get("/newPasswordPage", newPasswordPage);
router.get("/deleteAdmin/:id", deleteAdmin);
router.get("/editAdmin", editAdmin);
router.get("/changePassword", changePassword);
router.get("/editProfile/:id", editProfile);

// POST Routes
router.post("/register", upload.single("admin_image"), adminRegister);
router.post("/dashboard", dashboard);
router.post("/adminChecked", adminChecked);
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

module.exports = router;
