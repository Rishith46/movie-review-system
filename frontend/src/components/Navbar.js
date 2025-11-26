import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🎬</span>
          <span className="brand-text">CineRate</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            Discover
          </Link>
          
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link to="/admin" className="nav-link admin-link">
                  <span className="nav-icon">⚡</span>
                  Admin Panel
                </Link>
              ) : (
                <Link to="/add-movie" className="nav-link user-link">
                  <span className="nav-icon">➕</span>
                  Add Movie
                </Link>
              )}
              
              <div className="user-menu-wrapper">
                <div 
                  className="user-menu"
                  onClick={toggleDropdown}
                >
                  <div className="user-avatar">
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="user-name">{user.name}</span>
                  <span className="user-role-badge">{user.role}</span>
                  <span className="dropdown-arrow">{showDropdown ? '▲' : '▼'}</span>
                </div>
                
                {showDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <div className="dropdown-user-info">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="dropdown-item">
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register">
                <button className="btn btn-primary">Get Started</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;