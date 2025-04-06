const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/RestaurantMenu";

mongoose.connect(URI);

const db = mongoose.connection;

db.on("connected", () => console.log("DB is Connected.."));
db.on("error", (err) => console.log("DB is not Connected..", err));
db.on("disconnected", () => console.log("DB is Disconnected.."));

module.exports = db;
