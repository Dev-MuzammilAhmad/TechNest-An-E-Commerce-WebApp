// ProductCard.jsx — Reusable product card
// Handles Add to Cart with login check

import { BsStarFill, BsStarHalf, BsStar, BsCart3 } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

// ── Star Rating Component ──
function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<BsStarFill key={i} className="star star--filled" />);
    } else if (rating >= i - 0.5) {
      stars.push(<BsStarHalf key={i} className="star star--half" />);
    } else {
      stars.push(<BsStar key={i} className="star star--empty" />);
    }
  }
  return <div className="star-rating">{stars}</div>;
}

// ── Format price ──
function formatPrice(price) {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

// ── Discount calculator ──
function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    name, price, originalPrice,
    rating, reviews, image,
    badge, inStock, description,
  } = product;

  const discount = getDiscount(originalPrice, price);

  // Check if this product is already in cart
  const inCart = cartItems.some(item => item.id === product.id);

  // ── Handle Add to Cart ──
  const handleAddToCart = () => {
    if (!currentUser) {
      showToast('Please login first to add items to cart!', 'error');
      navigate('/login');
      return;
    }
    addToCart(product);
    // Show different message if already in cart
    if (inCart) {
      showToast(`${name} quantity updated!`, 'info');
    } else {
      showToast(`${name} added to cart!`, 'success');
    }
  };

  return (
    <div className={`product-card ${!inStock ? 'product-card--out-of-stock' : ''}`}>

      {/* ── Image ── */}
      <div className="product-card__image-wrap">
        <img
          src={image}
          alt={name}
          className="product-card__image"
          onError={(e) => {
            e.target.src = 'https://placehold.co/300x200?text=No+Image';
          }}
        />
        {badge && (
          <span className={`product-card__badge product-card__badge--${badge.toLowerCase().replace(' ', '-')}`}>
            {badge}
          </span>
        )}
        {!inStock && (
          <div className="product-card__overlay">
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="product-card__info">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__desc">{description}</p>

        <div className="product-card__rating">
          <StarRating rating={rating} />
          <span className="product-card__reviews">({reviews})</span>
        </div>

        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(price)}</span>
          <span className="product-card__original-price">{formatPrice(originalPrice)}</span>
          <span className="product-card__discount">-{discount}%</span>
        </div>

        {/* ── Add to Cart Button ── */}
        <button
          className={`product-card__btn ${inCart ? 'product-card__btn--in-cart' : ''}`}
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          <BsCart3 />
          {/* Show different text based on cart state */}
          {!inStock ? 'Out of Stock' : inCart ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>

      </div>
    </div>
  );
}

export default ProductCard;