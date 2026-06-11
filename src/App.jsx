import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { ASSETS } from './data/constants';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ShowcaseSection from './components/sections/ShowcaseSection';
import ServicesSection from './components/sections/ServicesSection';
import TiersSection from './components/sections/TiersSection';
import { useAppSetup } from './utils/useAppSetup';

const CompanySection = lazy(() => import('./components/sections/CompanySection'));
const TeamSection = lazy(() => import('./components/sections/TeamSection'));
const ReviewsSection = lazy(() => import('./components/sections/ReviewsSection'));
const InstagramFeed = lazy(() => import('./components/sections/InstagramFeed'));
const ContactModal = lazy(() => import('./components/ui/ContactModal'));

const schemaData = {
  "@context": "https://schema.org",
  "@type": [
    "EntertainmentBusiness",
    "LocalBusiness"
  ],
  "@id": "https://www.beatlifedj.com/#entertainmentbusiness",
  "name": "BeatLife DJ",
  "url": "https://www.beatlifedj.com",
  "logo": "https://www.beatlifedj.com" + ASSETS.HERO_LOGO,
  "image": "https://www.beatlifedj.com" + ASSETS.HERO_LOGO,
  "telephone": "+1-321-400-3507",
  "priceRange": "$$$",
  "description": "Professional wedding DJ, master of ceremonies hosting, luxury event entertainment, and custom uplighting services in Orlando and the Central Florida area.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Orlando",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "28.538336",
    "longitude": "-81.379234"
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Orlando" },
    { "@type": "AdministrativeArea", "name": "Central Florida" },
    { "@type": "AdministrativeArea", "name": "Winter Park" }
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=100086740441401",
    "https://www.instagram.com/beatlifedj",
    "https://www.weddingwire.com/biz/the-game-plan-orlando/dceca396dc820257.html",
    "https://www.theknot.com/marketplace/beat-life-dj-orlando-fl-2100018",
    "https://maps.google.com/?cid=12147326463996504230"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "DJ and Event Production Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wedding DJ Service",
          "description": "Professional mobile disc jockey and master of ceremonies hosting for wedding ceremonies and receptions.",
          "sameAs": "https://en.wikipedia.org/wiki/Disc_jockey"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Event Uplighting & Production",
          "description": "Custom interior room venue uplighting, wireless dance floor effect lighting, and high-fidelity sound reinforcement.",
          "sameAs": "https://en.wikipedia.org/wiki/DJ_lighting"
        }
      }
    ]
  }
};

const App = () => {
  const { scrolled } = useAppSetup();
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
  }, []);

  // Optimize scrolling offset reflows using native browser behavior without querying geometry parameters in JS
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden antialiased">
      
      <Helmet>
        <title>BeatLife DJ | Premier Orlando Wedding & Event DJ</title>
        <meta name="description" content="BeatLife DJ provides professional wedding DJ, MC, and event entertainment services in Orlando, Florida. Book Dustin Anderson for an unforgettable experience." />
        <link rel="canonical" href="https://www.beatlifedj.com/" />
        
        {/* Open Graph / Facebook / iMessage */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.beatlifedj.com/" />
        <meta property="og:title" content="BeatLife DJ | Premier Orlando Wedding & Event DJ" />
        <meta property="og:description" content="Professional wedding DJ, master of ceremonies hosting, and luxury event entertainment in Orlando, Florida." />
        <meta property="og:image" content={`https://www.beatlifedj.com${ASSETS.SIDE_LOGO}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://www.beatlifedj.com${ASSETS.SIDE_LOGO}`} />

        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Scroll anchor target observed by event observer to prevent scroll layout thrashing */}
      <div id="scroll-anchor" className="absolute top-0 left-0 w-full h-1 pointer-events-none"></div>

      <Navbar scrolled={scrolled} onNavigate={scrollToSection} onOpenContact={() => setIsContactOpen(true)} />

      <HeroSection onNavigate={scrollToSection} onOpenContact={() => setIsContactOpen(true)} />
      <ShowcaseSection />

      <ServicesSection onOpenContact={() => setIsContactOpen(true)} />
      <TiersSection onOpenContact={() => setIsContactOpen(true)} />

      <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <CompanySection />
        <TeamSection onOpenContact={() => setIsContactOpen(true)} />
        <ReviewsSection />

        {isContactOpen && (
          <ContactModal onClose={() => setIsContactOpen(false)} />
        )}

        <InstagramFeed />
      </Suspense>

      <Footer />

    </div>
  );
};

export default App;