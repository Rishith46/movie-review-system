import { useState, useEffect } from 'react';
import { getAllMovies, createMovie, deleteMovie } from '../services/movieService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [posterPreview, setPosterPreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    director: '',
    poster: ''
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      alert('Failed to fetch movies');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createMovie(formData);
      alert('✅ Movie added successfully!');
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        genre: '',
        releaseYear: new Date().getFullYear(),
        director: '',
        poster: ''
      });
      setPosterPreview('');
      fetchMovies();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add movie');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'poster') {
      setPosterPreview(value);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPG, PNG, etc.)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({
          ...formData,
          poster: base64String
        });
        setPosterPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPoster = () => {
    setFormData({
      ...formData,
      poster: ''
    });
    setPosterPreview('');
    const fileInput = document.getElementById('adminPosterUpload');
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ Are you sure you want to delete this movie? This action cannot be undone.')) return;
    
    try {
      await deleteMovie(id);
      alert('🗑️ Movie deleted successfully!');
      fetchMovies();
    } catch (err) {
      alert('Failed to delete movie');
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="dashboard-title">
              <span className="title-icon">⚡</span>
              Admin Dashboard
            </h1>
            <p className="dashboard-subtitle">Manage your movie collection</p>
          </div>
          <button 
            className="btn btn-add" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '➕ Add New Movie'}
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card card">
            <div className="stat-icon movies-icon">🎬</div>
            <div className="stat-content">
              <div className="stat-value">{movies.length}</div>
              <div className="stat-label">Total Movies</div>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon rated-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-value">
                {movies.filter(m => m.averageRating > 0).length}
              </div>
              <div className="stat-label">Rated Movies</div>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon genres-icon">🎭</div>
            <div className="stat-content">
              <div className="stat-value">
                {new Set(movies.map(m => m.genre)).size}
              </div>
              <div className="stat-label">Genres</div>
            </div>
          </div>
        </div>

        {showForm && (
          <form className="admin-form card" onSubmit={handleSubmit}>
            <div className="form-header-admin">
              <h3>➕ Add New Movie</h3>
              <p>Fill in the details to add a movie to the collection</p>
            </div>
            
            <div className="form-grid-admin">
              <div className="form-group full-width">
                <label>Movie Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter movie title"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter movie description"
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Genre *</label>
                <select
                  value={formData.genre}
                  onChange={(e) => setFormData({...formData, genre: e.target.value})}
                  required
                >
                  <option value="">Select Genre</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Animation">Animation</option>
                  <option value="Documentary">Documentary</option>
                </select>
              </div>

              <div className="form-group">
                <label>Release Year *</label>
                <input
                  type="number"
                  value={formData.releaseYear}
                  onChange={(e) => setFormData({...formData, releaseYear: e.target.value})}
                  min="1900"
                  max={new Date().getFullYear() + 2}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Director *</label>
                <input
                  type="text"
                  value={formData.director}
                  onChange={(e) => setFormData({...formData, director: e.target.value})}
                  placeholder="Director name"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Movie Poster (Optional)</label>
                <div className="poster-upload-section">
                  <div className="upload-options">
                    <div className="upload-option">
                      <label htmlFor="adminPosterUpload" className="upload-btn">
                        📁 Upload Image (JPG, PNG)
                      </label>
                      <input
                        type="file"
                        id="adminPosterUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                    
                    <div className="upload-divider">OR</div>
                    
                    <div className="upload-option">
                      <input
                        type="url"
                        name="poster"
                        value={formData.poster.startsWith('data:') ? '' : formData.poster}
                        onChange={handleChange}
                        placeholder="Enter poster URL"
                        className="url-input"
                      />
                    </div>
                  </div>

                  {posterPreview && (
                    <div className="poster-preview">
                      <img src={posterPreview} alt="Poster preview" />
                      <button 
                        type="button" 
                        className="btn-clear-poster"
                        onClick={clearPoster}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}
                </div>
                <small className="form-hint">
                  💡 Tip: Use image URLs from IMDb or TMDB for best quality. Max size: 2MB
                </small>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
              {loading ? 'Adding Movie...' : '✓ Add Movie'}
            </button>
          </form>
        )}

        <div className="movies-management-section">
          <div className="section-header-admin">
            <h3>🎬 Movie Collection</h3>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="movies-table">
            {filteredMovies.length === 0 ? (
              <div className="no-movies-admin">
                <span className="empty-icon">📽️</span>
                <p>No movies found. Add your first movie!</p>
              </div>
            ) : (
              filteredMovies.map((movie) => (
                <div key={movie._id} className="movie-row-admin card">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="movie-thumb-admin"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x120/424242/FFFFFF?text=No+Poster';
                    }}
                  />
                  <div className="movie-details-admin">
                    <h4 className="movie-title-admin">{movie.title}</h4>
                    <div className="movie-meta-admin">
                      <span className="meta-item-admin">📅 {movie.releaseYear}</span>
                      <span className="meta-divider-admin">•</span>
                      <span className="meta-item-admin">🎭 {movie.genre}</span>
                      <span className="meta-divider-admin">•</span>
                      <span className="meta-item-admin">🎬 {movie.director}</span>
                    </div>
                    <div className="rating-badge-admin">
                      ⭐ {movie.averageRating.toFixed(1)} / 5
                    </div>
                  </div>
                  <button 
                    className="btn-delete-admin"
                    onClick={() => handleDelete(movie._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="admin-info-box card">
          <span className="info-icon">ℹ️</span>
          <div>
            <strong>Admin Account Note:</strong>
            <p>As an admin, you can add and manage movies but cannot submit reviews or ratings. Only user accounts can rate movies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;