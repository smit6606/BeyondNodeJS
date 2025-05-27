const express = require("express");
const connectDB = require("./configuration/database");
const cookieParser = require("cookie-parser");
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

// Routes
app.use("/", require("./routes/adminRoutes/adminRoute"));

// Server
app.listen(port, (e) => {
  if (e) {
    console.error("Error starting server:", e);
  }
  console.log(`Server is running on http://localhost:${port}`);
});
