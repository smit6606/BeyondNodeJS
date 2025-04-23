const express = require('express')
const router = express.Router();

router.get('/tokies', (req, res) => {
    res.render('home')
})

module.exports = router