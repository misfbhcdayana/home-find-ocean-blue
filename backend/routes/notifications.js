const express = require('express');
const { getNotifications, markNotificationRead } = require('../controllers/notifications');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/', verifyToken, getNotifications);
router.put('/:notificationId/read', verifyToken, markNotificationRead);

module.exports = router; 