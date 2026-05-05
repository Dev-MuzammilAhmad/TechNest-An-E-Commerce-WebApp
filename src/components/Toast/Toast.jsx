// Toast.jsx — Small notification that appears and auto-disappears

import { useEffect } from 'react';
import { BsCheckCircle, BsXCircle, BsInfoCircle, BsX } from 'react-icons/bs';
import './Toast.css';

function Toast({ message, type = 'success', onClose }) {

  // Auto close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Cleanup timer if component unmounts early
    return () => clearTimeout(timer);
  }, [onClose]);

  // Pick icon based on type
  const icons = {
    success: <BsCheckCircle />,
    error:   <BsXCircle />,
    info:    <BsInfoCircle />,
  };

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__icon">{icons[type]}</span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose} aria-label="Close">
        <BsX />
      </button>
    </div>
  );
}

export default Toast;
