const Admin = require("../../models/adminModel/adminModel");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Render Pages
const signInPage = (req, res) => {
  if (req.cookies.admin != undefined) {
    res.redirect("/dashboard");
  } else {
    res.render("signInPage");
  }
};

const adminChecked = async (req, res) => {
  const { admin_email, password } = req.body;

  try {
    const admin = await Admin.findOne({ admin_email: admin_email });

    if (admin) {
      if (admin.admin_password == password) {
        console.log("Login Successfully...");

        res.cookie("admin", admin);
        res.redirect("/dashboard");
      } else {
        console.log("Password not matched");

        res.redirect("/");
      }
    } else {
      console.log("Email not matched");
      res.redirect("/");
    }
  } catch (e) {
    res.send(`<p> Not Found : ${e} </p>`);
  }
};

const signUpPage = (req, res) => {
  res.render("signUpPage");
};

const dashboard = (req, res) => {
  const currentAdmin = req.cookies.admin;
  if (currentAdmin != undefined) {
    res.render("dashboard", { currentAdmin });
  } else {
    res.redirect("/");
  }
};
const adminProfile = (req, res) => {
  const currentAdmin = req.cookies.admin;
  if (currentAdmin != undefined) {
    res.render("admin/adminProfile", { currentAdmin });
  } else {
    res.redirect("/");
  }
};

const editProfile = async (req, res) => {
  const editCurrentAdminId = req.params.id;
  console.log("Edit Current Admin Id : ", editCurrentAdminId);

  try {
    const record = await Admin.findById(editCurrentAdminId);
    const currentAdmin = req.cookies.admin;

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
  console.log("Edit Current Admin Id : ", editCurrentAdminId);

  try {
    const data = await Admin.findById(editCurrentAdminId);
    console.log("Data : ", data);

    if (!data) {
      console.log("Data not found...");
      return res.send("<p> Not Found </p>");
    }

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
      const data = await Admin.findById(editCurrentAdminId);
      if (data) {
        res.cookie("admin", data);
      } else {
        console.log("Admin Data not found after update...");
      }
      return res.redirect("/adminProfile");
    } else {
      console.log("Admin Data not Updated...");
      return res.redirect("back");
    }
  } catch (e) {
    console.log("Error : ", e);
    res.send(`<p> Error occurred : ${e.message} </p>`);
  }
};

const addAdmin = async (req, res) => {
  const currentAdmin = req.cookies.admin;
  if (currentAdmin != undefined) {
    res.render("admin/addAdmin", { currentAdmin });
  } else {
    res.redirect("/");
  }
};

const viewAdmin = async (req, res) => {
  if (req.cookies.admin == undefined) {
    res.redirect("/");
  } else {
    try {
      let adminData = await Admin.find({});
      const currentAdmin = req.cookies.admin;

      adminData = adminData.filter((data) => data.id != currentAdmin._id);

      console.log("User Data", adminData);

      res.render("admin/viewAdmin", { adminData, currentAdmin });
    } catch (e) {
      res.send(`<p> Not Found : ${e} </p>`);
    }
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
      } else {
        console.log("Admin not deleted...");
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
  const currentAdmin = req.cookies.admin;
  if (currentAdmin != undefined) {
    try {
      const editId = req.query.id;
      const data = await Admin.findById(editId);
      console.log(data);

      if (data) {
        res.render("admin/editAdminPage", { currentAdmin, data });
      } else {
        console.log("Single Record not found....");
      }
    } catch (e) {
      res.send(`<p> Not Found : ${e} </p>`);
    }
  } else {
    res.redirect("/");
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

    if (!data) {
      console.log("Data not found...");
      return res.send(`<p>Admin not found with ID: ${editId}</p>`);
    }

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
    } else {
      console.log("Admin Data not Updated...");
    }

    return res.redirect("/viewAdmin");
  } catch (e) {
    console.error("Error: ", e);
    return res.send(`<p>Internal Server Error: ${e.message}</p>`);
  }
};

const logout = (req, res) => {
  if (req.cookies.admin != undefined) {
    res.clearCookie("admin");
    console.log("Admin Logout Successfully...");
    res.redirect("/");
  }
};

const changePassword = (req, res) => {
  const currentAdmin = req.cookies.admin;
  if (currentAdmin != undefined) {
    res.render("admin/changePassword", { currentAdmin });
  } else {
    res.redirect("/");
  }
};

const updatePassword = async (req, res) => {
  // console.log(req.body);
  const { currentPassword, newPassword, confirm_password } = req.body;

  const myAdmin = req.cookies.admin;

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
            res.clearCookie("admin");
            res.redirect("/");
          } else {
            console.log("Password updation failed...");
          }
        } catch (e) {
          res.send(`<p> Not Found : ${e} </p>`);
        }
      } else {
        res.redirect("/changePassword");
      }
    } else {
      res.redirect("/changePassword");
    }
  } else {
    console.log("Password is incorrect............");

    res.redirect("/changePassword");
  }
};

const forgotPassword = (req, res) => {
  if (req.cookies.admin != undefined) {
    res.redirect("/dashboard");
  } else {
    res.render("authentication/forgotPassword");
  }
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
      html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                  }
                  .container {
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 30px auto;
                    padding: 30px;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                  }
                  .title {
                    text-align: center;
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 5px;
                  }
                  .underline {
                    width: 60px;
                    height: 3px;
                    background-color: #007BFF;
                    margin: 0 auto 20px auto;
                  }
                  p {
                    font-size: 14px;
                    color: #333;
                    line-height: 1.6;
                  }
                  .otp-box {
                    font-size: 18px;
                    font-weight: bold;
                    background-color: #f1f1f1;
                    padding: 10px 15px;
                    border-left: 5px solid #007BFF;
                    margin: 10px 0 20px 0;
                    display: inline-block;
                  }
                  .footer {
                    margin-top: 30px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="title">One-Time Password</div>
                  <div class="underline"></div>
                  <p>Hi,</p>
                  <p>
                    To enhance the security of your account, we have implemented Two-Factor Authentication (2FA) for your account. To ensure it's you logging in, we are providing you with a One-Time Password (OTP) via email.
                  </p>
                  <p>Please find your OTP below:</p>
                  <div class="otp-box">OTP: ${OTP}</div>
                  <p>
                    Enter the OTP accurately and within 10 minutes. It is valid for a single use only and should not be shared with anyone, including our support staff.
                  </p>
                  <p>Thank you for your cooperation.</p>
                  <div class="footer">
                    <p>Regards,<br>Jaynesh Sarkar</p>
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
    res.render("authentication/otpVerifyPage");
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
  }
};
const newPasswordPage = (req, res) => {
  const currentAdmin = req.cookies.admin;
  if (currentAdmin != undefined) {
    res.redirect("/dashboard");
  } else {
    res.render("authentication/newPasswordPage");
  }
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

          res.clearCookie("email");
          res.clearCookie("OTP");
          res.redirect("/");
        } else {
          console.log("Password not updated....");

          res.redirect("back");
        }
      } else {
        console.log("Email is not valid...");

        res.redirect("back");
      }
    } else {
      console.log("New Password and Conform Password has not matched....");

      res.redirect("back");
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
    req.body.admin_image = req.file.filename;
    const insert = await Admin.create(req.body);
    if (insert) {
      console.log("Admin Data is Inserted...");
    } else {
      console.log("Admin Data is not insertion...");
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
