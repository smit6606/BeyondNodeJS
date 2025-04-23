const express = require('express');
const db = require('./config/db'); 
const mongoose = require('mongoose');

const port = 8000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));


app.listen('port', ()=>{
    console.log(`Server is Started on port http://localhost:${port}`);
    
})
