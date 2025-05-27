const Film = require("../models/filmSchema");
const fs = require("fs");
const path = require("path");

const homeScreen = async (req, res) => {
  try {
    const allFilms = await Film.find();
    res.render("home", { record: allFilms });
  } catch (error) {
    console.error("Failed to load film records:", error);
    res.send("Internal Server Error");
  }
};

const showForm = (req, res) => {
  res.render("form");
};

const addFilm = async (req, res) => {
  if (req.file) {
    req.body.poster = req.file.path;
  }

  const created = await Film.create(req.body);

  if (created) {
    console.log("🎬 New film added:", created);
  } else {
    console.log("❌ Failed to add film");
  }

  res.redirect("/");
};

const viewFilm = async (req, res) => {
  try {
    const filmId = req.params.id;
    const film = await Film.findById(filmId);

    if (!film) {
      return res.send("Film not found");
    }

    res.render("movieDetails", { movie: film });
  } catch (error) {
    console.error("Error displaying film:", error);
    res.send("Internal Server Error");
  }
};

const deleteFilm = async (req, res) => {
  const id = req.query.id;

  try {
    const deleted = await Film.findByIdAndDelete(id);

    if (deleted) {
      const imgPath = path.join(__dirname, "..", deleted.poster);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
        console.log("🗑️ Image removed");
      }

      console.log("🗑️ Film record removed");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error deleting film:", error);
    res.send("Internal Server Error");
  }
};

const editForm = async (req, res) => {
  const id = req.params.id;
  const data = await Film.findById(id);
  res.render("upmovie", { record: data });
};

const updateFilm = async (req, res) => {
  const id = req.params.id;

  try {
    const oldData = await Film.findById(id);
    if (!oldData) return res.send("Film not found");

    if (req.file) {
      const oldImg = path.join(__dirname, "..", oldData.poster);
      if (fs.existsSync(oldImg)) {
        fs.unlinkSync(oldImg);
        console.log("🧹 Old image cleared");
      }

      req.body.poster = req.file.path;
    } else {
      req.body.poster = oldData.poster;
    }

    const updated = await Film.findByIdAndUpdate(id, req.body);

    if (updated) {
      console.log("✅ Film updated");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error updating film:", error);
    res.send("Internal Server Error");
  }
};

module.exports = {
  homeScreen,
  showForm,
  addFilm,
  deleteFilm,
  editForm,
  updateFilm,
  viewFilm,
};
