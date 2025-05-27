// routes/movieRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const movieController = require("../controllers/movieController");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
router.get("/", movieController.getHome);
router.get("/form", movieController.getForm);
router.post(
  "/add-movie",
  upload.single("movie_image"),
  movieController.addMovie
);
router.get("/movie/:id", movieController.getMovieById);
router.get("/delete/:id", movieController.deleteMovie);
router.get("/edit", movieController.editMovieForm);
router.post(
  "/update",
  upload.single("movie_image"),
  movieController.updateMovie
);

module.exports = router;
