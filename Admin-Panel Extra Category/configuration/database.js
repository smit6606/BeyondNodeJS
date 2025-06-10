const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/Admin-Panel-Argon";

mongoose.connect(URI);

const connection = mongoose.connection;
connection.on("error", (err) => {
  console.log(`Error connecting to database: ${err}`);
});
connection.on("connected", () => {
  console.log("Connected to database");
});
connection.on("disconnected", () => {
  console.log("Disconnected from database");
});
connection.on("reconnected", () => {
  console.log("Reconnected to database");
});

module.exports = connection;
