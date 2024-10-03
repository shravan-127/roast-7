const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/contact', ctrlLocations.contact);
router.get('/location/review/new', ctrlLocations.addReview);

/* Cart routes */
router.get('/cart', ctrlLocations.cart); // Route to view cart
router.post('/cart/add', ctrlLocations.addToCart); // Route to add item to cart
router.get('/cart/remove/:id', ctrlLocations.removeFromCart); // Route to remove item from cart

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
