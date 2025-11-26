import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMovies } from '../services/movieService';
import { AuthContext } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const filterByGenre = (genre) => {
    setActiveFilter(genre);
    if (genre === 'all') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter(m => m.genre.toLowerCase().includes(genre.toLowerCase())));
    }
  };

  if (loading) return <div className="loading">Loading amazing movies...</div>;

  const genres = ['all', ...new Set(movies.map(m => m.genre))];

  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Discover & Rate Movies</h1>
            <p className="hero-subtitle">
              Your ultimate destination for movie reviews and ratings
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{movies.length}</span>
                <span className="stat-label">Movies</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {movies.reduce((acc, m) => acc + (m.averageRating > 0 ? 1 : 0), 0)}
                </span>
                <span className="stat-label">Rated</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{genres.length - 1}</span>
                <span className="stat-label">Genres</span>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="section-header">
          <h2 className="section-title">Browse Movies</h2>
          <div className="filter-buttons">
            {genres.slice(0, 6).map(genre => (
              <button
                key={genre}
                className={`filter-btn ${activeFilter === genre ? 'active' : ''}`}
                onClick={() => filterByGenre(genre)}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="no-movies">
            <div className="empty-state-icon">🎬</div>
            <p>No movies found in this category. Be the first to add one!</p>
          </div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}

        {user && user.role === 'user' && (
          <div className="floating-add-btn">
            <button 
              className="btn btn-add"
              onClick={() => navigate('/add-movie')}
            >
              ➕ Add Movie
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;