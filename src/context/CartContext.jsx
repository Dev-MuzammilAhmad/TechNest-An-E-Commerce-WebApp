// CartContext.jsx — Global cart state
// Manages all cart operations across the entire app

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {

  // cartItems = array of { ...product, quantity }
  const [cartItems, setCartItems] = useState([]);

  // On app load, restore cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('technest_cart');
    if (savedCart) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Every time cartItems changes, save to localStorage
  useEffect(() => {
    localStorage.setItem('technest_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ── ADD TO CART ──
  const addToCart = (product) => {
    setCartItems(prev => {
      // Check if product already exists in cart
      const exists = prev.find(item => item.id === product.id);

      if (exists) {
        // If yes, just increase quantity
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If no, add new item with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // ── REMOVE FROM CART ──
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // ── UPDATE QUANTITY ──
  const updateQuantity = (productId, newQuantity) => {
    // If quantity goes to 0, remove the item
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // ── CLEAR CART ──
  const clearCart = () => {
    setCartItems([]);
  };

  // ── COMPUTED VALUES ──

  // Total number of items (sum of all quantities)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}