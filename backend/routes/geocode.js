const express = require('express');
const { geocodeAddress } = require('../controllers/geocode');
const router = express.Router();

router.get('/', geocodeAddress);

module.exports = router; 