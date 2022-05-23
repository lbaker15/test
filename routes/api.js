const express = require('express');
const router = express.Router();
const one = require('../controllers/one');

router.get('/time', (req, res, next) => {
    let timestamp = Date.now() / 1000;
    console.log(timestamp)
    let json = {'epoch': Math.round(timestamp)}
    res.json(json)
});

module.exports = router;