const express = require("express");
const app = express();
const port = 9000;
const path = require("path");

let studData = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("table", { studData });
});

app.get("/insert", (req, res) => {
  res.render("form");
});

app.post("/addStud", (req, res) => {
  const { name, phone, email, course } = req.body;
  studData.push({ name, phone, email, course });
  res.redirect("/");
});

app.get("/delete", (req, res) => {
  const id = parseInt(req.query.id, 10);
  if (!isNaN(id) && id >= 0 && id < studData.length) {
    studData.splice(id, 1);
  }
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`🚀 Server started on http://localhost:${port}`)
);
