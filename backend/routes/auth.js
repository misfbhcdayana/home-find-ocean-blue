const express = require('express');
const { register, login, forgotPassword, getUser } = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/user', verifyToken, getUser);

module.exports = router; 