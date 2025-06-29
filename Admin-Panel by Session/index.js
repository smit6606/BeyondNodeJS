const express = require("express");
const connectDB = require("./configuration/database");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const session = require("express-session");
const passport = require("passport");
const localStrategy = require("./configuration/localStrategy");

const app = express();
const port = 5000;

// View engine setup
app.set("view engine", "ejs");

// Static folder
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    name: "testing",
    secret: "ArgonSmit",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 100 * 100 * 100 * 60,
    },
  })
);

app.use(passport.session());
app.use(passport.initialize());
// app.use(passport.currentAdmin);

// Routes
app.use(flash());
app.use("/", require("./routes/adminRoutes/adminRoute"));
// Server
app.listen(port, (e) => {
  if (e) {
    console.error("Error starting server:", e);
  }
  console.log(`Server is running on http://localhost:${port}`);
});
