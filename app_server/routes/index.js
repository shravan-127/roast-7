const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');
const ctrlReviews = require('../controllers/reviews'); // Add controller for reviews

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/contact', ctrlLocations.contact);
router.get('/location/review/new', ctrlLocations.addReview);
router.post('/location/review', ctrlReviews.submitReview); // POST route to submit a review
router.get('/pastries', ctrlLocations.pastries);
router.get('/tea', ctrlLocations.tea);  // Route for the tea page

/* Cart routes */
router.get('/cart', ctrlLocations.cart); // Route to view cart
router.post('/cart/add', ctrlLocations.addToCart); // Route to add item to cart
router.get('/cart/remove/:id', ctrlLocations.removeFromCart); // Route to remove item from cart

/* Other pages */
router.get('/about', ctrlOthers.about);

/* Reviews API */
router.get('/api/reviews', ctrlReviews.getReviews); // Route to get all reviews
router.post('/api/reviews', ctrlReviews.submitReview); // Route to submit a new review

module.exports = router;
