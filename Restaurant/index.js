const express = require("express");
const db = require("./config/db");
const dishes = require("./models/restaurant");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 9000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Common function to render dashboard
const renderDashboard = (req, res) => {
  const updated = req.query.updated === "true";
  dishes
    .find({})
    .then((record) => res.render("dashboard", { record, updated }))
    .catch((err) => {
      console.log("Error", err);
      res.send(err);
    });
};

// Home Route - Dashboard
app.get("/", renderDashboard);

// Dashboard Route
app.get("/dashboard", renderDashboard);

// Insert or Update Dish
app.post("/dish-inventory", upload.single("image"), async (req, res) => {
  const { id, name, price, category, ingredients } = req.body;
  const image = req.file ? req.file.path : "";

  if (id) {
    // Update Dish
    const data = await dishes.findById(id);

    if (req.file) {
      const oldImagePath = path.join(__dirname, data.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    await dishes.findByIdAndUpdate(id, {
      name,
      price,
      category,
      ingredients,
      ...(req.file && { image }),
    });

    console.log("Data updated");
    return res.redirect("/dashboard?updated=true"); // ✅ Redirect to dashboard with success message
  } else {
    // Insert New Dish
    dishes
      .create({ name, price, category, ingredients, image })
      .then(() => {
        console.log("Data inserted");
        res.redirect("/dashboard");
      })
      .catch((err) => console.log("Error", err));
  }
});

// Form Route
app.get("/form", (req, res) => {
  res.render("form");
});

// Logout Page
app.get("/logout", (req, res) => {
  res.render("logout");
});

// Delete Dish
app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await dishes.findById(id);
    if (data) {
      const imagePath = path.join(__dirname, data.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      await dishes.findByIdAndDelete(id);
      console.log("Deleted successfully.");
    }
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Error during deletion:", err);
    res.status(500).send("Something went wrong.");
  }
});

// Edit Dish
app.get("/edit", (req, res) => {
  const id = req.query.id;
  dishes
    .findById(id)
    .then((record) => res.render("edit", { record }))
    .catch((err) => {
      console.log(err);
      res.redirect("/dashboard");
    });
});

// Start Server
app.listen(port, (err) => {
  if (err) {
    console.log("Server startup error:", err);
    return false;
  }
  console.log(`🔥 Server running at: http://localhost:${port}`);
});
