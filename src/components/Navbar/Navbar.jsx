// Navbar.jsx — Now connected to AuthContext

import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BsPersonCircle, BsBoxArrowRight } from 'react-icons/bs';
import logo from '../../assets/logo.png';
import './Navbar.css';
import { useCart } from '../../context/CartContext';
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">

      {/* ── Logo ── */}
      <Link to="/" className="navbar__logo" onClick={closeMenu}>
        <img src={logo} alt="TechNest" className="navbar__logo-img" />
      </Link>

      {/* ── Nav Links ── */}
      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        <li><NavLink to="/" onClick={closeMenu} end>Home</NavLink></li>
        <li><NavLink to="/products" onClick={closeMenu}>Products</NavLink></li>
        <li><NavLink to="/cart" onClick={closeMenu}>Cart</NavLink></li>
      </ul>

      {/* ── Right Side ── */}
      <div className="navbar__right">

        <div className="navbar__actions">
          {currentUser ? (
            // ── Logged In: show name + dropdown ──
            <div className="navbar__user" onClick={() => setDropdownOpen(prev => !prev)}>
              <BsPersonCircle className="navbar__user-icon" />
              <span className="navbar__user-name">{currentUser.name}</span>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <p className="navbar__dropdown-email">{currentUser.email}</p>
                  <button className="navbar__dropdown-logout" onClick={handleLogout}>
                    <BsBoxArrowRight />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // ── Not Logged In: show Login/Signup ──
            <>
              <Link to="/login" className="navbar__btn navbar__btn--outline" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="navbar__btn navbar__btn--filled" onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="navbar__cart-btn" onClick={closeMenu}>
          🛒
          {/* Show count only if items exist */}
          {totalItems > 0 && (
            <span className="navbar__cart-count">{totalItems}</span>
          )}
        </Link>

        {/* Hamburger */}
        <button className="navbar__hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;