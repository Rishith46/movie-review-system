import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="movie-card-link">
      <div className="movie-card card">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="movie-poster"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/424242/FFFFFF?text=No+Poster';
          }}
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          
          <div className="movie-meta-row">
            <span className="movie-year">{movie.releaseYear}</span>
            <span className="movie-genre">{movie.genre}</span>
          </div>
          
          <div className="movie-rating">
            <span className="rating-stars">
              {'★'.repeat(Math.round(movie.averageRating))}
              {'☆'.repeat(5 - Math.round(movie.averageRating))}
            </span>
            <span className="rating-text">
              {movie.averageRating > 0 ? movie.averageRating.toFixed(1) : 'New'}
            </span>
          </div>
        </div>
        
        <div className="quick-view-btn">
          View Details →
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;