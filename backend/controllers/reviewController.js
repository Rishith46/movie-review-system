const Review = require('../models/Review');
const Movie = require('../models/Movie');

// Create Review
const createReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const existingReview = await Review.findOne({ movieId, userId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this movie' });
    }

    const review = await Review.create({
      movieId,
      userId: req.user._id,
      rating,
      comment
    });

    // Update movie average rating
    const reviews = await Review.find({ movieId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    movie.averageRating = avgRating;
    await movie.save();

    const populatedReview = await Review.findById(review._id).populate('userId', 'name');
    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    // Update movie average rating
    const reviews = await Review.find({ movieId: review.movieId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await Movie.findByIdAndUpdate(review.movieId, { averageRating: avgRating });

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    const movieId = review.movieId;
    await review.deleteOne();

    // Update movie average rating
    const reviews = await Review.find({ movieId });
    const avgRating = reviews.length > 0 
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length 
      : 0;
    await Movie.findByIdAndUpdate(movieId, { averageRating: avgRating });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, updateReview, deleteReview };