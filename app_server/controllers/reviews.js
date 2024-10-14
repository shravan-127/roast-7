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

exports.getAllReviews = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page
  const limit = parseInt(req.query.limit) || 5; // Number of reviews per page
  const skip = (page - 1) * limit; // Calculate how many reviews to skip

  try {
    const reviews = await Review.find().skip(skip).limit(limit); // Get the reviews
    const totalReviews = await Review.countDocuments(); // Total number of reviews

    res.status(200).json({
      reviews,
      totalPages: Math.ceil(totalReviews / limit), // Return total pages if needed
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch reviews' });
  }
};