const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/film-vault";

mongoose.connect(URI);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("🟢 MongoDB says: Connection established successfully.");
});

db.on("error", (err) => {
  console.log("🔴 MongoDB warning: Unable to connect!", err);
});

db.on("disconnected", () => {
  console.log("🟡 MongoDB has been disconnected. Check your connection.");
});

module.exports = db;
