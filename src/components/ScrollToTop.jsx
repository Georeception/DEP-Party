import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Using requestAnimationFrame to ensure the scroll happens after the page render
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Using 'instant' instead of 'smooth' for immediate scroll
      });
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop; 