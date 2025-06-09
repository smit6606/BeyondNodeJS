const Admin = require("../../models/adminModel/adminModel");
const nodemailer = require("nodemailer");
const fs = require("fs");

// Render Pages
const signInPage = (req, res) => {
  res.render("signInPage", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const adminChecked = (req, res) => {
  console.log("Admin Checked");
  req.flash("success", "Admin Logged In Successfully");
  res.redirect("/dashboard");
};

const signUpPage = (req, res) => {
  res.render("signUpPage", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const dashboard = (req, res) => {
  res.render("dashboard", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};
const adminProfile = (req, res) => {
  const currentAdmin = req.user;
  res.render("admin/adminProfile", {
    currentAdmin,
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const editProfile = async (req, res) => {
  const editCurrentAdminId = req.params.id;
  const currentAdmin = req.user;
  console.log("Edit Current Admin Id : ", editCurrentAdminId);

  try {
    const record = await Admin.findById(editCurrentAdminId);
    if (record) {
      console.log("Record Found : ", record);

      res.render("admin/editProfile", { record, currentAdmin });
    } else {
      console.log("Record not found...");
      res.send(`<p> Admin record not found </p>`);
    }
  } catch (e) {
    console.log("Error : ", e);
    res.send(`<p> Error: ${e} </p>`);
  }
};

const updateProfile = async (req, res) => {
  console.log("Update Data", req.body);
  console.log("Update Profile File : ", req.file);
  const editCurrentAdminId = req.params.id;
  const currentAdmin = req.user;
  console.log("Edit Current Admin Id : ", editCurrentAdminId);

  try {
    const data = await Admin.findById(editCurrentAdminId);
    console.log("Data : ", data);

    if (req.file && req.file.filename) {
      const oldImagePath = "uploads/" + data.admin_image;
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Old Image Deleted...");
      }
      req.body.admin_image = req.file.filename;
    } else {
      req.body.admin_image = data.admin_image;
    }

    const updateData = await Admin.findByIdAndUpdate(
      editCurrentAdminId,
      req.body
    );
    console.log("Update Data : ", updateData);

    if (updateData) {
      console.log("Admin Data Updated...");
      req.flash("success", `${updateData.admin_name} Updated Successfully`);
      res.redirect("/adminProfile");
    } else {
      console.log("Admin Data not Updated...");
      req.flash(
        "error",
        ` ${updateData.admin_name} not Updated, please try again`
      );
      res.redirect("back");
    }
  } catch (e) {
    console.log("Error : ", e);
    res.send(`<p> Error occurred : ${e.message} </p>`);
  }
};

const addAdmin = async (req, res) => {
  res.render("admin/addAdmin", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const viewAdmin = async (req, res) => {
  try {
    let adminData = await Admin.find({});
    const currentAdmin = req.user;

    console.log("User Data", adminData);

    res.render("admin/viewAdmin", {
      adminData,
      currentAdmin,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (e) {
    console.error("Error fetching admin data:", e);
    res.send(`<p>Error fetching admin data: ${e.message}</p>`);
  }
};

const deleteAdmin = async (req, res) => {
  const delId = req.params.id;

  console.log("DelId", delId);

  try {
    const data = await Admin.findById(delId);
    console.log("Fetch Data : ", data);

    if (data) {
      console.log(data.admin_image);
      console.log("before delete");

      fs.unlinkSync("uploads/" + data.admin_image);
      console.log("Image Deleted...");

      const deleteAdmin = await Admin.findByIdAndDelete(delId);

      if (deleteAdmin) {
        console.log("Admin Deleted...");
        req.flash("success", "Admin Deleted Successfully");
      } else {
        console.log("Admin not deleted...");
        req.flash("error", "Admin not deleted, please try again");
      }

      res.redirect("/viewAdmin");
    } else {
      console.log("Single Record not found....");
    }
  } catch (e) {
    res.send(`<p> Not Found : ${e} </p>`);
  }
};

const editAdmin = async (req, res) => {
  try {
    const editId = req.query.id;
    const data = await Admin.findById(editId);
    const currentAdmin = req.user;
    console.log(data);

    if (data) {
      res.render("admin/editAdminPage", {
        currentAdmin,
        data,
        success: "",
        error: "",
      });
    } else {
      console.log("Single Record not found....");
    }
  } catch (e) {
    res.send(`<p> Not Found : ${e} </p>`);
  }
};

const editAdminFunction = async (req, res) => {
  console.log("Update Data", req.body);
  console.log(req.file);

  const editId = req.params.id;
  console.log("Edit Id: ", editId);

  try {
    const data = await Admin.findById(editId);
    console.log("Data: ", data);

    if (req.file) {
      if (data.admin_image) {
        try {
          await fs.unlink("uploads/" + data.admin_image);
          console.log("Old Image Deleted...");
        } catch (err) {
          console.error("Error deleting old image:", err.message);
        }
      }
      req.body.admin_image = req.file.filename;
    } else {
      req.body.admin_image = data.admin_image;
    }

    const updatedData = await Admin.findByIdAndUpdate(editId, req.body, {
      new: true,
    });

    console.log("Updated Data: ", updatedData);

    if (updatedData) {
      console.log("Admin Data Updated...");
      req.flash("success", "Admin Data Updated Successfully");
    } else {
      console.log("Admin Data not Updated...");
      req.flash("error", "Admin Data not Updated, please try again");
    }

    return res.redirect("/viewAdmin");
  } catch (e) {
    console.error("Error: ", e);
    return res.send(`<p>Internal Server Error: ${e.message}</p>`);
  }
};

const logout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      return false;
    }
    res.redirect("/");
  });
};

const changePassword = (req, res) => {
  res.render("admin/changePassword", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const updatePassword = async (req, res) => {
  const myAdmin = req.user;
  const { currentPassword, newPassword, confirm_password } = req.body;
  console.log("Body Data : ", req.body);
  console.log("Current Admin : ", myAdmin);

  if (currentPassword == myAdmin.admin_password) {
    if (newPassword != myAdmin.admin_password) {
      if (newPassword == confirm_password) {
        try {
          const isUpdate = await Admin.findByIdAndUpdate(myAdmin._id, {
            admin_password: newPassword,
            confirm_password: newPassword,
          });
          console.log("Is Update : ", isUpdate);

          if (isUpdate) {
            console.log("Password updated...", isUpdate);
            req.session.destroy(function (err) {
              if (err) {
                console.log(err);
                req.flash(
                  "error",
                  "Error while logging out after password change"
                );
                return res.redirect("/changePassword");
              }
              req.flash("success", "Password updated successfully");
              res.redirect("/");
            });
          } else {
            req.flash("error", "Password not updated, please try again");
            res.redirect("/changePassword");
          }
        } catch (e) {
          req.flash("error", "An error occurred while updating the password");
          res.redirect("/changePassword");
        }
      } else {
        req.flash("error", "New password and confirm password do not match");
        res.redirect("/changePassword");
      }
    } else {
      req.flash(
        "error",
        "New password cannot be the same as the current password"
      );
      res.redirect("/changePassword");
    }
  } else {
    req.flash("error", "Current password is incorrect, please try again");
    res.redirect("/changePassword");
  }
};

const forgotPassword = (req, res) => {
  res.render("authentication/forgotPassword");
};

const checkEmail = async (req, res) => {
  console.log(req.body);

  const email = req.body.email;

  const data = await Admin.findOne({ admin_email: email });

  console.log(data);

  if (data) {
    // Send OTP Mail

    // Init Mail
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      service: "gmail",
      secure: false,
      auth: {
        user: "smeetgarala6606@gmail.com",
        pass: "uhzrgkhwdytuigrm",
      },
    });

    // Send Mail

    const OTP = Math.floor(Math.random() * 999999);

    const info = await transporter.sendMail({
      from: '"Argon Dashboard 👻" smeetgarala6606@gmail.com',
      to: email, // list of receivers
      subject: "One-Time Password (OTP) for Forget Password",
      html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>OTP Verification</title>
                <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #6e8efb, #a777e3);
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                  }

                  .glass-container {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 20px;
                    padding: 40px;
                    width: 90%;
                    max-width: 500px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                  }

                  .title {
                    text-align: center;
                    font-size: 26px;
                    font-weight: bold;
                    margin-bottom: 10px;
                  }

                  .subtitle {
                    text-align: center;
                    font-size: 14px;
                    opacity: 0.8;
                    margin-bottom: 30px;
                  }

                  .otp-box {
                    background-color: #ffffff22;
                    padding: 15px 25px;
                    border-radius: 10px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    border-left: 5px solid #00f2fe;
                    margin: 20px auto;
                    width: fit-content;
                    color: #fff;
                  }

                  p {
                    font-size: 15px;
                    line-height: 1.5;
                    opacity: 0.9;
                  }

                  .footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 14px;
                    opacity: 0.7;
                  }

                  .name {
                    font-weight: bold;
                    margin-top: 10px;
                  }
                </style>
              </head>
              <body>
                <div class="glass-container">
                  <div class="title">Secure OTP Verification</div>
                    <div class="subtitle">Two-Factor Authentication (2FA)</div>
                    <p>Hello there,</p>
                    <p>To keep your account extra secure, we’ve enabled Two-Factor Authentication (2FA). Use the OTP below to complete your login.</p>
                    <div class="otp-box">OTP: ${OTP}</div>
                    <p>This code is valid for <strong>10 minutes</strong> and can only be used once. Please don’t share it with anyone—not even our support team.</p>
                    <p>Thanks for keeping your account safe.</p>
                    <div class="footer">
                      <p>Warm regards,</p>
                      <div class="name">Smit Garala</div>
                  </div>
                </div>
              </body>
            </html>
`,
    });

    console.log("Message sent: %s", info.messageId);

    if (info.messageId) {
      // OTP Page
      res.cookie("OTP", OTP);
      res.cookie("email", email);
      res.redirect("/otpVerifyPage");
    } else {
      res.redirect("/forgotPassword");
    }
  } else {
    res.redirect("/forgotPassword");
  }
};

const otpVerifyPage = (req, res) => {
  const currentAdmin = req.cookies.admin;
  if (currentAdmin != undefined) {
    res.redirect("/dashboard");
  } else {
    res.render("authentication/otpVerifyPage", { success: "", error: "" });
  }
};

const checkOTP = async (req, res) => {
  console.log(req.body);
  console.log(req.cookies.OTP);

  if (req.body.OTP == req.cookies.OTP) {
    res.redirect("/newPasswordPage");
  } else {
    res.redirect("back");
    console.log("OTP has not matched...");
    req.flash("error", "OTP has not matched, please try again");
  }
};
const newPasswordPage = (req, res) => {
  res.render("authentication/newPasswordPage", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const newSetPassword = async (req, res) => {
  console.log(req.body);

  try {
    if (req.body.new_password == req.body.confirm_password) {
      const email = req.cookies.email;

      const data = await Admin.findOne({ admin_email: email });

      if (data) {
        const updatePass = await Admin.findByIdAndUpdate(data.id, {
          admin_password: req.body.new_password,
          confirm_password: req.body.confirm_password,
        });
        if (updatePass) {
          console.log("Password Updated...");
          req.flash("success", "Password updated successfully");

          res.clearCookie("email");
          res.clearCookie("OTP");
          res.redirect("/");
        } else {
          console.log("Password not updated....");
          req.flash("error", "Password not updated, please try again");

          res.redirect("/newPasswordPage");
        }
      } else {
        console.log("Email is not valid...");
        req.flash("error", "Email is not valid, please try again");

        res.redirect("/newPasswordPage");
      }
    } else {
      console.log("New Password and Conform Password has not matched....");
      req.flash("error", "New Password and Confirm Password do not match");

      res.redirect("/newPasswordPage");
    }
  } catch (e) {
    res.send(`Not Found : ${e}`);
  }
};

// Register Logic
const adminRegister = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    if (req.body.admin_password !== req.body.confirm_password) {
      req.flash("error", "Password and Confirm Password do not match");
    } else {
      req.body.admin_image = req.file.filename;
      const insert = await Admin.create(req.body);
      if (insert) {
        req.flash(
          "success",
          `${insert.admin_name} Admin Registered Successfully`
        );
      } else {
        console.log("Admin Data is not insertion...");
      }
    }
    res.redirect("/addAdmin");
  } catch (err) {
    console.error(err);
    res.send("Server error");
  }
};

module.exports = {
  signInPage,
  signUpPage,
  adminRegister,
  dashboard,
  adminProfile,
  editProfile,
  updateProfile,
  // Admin CRUD Operations
  addAdmin,
  viewAdmin,
  deleteAdmin,
  editAdmin,
  adminChecked,
  logout,
  changePassword,
  updatePassword,
  forgotPassword,
  otpVerifyPage,
  editAdminFunction,
  checkEmail,
  checkOTP,
  newPasswordPage,
  newSetPassword,
};
