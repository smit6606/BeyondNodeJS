const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/adminDetails";
mongoose.connect(URI);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database is Connected Successfully 👍");
});
db.on("err", (err) => {
  console.log("Database having a Problem");
});
db.on("disconnected", () => {
  console.log("Database is disconnected 😅");
});
