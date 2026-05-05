// ToastContext.jsx — Makes toast available everywhere in the app

import { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast/Toast';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  // toast = { message, type } or null

  // Show a toast — useCallback prevents unnecessary re-renders
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Hide the toast
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Render toast here so it overlays everything */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  return useContext(ToastContext);
}
