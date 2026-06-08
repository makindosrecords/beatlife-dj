import React, { useState, useRef } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { ASSETS } from '../../data/constants';

const HeroSection = ({ onNavigate, onOpenContact }) => {
  const heroVideoRef = useRef(null);
  const [videoSrc] = useState(ASSETS.HERO_VIDEO);

  return (
    <header className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Instant high-performance loop loading since payload is highly compressed to 2MB */}
      <video 
        ref={heroVideoRef}
        autoPlay loop muted playsInline
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover scale-[1.01] transition-opacity duration-1000"
        style={{ opacity: videoSrc ? 1 : 0 }}
        aria-hidden="true"
      >
        <track kind="captions" src="" label="Muted loop video" default />
      </video>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black"></div>
      
      <div className="relative z-20 text-center px-6 max-w-[1600px] flex flex-col items-center justify-center h-full pt-16">
        <img 
          src={ASSETS.HERO_LOGO} 
          alt="Beatlife main corporate emblem" 
          fetchpriority="high"
          width="448"
          height="214"
          className="w-[16rem] md:w-[28rem] h-auto mb-6 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-pulse" 
        />
        
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cyan-500" aria-hidden="true" />
            <span className="text-[10px] font-black text-white/90 tracking-[0.3em] uppercase leading-none">Experience 3,000+ Unforgettable Events</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-[1000] leading-[0.9] tracking-tighter uppercase italic mb-6 drop-shadow-2xl">
            PLAY FROM <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-cyan-700">THE HEART</span>
          </h1>

          <p className="text-lg md:text-2xl font-bold uppercase italic text-white/80 drop-shadow-md mb-8 max-w-4xl mx-auto leading-tight">
            turning events into <span className="text-white">unforgettable experiences</span>
          </p>

          <div className="flex flex-wrap gap-4 md:gap-8 justify-center pb-6">
            <button onClick={() => onNavigate('showcase')} className="group flex items-center gap-4 px-6 py-4 text-white font-black uppercase text-[10px] md:text-xs tracking-widest transition-all hover:text-cyan-400">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-500 transition-all"><Play className="w-4 h-4 md:w-5 md:h-5 fill-current" aria-hidden="true" /></div>
              Watch Intro
            </button>
            <button onClick={onOpenContact} className="bg-white text-black px-12 md:px-16 py-5 md:py-6 rounded-full font-black text-[11px] md:text-xs uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl">Start Consultation</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;