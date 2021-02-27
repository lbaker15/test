const express = require('express');
const router = express.Router();
const one = require('../controllers/one');

router.get('/test', one.test);

module.exports = router;