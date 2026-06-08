import React, { useState, useEffect } from 'react';
import { ASSETS } from './data/constants';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ShowcaseSection from './components/sections/ShowcaseSection';
import ServicesSection from './components/sections/ServicesSection';
import TiersSection from './components/sections/TiersSection';
import CompanySection from './components/sections/CompanySection';
import TeamSection from './components/sections/TeamSection';
import ReviewsSection from './components/sections/ReviewsSection';
import InstagramFeed from './components/sections/InstagramFeed';
import ContactModal from './components/ui/ContactModal';
import { useAppSetup } from './utils/useAppSetup';

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
      
      {/* Scroll anchor target observed by event observer to prevent scroll layout thrashing */}
      <div id="scroll-anchor" className="absolute top-0 left-0 w-full h-1 pointer-events-none"></div>

      <Navbar scrolled={scrolled} onNavigate={scrollToSection} onOpenContact={() => setIsContactOpen(true)} />

      <HeroSection onNavigate={scrollToSection} onOpenContact={() => setIsContactOpen(true)} />
      <ShowcaseSection />

      <ServicesSection onOpenContact={() => setIsContactOpen(true)} />
      <TiersSection onOpenContact={() => setIsContactOpen(true)} />

      <CompanySection />

      <TeamSection onOpenContact={() => setIsContactOpen(true)} />

      <ReviewsSection />

      {isContactOpen && (
        <ContactModal onClose={() => setIsContactOpen(false)} />
      )}

      <InstagramFeed />

      <Footer />

    </div>
  );
};

export default App;