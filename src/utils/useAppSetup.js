import { useState, useEffect } from 'react';
import { ASSETS } from '../data/constants';

export const useAppSetup = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "Professional Wedding DJ & Event Entertainment in Orlando | BeatLife DJ";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "BeatLife DJ provides professional wedding DJ, MC, and event entertainment services in Orlando, Florida. Book Dustin Anderson for an unforgettable experience.";

    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "EntertainmentBusiness",
        "name": "BeatLife DJ",
        "image": "https://www.beatlifedj.com" + ASSETS.HERO_LOGO,
        "@id": "https://www.beatlifedj.com",
        "url": "https://www.beatlifedj.com",
        "telephone": "+1-321-400-3507",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Orlando",
          "addressRegion": "FL",
          "addressCountry": "US"
        },
        "description": "Professional wedding DJ, MC, and event entertainment services in Orlando, Florida.",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=100086740441401",
          "https://www.instagram.com/beatlifedj",
          "https://www.weddingwire.com/biz/the-game-plan-orlando/dceca396dc820257.html",
          "https://www.theknot.com/marketplace/beat-life-dj-orlando-fl-2100018"
        ]
      };
      schemaScript.text = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    }

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