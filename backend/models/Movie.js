const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required']
  },
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required']
  },
  director: {
    type: String,
    required: [true, 'Director name is required']
  },
  poster: {
    type: String,
    default: 'https://via.placeholder.com/300x450?text=No+Poster'
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);