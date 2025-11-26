import { useState } from 'react';
import StarRating from './StarRating';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit, initialData = null }) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [comment, setComment] = useState(initialData?.comment || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please write a comment');
      return;
    }

    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Write Your Review</h3>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label>Your Rating</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>

      <div className="form-group">
        <label>Your Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this movie..."
          rows="4"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {initialData ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;