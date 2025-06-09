const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const admin = require("../models/adminModel/adminModel");

passport.use(
  "local-auth",
  new localStrategy(
    {
      usernameField: "admin_email",
      passwordField: "admin_password",
    },
    async function (admin_email, admin_password, done) {
      console.log(`Email : ${admin_email} , Password : ${admin_password}`);

      const adminData = await admin.findOne({ admin_email: admin_email });

      if (adminData) {
        if (adminData.admin_password === admin_password) {
          console.log(`Login Successfully....`);
          return done(null, adminData);
        } else {
          console.log(`Wrong Password....`);
          return done(null, false, { message: "Incorrect password" });
        }
      } else {
        console.log(`Wrong Email....`);
        return done(null, false, { message: "Email not registered" });
      }
    }
  )
);

passport.serializeUser(function (admin, done) {
  console.log("Seriallize is called....");

  return done(null, admin._id);
});

passport.deserializeUser(async function (id, done) {
  console.log("Deseriallize is called....");
  const authAdmin = await admin.findById(id);

  if (authAdmin) {
    return done(null, authAdmin);
  } else {
    return done(null, false);
  }
});

// Check Login MiddleWare
passport.checkAuthentication = function (req, res, next) {
  console.log("Auth Middleware is called....");

  console.log("Auth : ", req.isAuthenticated());

  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

// Lost Password
passport.checkLostPasswordAuthentication = function (req, res, next) {
  console.log("Auth Middlewate is called....");

  console.log("Auth : ", req.isAuthenticated());

  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

// currentAdmin Data
passport.currentAdmin = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.currentAdmin = req.user;
    next();
  } else {
    11;
    next();
  }
};

module.exports = passport;
