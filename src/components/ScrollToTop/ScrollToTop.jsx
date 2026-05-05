// ScrollToTop.jsx — Automatically scrolls to top on every page change
// This is a utility component — renders nothing visually

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  // Every time the URL path changes, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null; // Renders nothing
}

export default ScrollToTop;
