const express = require('express');
const db = require('./config/db');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));


app.listen(port, (err) => {
    if (err) {
        console.log("Server is not started...", err);
        return false;
    }
    console.log("Server is started..");
});