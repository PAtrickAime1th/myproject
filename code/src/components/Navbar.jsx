import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container">
        {/* Left: Back button */}
        <button className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>
          &larr; Back
        </button>

        {/* Left: Logout button */}
        <button className="btn btn-dark me-auto" onClick={handleLogout}>
          Logout
        </button>

        {/* Right: Logo */}
        <Link className="navbar-brand text-dark fw-bold me-3" to="/" style={{ textDecoration: 'none' }}>
          Quiz App
        </Link>

        {/* Right: User info */}
        {user && (
          <div className="d-flex align-items-center">
            {/* Circle avatar with initials */}
            <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center me-2" style={{ width: '35px', height: '35px' }}>
              {user.username[0].toUpperCase()}
            </div>
            <span className="fw-semibold text-dark">{user.username}</span>
          </div>
        )}
      </div>
    </nav>
  );
} 