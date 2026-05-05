// BackToTop.jsx — Floating button that appears after scrolling down

import { useState, useEffect } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import './BackToTop.css';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Don't render if not visible
  if (!visible) return null;

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <BsArrowUp />
    </button>
  );
}

export default BackToTop;
