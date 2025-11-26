import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../services/movieService';
import { createReview } from '../services/reviewService';
import { AuthContext } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const data = await getMovieById(id);
      setMovie(data.movie);
      setReviews(data.reviews);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    // Admin cannot rate movies
    if (user && user.role === 'admin') {
      setError('Admins cannot submit reviews. Only users can rate movies.');
      return;
    }

    setSubmitLoading(true);
    setError('');
    setSuccess('');

    try {
      const newReview = await createReview({ ...reviewData, movieId: id });
      setReviews([newReview, ...reviews]);
      setSuccess('🎉 Review submitted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchMovieDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;

  const hasUserReviewed = user && reviews.some(r => r.userId._id === user._id);

  return (
    <div className="movie-detail-page">
      {/* Hero Section */}
      <div className="movie-hero" style={{
        backgroundImage: `url(${movie.poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content-wrapper">
          <div className="hero-poster">
            <img 
              src={movie.poster} 
              alt={movie.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600/424242/FFFFFF?text=No+Poster';
              }}
            />
          </div>
          
          <div className="hero-info">
            <h1 className="movie-title-large">{movie.title}</h1>
            
            <div className="movie-meta-badges">
              <span className="meta-badge">{movie.releaseYear}</span>
              <span className="meta-badge">{movie.genre}</span>
              <span className="meta-badge">Dir: {movie.director}</span>
            </div>

            <div className="movie-rating-box">
              <div className="rating-score">
                <span className="score-number">{movie.averageRating.toFixed(1)}</span>
                <span className="score-max">/5</span>
              </div>
              <div className="rating-stars-display">
                {'★'.repeat(Math.round(movie.averageRating))}
                {'☆'.repeat(5 - Math.round(movie.averageRating))}
              </div>
              <div className="rating-count">{reviews.length} reviews</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container movie-content">
        {/* Description Section */}
        <div className="movie-description-section card">
          <h2 className="section-heading">📖 Synopsis</h2>
          <p className="movie-description-text">{movie.description}</p>
        </div>

        {/* Reviews Section */}
        <div className="reviews-container">
          <h2 className="section-heading">💬 User Reviews</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {/* Review Form */}
          {user ? (
            user.role === 'admin' ? (
              <div className="admin-restriction-card card">
                <span className="restriction-icon">⚠️</span>
                <div>
                  <h3>Admin Account Restriction</h3>
                  <p>Admins can only manage movies but cannot submit reviews or ratings. Please use a user account to rate movies.</p>
                </div>
              </div>
            ) : hasUserReviewed ? (
              <div className="already-reviewed-card card">
                <span className="check-icon">✓</span>
                <div>
                  <h3>You've already reviewed this movie</h3>
                  <p>Find your review below. You can only submit one review per movie.</p>
                </div>
              </div>
            ) : (
              <ReviewForm onSubmit={handleReviewSubmit} loading={submitLoading} />
            )
          ) : (
            <div className="login-prompt-card card">
              <div className="prompt-content">
                <span className="prompt-icon">🔒</span>
                <div>
                  <h3>Want to share your thoughts?</h3>
                  <p>Login to rate and review this movie</p>
                </div>
                <Link to="/login">
                  <button className="btn btn-primary">Login Now</button>
                </Link>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <div className="no-reviews-card card">
                <span className="empty-icon">📝</span>
                <h3>No reviews yet</h3>
                <p>Be the first one to review this movie!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="review-card card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {review.userId.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="reviewer-name">{review.userId.name}</div>
                        <div className="review-date">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="review-rating">
                      <span className="rating-stars-small">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </span>
                      <span className="rating-number">{review.rating}/5</span>
                    </div>
                  </div>
                  <p className="review-text">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;