const express = require('express');
const { updateUser } = require('../controllers/users');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.put('/:userId', verifyToken, updateUser);

module.exports = router; 