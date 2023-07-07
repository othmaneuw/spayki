const express = require('express');
const { createReview } = require('../controllers/reviews');
const { verifyUser } = require('../utils/verifyToken');
const router = express.Router();

router.post('/:tourId',verifyUser,createReview);

module.exports = router;