import { useState, useEffect } from 'react';

export const useAppSetup = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById('scroll-anchor');
    if (anchor) {
      const observer = new IntersectionObserver(([entry]) => {
        setScrolled(!entry.isIntersecting);
      }, { threshold: 0 });
      observer.observe(anchor);
      
      return () => observer.disconnect();
    }
  }, []);

  return { scrolled };
};