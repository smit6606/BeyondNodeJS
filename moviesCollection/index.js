const express = require("express");
const db = require("./config/db");
const path = require("path");

const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(
      "🚫 Oops! Something went wrong. Server refused to wake up.",
      err
    );
  } else {
    console.log(`🚀 Server is live and kickin' at → http://localhost:${port}`);
  }
});
