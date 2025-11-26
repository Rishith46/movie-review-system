import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerService } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const data = await registerService({ name, email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="branding-content">
            <div className="branding-icon">🎬</div>
            <h1 className="branding-title">Join CineRate</h1>
            <p className="branding-subtitle">
              Start Your Movie Rating Journey Today
            </p>
            <div className="branding-stats">
              <div className="stat-box">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Movies</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">500+</div>
                <div className="stat-label">Users</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">5000+</div>
                <div className="stat-label">Reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <div className="form-header-compact">
              <h2>Create Account</h2>
              <p>Sign up to start rating and reviewing movies</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (min 6 characters)"
                    minLength="6"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-with-icon">
                  <span className="input-icon">🔑</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    minLength="6"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block btn-large" 
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>Already have an account?</span>
            </div>

            <Link to="/login" className="auth-switch-link">
              <button className="btn btn-secondary btn-block">
                Login Instead
              </button>
            </Link>

            <div className="terms-note">
              By registering, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;