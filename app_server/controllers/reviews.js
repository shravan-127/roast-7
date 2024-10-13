// controllers/reviews.js

const Review = require('../models/review'); // Import the review model

// Function to handle adding a new review
exports.addReview = (req, res) => {
  const { name, rating, review } = req.body;

  // Create a new review document
  const newReview = new Review({
    name,
    rating,
    review
  });

  // Save the review to MongoDB
  newReview.save()
    .then(savedReview => {
      res.json(savedReview); // Send the saved review back as a JSON response
    })
    .catch(err => {
      console.error('Error saving review:', err);
      res.status(500).json({ error: 'Failed to save review' });
    });
};

// Function to fetch all reviews
exports.getAllReviews = (req, res) => {
  Review.find()
    .then(reviews => {
      res.json(reviews); // Send back all reviews as a JSON response
    })
    .catch(err => {
      console.error('Error fetching reviews:', err);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    });
};
