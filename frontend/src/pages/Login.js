import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginService({ email, password });
      
      // Check if login type matches user role
      if (loginType === 'admin' && data.role !== 'admin') {
        setError('Invalid admin credentials. Please use admin account.');
        setLoading(false);
        return;
      }
      
      if (loginType === 'user' && data.role === 'admin') {
        setError('This is an admin account. Please use Admin Login.');
        setLoading(false);
        return;
      }

      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
            <h1 className="branding-title">CineRate</h1>
            <p className="branding-subtitle">
              Discover, Rate & Share Your Favorite Movies
            </p>
            <div className="branding-features">
              <div className="feature-item">
                <span className="feature-icon">⭐</span>
                <span>Rate Movies</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <span>Write Reviews</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎭</span>
                <span>Discover Films</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <div className="login-type-switch">
              <button
                className={`switch-btn ${loginType === 'user' ? 'active' : ''}`}
                onClick={() => setLoginType('user')}
              >
                <span className="switch-icon">👤</span>
                User Login
              </button>
              <button
                className={`switch-btn ${loginType === 'admin' ? 'active' : ''}`}
                onClick={() => setLoginType('admin')}
              >
                <span className="switch-icon">⚡</span>
                Admin Login
              </button>
            </div>

            <div className="form-header-compact">
              <h2>Welcome Back!</h2>
              <p>Login to continue your movie journey</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
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
                    placeholder="Enter your password"
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
                    Logging in...
                  </span>
                ) : (
                  `Login as ${loginType === 'admin' ? 'Admin' : 'User'}`
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>New to CineRate?</span>
            </div>

            <Link to="/register" className="auth-switch-link">
              <button className="btn btn-secondary btn-block">
                Create an Account
              </button>
            </Link>

            {loginType === 'admin' && (
              <div className="admin-note">
                <span>⚠️</span>
                <p>Admin accounts are for content management only</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;