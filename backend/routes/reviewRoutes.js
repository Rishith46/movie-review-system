const express = require('express');
const router = express.Router();
const { createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { validateReview, validate } = require('../middleware/validation');

router.post('/', protect, validateReview, validate, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;