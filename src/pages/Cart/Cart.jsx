// Cart.jsx — Shopping cart page

import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BsTrash, BsPlus, BsDash, BsCartX, BsArrowLeft } from 'react-icons/bs';
import './Cart.css';

// Format price helper
function formatPrice(price) {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  // const navigate = useNavigate();

  // If not logged in, show login prompt
  if (!currentUser) {
    return (
      <div className="cart-empty">
        <BsCartX className="cart-empty__icon" />
        <h2>Please Login First</h2>
        <p>You need to be logged in to view your cart.</p>
        <Link to="/login" className="cart-empty__btn">
          Go to Login
        </Link>
      </div>
    );
  }

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <BsCartX className="cart-empty__icon" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="cart-empty__btn">
          Browse Products
        </Link>
      </div>
    );
  }

  // Delivery charge logic
  const deliveryCharge = totalPrice >= 50000 ? 0 : 299;
  const grandTotal = totalPrice + deliveryCharge;

  return (
    <div className="cart-page">

      {/* ── Header ── */}
      <div className="cart-page__header">
        <div className="cart-page__header-content">
          <h1>My Cart</h1>
          <p>{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="cart-page__body">

        {/* ── Left: Cart Items ── */}
        <div className="cart-items">

          {/* Clear cart button */}
          <div className="cart-items__toolbar">
            <button className="cart-clear-btn" onClick={clearCart}>
              <BsTrash /> Clear Cart
            </button>
          </div>

          {/* Item list */}
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">

              {/* Product Image */}
              <div className="cart-item__image-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item__image"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/100x100?text=No+Image';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="cart-item__info">
                <h3 className="cart-item__name">{item.name}</h3>
                <p className="cart-item__price">{formatPrice(item.price)}</p>

                {/* Quantity Controls */}
                <div className="cart-item__qty">
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <BsDash />
                  </button>
                  <span className="cart-item__qty-value">{item.quantity}</span>
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <BsPlus />
                  </button>
                </div>
              </div>

              {/* Item Total + Remove */}
              <div className="cart-item__right">
                <p className="cart-item__total">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  className="cart-item__remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <BsTrash />
                </button>
              </div>

            </div>
          ))}

          {/* Back to products link */}
          <Link to="/products" className="cart-back-link">
            <BsArrowLeft /> Continue Shopping
          </Link>

        </div>

        {/* ── Right: Order Summary ── */}
        <div className="cart-summary">
          <h2 className="cart-summary__title">Order Summary</h2>

          <div className="cart-summary__rows">
            <div className="cart-summary__row">
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Delivery</span>
              <span className={deliveryCharge === 0 ? 'cart-summary__free' : ''}>
                {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
              </span>
            </div>
            {deliveryCharge > 0 && (
              <p className="cart-summary__delivery-note">
                🎉 Add {formatPrice(50000 - totalPrice)} more for free delivery!
              </p>
            )}
          </div>

          <div className="cart-summary__divider" />

          <div className="cart-summary__total">
            <span>Grand Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>

          <button
            className="cart-summary__checkout-btn"
            onClick={() => showToast('Checkout feature coming soon!', 'info')}
          >
            Proceed to Checkout
          </button>

          {/* Accepted payments note */}
          <p className="cart-summary__note">
            🔒 Secure checkout. Cash on delivery available.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Cart;