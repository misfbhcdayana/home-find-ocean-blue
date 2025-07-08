const express = require('express');
const { getRentals, getRental, createRental, updateRental, deleteRental } = require('../controllers/rentals');
const verifyToken = require('../middleware/verifyToken');
const ownership = require('../middleware/ownership');
const router = express.Router();

router.get('/', getRentals);
router.get('/:rentalId', getRental);
router.post('/', verifyToken, createRental);
router.put('/:rentalId', verifyToken, ownership, updateRental);
router.delete('/:rentalId', verifyToken, ownership, deleteRental);

module.exports = router; 