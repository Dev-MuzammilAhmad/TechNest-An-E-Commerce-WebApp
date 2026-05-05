// Signup.jsx — Registration page

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BsPerson, BsEnvelope, BsLockFill, BsEye, BsEyeSlash } from 'react-icons/bs';
import './Signup.css';

function Signup() {
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  // ── Form State ──
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);

  // If already logged in, redirect to home
  if (currentUser) {
    navigate('/');
    return null;
  }

  // ── Handle Input Change ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // ── Validate Form ──
  const validate = () => {
    if (!formData.name.trim()) {
      return 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      return 'Please enter your email.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match!';
    }
    return null; // null means no error
  };

  // ── Handle Submit ──
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Run validation first
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    // Call signup from AuthContext
    const result = signup(formData.name, formData.email, formData.password);

    if (result.success) {
      // Show success message then redirect to login after 2 seconds
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
          <h1 className="auth-card__title">Create Account</h1>
          <p className="auth-card__subtitle">Join TechNest — Smart Home Technology</p>
        </div>

        {/* ── Success Message ── */}
        {success && (
          <div className="auth-success">
            ✅ Account created successfully! Redirecting to login...
          </div>
        )}

        {/* ── Error Message ── */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* ── Form ── */}
        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Name Field */}
          <div className="auth-field">
            <label className="auth-label">Full Name</label>
            <div className="auth-input-wrap">
              <BsPerson className="auth-input-icon" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="auth-input"
                autoComplete="name"
              />
            </div>
          </div>

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
                placeholder="Minimum 6 characters"
                className="auth-input"
                autoComplete="new-password"
              />
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

          {/* Confirm Password Field */}
          <div className="auth-field">
            <label className="auth-label">Confirm Password</label>
            <div className="auth-input-wrap">
              <BsLockFill className="auth-input-icon" />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="auth-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-input-toggle"
                onClick={() => setShowConfirm(prev => !prev)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading || success}
          >
            {loading ? 'Creating account...' : success ? 'Account Created! ✅' : 'Create Account'}
          </button>

        </form>

        {/* ── Footer ── */}
        <p className="auth-card__footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Login here</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;