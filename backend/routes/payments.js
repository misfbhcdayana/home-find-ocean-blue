const express = require('express');
const { createCheckoutSession } = require('../controllers/payments');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/create-checkout-session', verifyToken, createCheckoutSession);

module.exports = router; 