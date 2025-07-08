const express = require('express');
const { getRentalAnalytics } = require('../controllers/analytics');
const verifyToken = require('../middleware/verifyToken');
const ownership = require('../middleware/ownership');
const router = express.Router();

router.get('/rentals/:rentalId', verifyToken, ownership, getRentalAnalytics);

module.exports = router; 