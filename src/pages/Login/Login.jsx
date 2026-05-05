// Login.jsx — Login page

import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BsEnvelope, BsLockFill, BsEye, BsEyeSlash } from 'react-icons/bs';
import './Login.css';

function Login() {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  // ── Form State ──
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If already logged in, redirect to home
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  // ── Handle Input Change ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  // ── Handle Submit ──
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Call login from AuthContext
    const result = login(formData.email, formData.password);

    if (result.success) {
      navigate('/'); // Redirect to home on success
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* ── Header ── */}
        <div className="auth-card__header">
          <h1 className="auth-card__title">Welcome Back</h1>
          <p className="auth-card__subtitle">Login to your TechNest account</p>
        </div>

        {/* ── Error Message ── */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* ── Form ── */}
        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Email Field */}
          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <div className="auth-input-wrap">
              <BsEnvelope className="auth-input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="auth-input"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <BsLockFill className="auth-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="auth-input"
                autoComplete="current-password"
              />
              {/* Toggle password visibility */}
              <button
                type="button"
                className="auth-input-toggle"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        {/* ── Footer ── */}
        <p className="auth-card__footer">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">Sign up for free</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;