// app_server/routes/reviews.js
const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');

// GET /reviews - fetch all reviews
router.get('/', reviewsController.getAllReviews);

// POST /reviews - add a new review
router.post('/', reviewsController.addReview);

module.exports = router;
