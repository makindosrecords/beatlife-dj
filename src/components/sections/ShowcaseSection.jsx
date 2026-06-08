import React, { useState, useRef } from 'react';
import { Film, Play } from 'lucide-react';
import { ASSETS } from '../../data/constants';

const ShowcaseSection = () => {
  const showcaseVideoRef = useRef(null);
  const [showcaseStarted, setShowcaseStarted] = useState(false);

  const handlePlayShowcase = () => {
    setShowcaseStarted(true);
    if (showcaseVideoRef.current) {
      showcaseVideoRef.current.play();
    }
  };

  return (
    <section id="showcase" className="py-32 bg-[#0a0a0a] px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-4 text-cyan-500">
             <Film className="w-6 h-6" aria-hidden="true" />
             <span className="text-sm font-black uppercase tracking-[0.6em] text-white/70">The Official introduction</span>
           </div>
           <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Welcome to <span className="text-cyan-500">Beatlife</span></h2>
           <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium uppercase italic leading-relaxed">Real mixing. Real talent. Real moments.</p>
        </div>
        
        <div className="w-full relative max-w-5xl group">
          <div className="aspect-video bg-neutral-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer" onClick={handlePlayShowcase}>
            {!showcaseStarted && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-500">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-white/30 bg-black/30 backdrop-blur-[1px] flex items-center justify-center group-hover:border-cyan-500 group-hover:scale-110 transition-all duration-700"><Play className="w-8 h-8 md:w-10 md:h-10 fill-white" aria-hidden="true" /></div>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.8em] text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Start Production</p>
              </div>
            )}
            <video ref={showcaseVideoRef} controls={showcaseStarted} playsInline className="w-full h-full object-cover" src={`${ASSETS.SHOWCASE_VIDEO}#t=0.001`} preload="metadata">
              <track kind="captions" src="" label="Introduction captions" default />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;