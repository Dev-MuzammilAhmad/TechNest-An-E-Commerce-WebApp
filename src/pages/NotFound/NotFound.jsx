// NotFound.jsx — 404 page shown when URL doesn't match any route

import { Link } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">

      {/* Big 404 text */}
      <div className="not-found__code">404</div>

      <h1 className="not-found__title">Page Not Found</h1>
      <p className="not-found__text">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="not-found__btns">
        <Link to="/" className="not-found__btn not-found__btn--primary">
          <BsHouseDoor />
          Back to Home
        </Link>
        <Link to="/products" className="not-found__btn not-found__btn--outline">
          Browse Products
        </Link>
      </div>

    </div>
  );
}

export default NotFound;
