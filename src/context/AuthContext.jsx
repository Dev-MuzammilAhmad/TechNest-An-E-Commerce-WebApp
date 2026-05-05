// AuthContext.jsx — Global authentication state
// Context lets ANY component access user data without passing props down manually

import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the context object
const AuthContext = createContext();

// 2. Create the Provider component — wraps the whole app
export function AuthProvider({ children }) {

  // currentUser = logged in user object or null
  const [currentUser, setCurrentUser] = useState(null);

  // On app load, check if a user was previously logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('technest_current_user');
    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // ── SIGNUP ──
  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('technest_users') || '[]');

    // Check if email already exists
    const emailExists = users.find(u => u.email === email);
    if (emailExists) {
      return { success: false, message: 'Email already registered!' };
    }

    // Create new user object
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,             // In real apps NEVER store plain passwords!
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('technest_users', JSON.stringify(users));

    // No auto login — user must login manually
    return { success: true };
  };

  // ── LOGIN ──
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('technest_users') || '[]');

    // Find user with matching email AND password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password!' };
    }

    // Save logged in user (without password for security)
    const userWithoutPassword = { id: user.id, name: user.name, email: user.email };
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('technest_current_user', JSON.stringify(userWithoutPassword));

    return { success: true };
  };

  // ── LOGOUT ──
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('technest_current_user');
  };

  // Everything inside 'value' is accessible by any component
  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — makes using context much cleaner
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}