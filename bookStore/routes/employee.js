const express = require('express');

const route = express.Router();

const empCTR = require('../controllers/empController');

route.get('/', empCTR.empPage);

route.post('/addEMP', empCTR.insertEMP);

route.get('/delEMP', empCTR.deleteEMP);

route.get('/upEMP/:id', empCTR.updateEMP);

route.post('/editEMP/:id', empCTR.editEMP);

module.exports = route;