const express = require('express');
const { triggerScrape } = require('../controllers/scrape');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

router.post('/', verifyToken, isAdmin, triggerScrape);

module.exports = router; 