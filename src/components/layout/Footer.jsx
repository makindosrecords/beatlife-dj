import React from 'react';
import { ASSETS } from '../../data/constants';
import { FacebookIcon, InstagramIcon, WeddingWireIcon, TheKnotIcon } from '../ui/Icons';

const Footer = () => {
  return (
    <footer className="py-24 px-6 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="flex items-center gap-5">
          <img src={ASSETS.NAV_HEART} className="w-14 grayscale opacity-40" alt="Beatlife Decorative Heart Logo" width="56" height="56" />
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70 italic leading-none">Beatlife Entertainment</p>
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest italic">Play from the heart</p>
          </div>
        </div>
        
        {/* Expanded Footer Social Bar */}
        <div className="flex gap-6 items-center">
          <a href="https://www.facebook.com/profile.php?id=100086740441401" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on Facebook">
            <FacebookIcon className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/beatlifedj" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on Instagram">
            <InstagramIcon className="w-6 h-6" />
          </a>
          <a href="https://www.weddingwire.com/biz/the-game-plan-orlando/dceca396dc820257.html" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on WeddingWire">
            <WeddingWireIcon className="w-6 h-6" />
          </a>
          <a href="https://www.theknot.com/marketplace/beat-life-dj-orlando-fl-2100018#unified-lightbox-modal" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on The Knot">
            <TheKnotIcon className="w-6 h-6" />
          </a>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none text-white/60">© 2026 The Vision Guided.</p>
          <p className="text-[8px] font-black uppercase tracking-[0.4em] italic leading-none text-white/60">Orlando / Nationwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;