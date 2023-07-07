const express = require('express');
const { verifyUser } = require('../utils/verifyToken');
const { createBooking } = require('../controllers/booking');
const router = express.Router();

router.post('/:tourId',verifyUser,createBooking);

module.exports = router;