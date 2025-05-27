const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/CRUD-EMP";

mongoose.connect(URI);

const db = mongoose.connection

db.on('connected', () => {
    console.log("Database is conntected...");
})
db.on('error', (err) => {
    console.log("Database is not conntected...", err);
})
db.on('disconnected', () => {
    console.log("Database is Disconntected...");
})

module.exports = db;