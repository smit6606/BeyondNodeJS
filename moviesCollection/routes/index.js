const express = require("express");
const upload = require("../config/upload");
const router = express.Router();

console.log("✨ Custom Routes are now active... Loading film magic!");

const filmHandler = require("../controllers/filmHandler.js");

// Routes
router.get("/", filmHandler.homePage);
router.get("/form", filmHandler.formPage);
router.post("/movie-submit", upload.single("movieImage"), filmHandler.movieAdd);
router.get("/movieShow/:id", filmHandler.movieShow);
router.get("/delete/delMovie", filmHandler.delMovie);
router.get("/updateMovie/:id", filmHandler.updateMovie);
router.post(
  "/editMovie/:id",
  upload.single("movieImage"),
  filmHandler.editMovie
);

module.exports = router;
