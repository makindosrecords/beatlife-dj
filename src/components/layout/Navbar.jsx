import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ASSETS } from '../../data/constants';
import { FacebookIcon, InstagramIcon, WeddingWireIcon, TheKnotIcon } from '../ui/Icons';

const Navbar = ({ scrolled, onNavigate, onOpenContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (section) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  const handleContact = () => {
    onOpenContact();
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* --- REFINED BOLD NAVIGATION --- */}
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-black/95 backdrop-blur-xl py-2 border-b border-white/5 shadow-2xl' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-8 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <img src={ASSETS.NAV_HEART} alt="Beatlife Heart decorative brand symbol" width="96" height="96" className={`transition-all duration-700 h-auto ${scrolled ? 'w-12 md:w-16' : 'w-16 md:w-24'}`} />
              <img src={ASSETS.NAV_TEXT} alt="Beatlife Typography text Brandmark" width="176" height="34" className={`transition-all duration-700 h-auto ${scrolled ? 'w-24 md:w-32' : 'w-32 md:w-44'}`} />
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-10">
            {['Services', 'Tiers', 'Company', 'About', 'Reviews'].map((item) => (
              <button 
                key={item}
                onClick={() => handleNavigate(item.toLowerCase())}
                className="text-xs font-black tracking-[0.4em] uppercase transition-all text-white/60 hover:text-white relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full" aria-hidden="true"></span>
              </button>
            ))}
            
            {/* Elegant Vertical Divider */}
            <span className="w-px h-6 bg-white/10" aria-hidden="true"></span>
            
            {/* SVG Header Social Bar */}
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=100086740441401" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/beatlifedj" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.weddingwire.com/biz/the-game-plan-orlando/dceca396dc820257.html" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on WeddingWire">
                <WeddingWireIcon className="w-5 h-5" />
              </a>
              <a href="https://www.theknot.com/marketplace/beat-life-dj-orlando-fl-2100018#unified-lightbox-modal" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on The Knot">
                <TheKnotIcon className="w-5 h-5" />
              </a>
            </div>

            <span className="w-px h-6 bg-white/10" aria-hidden="true"></span>

            <button 
              onClick={handleContact}
              className="bg-white text-black px-10 py-3 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-cyan-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl"
            >
              Book Dustin
            </button>
          </div>

          <button className="xl:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Open Navigation Menu">
            <Menu className="w-8 h-8" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* --- MOBILE NAV --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 transition-transform hover:rotate-90" aria-label="Close Navigation Menu"><X className="w-10 h-10" /></button>
          <div className="space-y-12">
            {['Services', 'Tiers', 'Company', 'About', 'Reviews'].map(tab => (
              <button key={tab} onClick={() => handleNavigate(tab.toLowerCase())} className="block text-5xl font-black uppercase tracking-tighter italic hover:text-cyan-500 transition-colors">{tab}</button>
            ))}
            <button onClick={handleContact} className="block text-5xl font-black uppercase tracking-tighter italic text-cyan-500">Contact</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;