const Movie = require("../models/movieModel");
const fs = require("fs");

exports.getHome = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("home", { movies });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getForm = (req, res) => {
  res.render("form");
};

exports.postMovie = async (req, res) => {
  const { id, title, director, genre, releaseYear, duration, description } =
    req.body;
  let poster = req.file ? req.file.path : "";

  try {
    if (id) {
      const existingMovie = await Movie.findById(id);

      if (req.file && existingMovie.poster) {
        fs.unlinkSync(existingMovie.poster);
      }

      await Movie.findByIdAndUpdate(id, {
        title,
        director,
        genre,
        releaseYear,
        duration,
        description,
        poster: req.file ? poster : existingMovie.poster,
      });
    } else {
      await Movie.create({
        title,
        director,
        genre,
        releaseYear,
        duration,
        description,
        poster,
      });
    }
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getDetails = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.render("details", { movie });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    fs.unlinkSync(movie.poster);
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
