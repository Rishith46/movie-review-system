import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../services/movieService';
import './AddMovie.css';

const AddMovie = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [posterPreview, setPosterPreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    director: '',
    poster: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createMovie(formData);
      alert('🎉 Movie added successfully!');
      navigate('/');
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

    // Update preview for poster URL
    if (name === 'poster') {
      setPosterPreview(value);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      // Check file type
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
    // Clear file input
    const fileInput = document.getElementById('posterUpload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="add-movie-page">
      <div className="container">
        <div className="add-movie-container">
          <div className="form-header">
            <h1>🎬 Add a New Movie</h1>
            <p>Share your favorite movie with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="add-movie-form card">
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Movie Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter movie title"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about the movie..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Genre *</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
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
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear() + 2}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Director *</label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  placeholder="Director name"
                  required
                />
              </div>

              {/* Movie Poster Section */}
              <div className="form-group full-width">
                <label>Movie Poster (Optional)</label>
                <div className="poster-upload-section">
                  <div className="upload-options">
                    <div className="upload-option">
                      <label htmlFor="posterUpload" className="upload-btn">
                        📁 Upload Image (JPG, PNG)
                      </label>
                      <input
                        type="file"
                        id="posterUpload"
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

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Adding Movie...' : '✓ Add Movie'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;