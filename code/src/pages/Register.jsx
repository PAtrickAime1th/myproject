import React, { useState } from 'react';
import { fetchAPI } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // start animation
    try {
      const res = await fetchAPI('/auth/register', 'POST', { username, password });
      if (res.id) {
        alert('Registration successful! You can now login.');
        navigate('/login');
      } else {
        alert(res.error || 'Registration failed');
      }
    } finally {
      setLoading(false); // stop animation
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '25rem' }}>
        <h2 className="text-center fw-bold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn btn-dark"
              disabled={loading} // disable while registering
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </button>
          </div>
          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}