// controllers/reviews.js
const Review = require('../models/review');

// Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit a new review
const submitReview = async (req, res) => {
  const { author, content, rating } = req.body;

  const review = new Review({
    author,
    content,
    rating,
  });

  try {
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getReviews,
  submitReview,
};
