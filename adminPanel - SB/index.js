const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const movieRoutes = require("./routes/movieRoutes");
const app = express();
const port = 9000;

mongoose
  .connect("mongodb://127.0.0.1:27017/movieDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", movieRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
