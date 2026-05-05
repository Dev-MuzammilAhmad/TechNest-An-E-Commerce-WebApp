// Footer.jsx — Bottom section of every page
// Contains brand info, quick links, categories and contact

import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">

      {/* ── Main Footer Content ── */}
      <div className="footer__container">

        {/* Column 1: Brand Info */}
        <div className="footer__brand">
          <h2 className="footer__brand-name">TechNest</h2>
          <p className="footer__slogan">Smart Home Technology</p>
          <p className="footer__desc">
            Your one-stop destination for smart home devices, mobiles,
            laptops and accessories. Quality tech, delivered to your door.
          </p>
          {/* Social links — just placeholders for now */}
          <div className="footer__socials">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="YouTube">▶️</a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer__col">
          <h3 className="footer__col-heading">Quick Links</h3>
          <ul className="footer__col-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer__col">
          <h3 className="footer__col-heading">Categories</h3>
          <ul className="footer__col-links">
            {/* We'll link to filtered product pages later */}
            <li><Link to="/products?category=smart-home">🏠 Smart Home Devices</Link></li>
            <li><Link to="/products?category=mobiles">📱 Mobiles & Tablets</Link></li>
            <li><Link to="/products?category=laptops">💻 Laptops & Computers</Link></li>
            <li><Link to="/products?category=accessories">🎧 Accessories</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer__col">
          <h3 className="footer__col-heading">Contact Us</h3>
          <ul className="footer__contact-list">
            <li>
              <span className="footer__contact-icon">📍</span>
              <span>Peshawar, Pakistan</span>
            </li>
            <li>
              <span className="footer__contact-icon">📧</span>
              <span>support@technest.pk</span>
            </li>
            <li>
              <span className="footer__contact-icon">📞</span>
              <span>+92 300 0000000</span>
            </li>
            <li>
              <span className="footer__contact-icon">🕐</span>
              <span>Mon–Sat: 9am – 6pm</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer__bottom">
        <p>© 2025 TechNest. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;