const mongoose = require('mongoose');


const url = "mongodb://127.0.0.1:27017/Tokies-Management";

mongoose.connect(url);

const db = mongoose.connection

db.on('connected', () => {
    console.log("Database is connected...");
})
db.on('error', (err) => {
    console.log("Database is not connected...", err);
})
db.on('disconnected', () => {
    console.log("Database is Disconnected...");
})

module.exports = db;