const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  admin_name: {
    type: String,
    required: true,
  },
  admin_username: {
    type: String,
    required: true,
    unique: true,
  },
  admin_email: {
    type: String,
    required: true,
    unique: true,
  },
  admin_password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  admin_role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  admin_image: {
    type: String,
    required: true,
  },
  admin_status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  admin_phone: {
    type: String,
    required: true,
  },
  admin_createdAt: {
    type: Date,
    default: Date.now,
  },
});
const admin = mongoose.model("Admin-Crud", adminSchema);
module.exports = admin;
