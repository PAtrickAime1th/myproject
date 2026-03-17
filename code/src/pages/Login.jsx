  import React, { useState } from 'react';
  import { fetchAPI } from '../utils/api';
  import { useNavigate, Link } from 'react-router-dom';

  export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await fetchAPI('/auth/login', 'POST', { username, password });

        if (res.token) {
          // ✅ Store token separately
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));

          navigate('/'); // go to quiz list
        } else {
          alert(res.error || 'Login failed');
        }
      } catch (err) {
        console.error(err);
        alert('Login failed');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow" style={{ width: '25rem' }}>
          <h2 className="text-center fw-bold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
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
              <button type="submit" className="btn btn-dark" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : null}
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
            <p className="text-center">
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }