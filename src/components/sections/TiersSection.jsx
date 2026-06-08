import React from 'react';
import { Check } from 'lucide-react';
import { packages } from '../../data/constants';

const TiersSection = ({ onOpenContact }) => {
  return (
    <section id="tiers" className="scroll-mt-24 py-32 bg-[#0a0a0a] px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
           <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Heart <span className="text-cyan-500 underline decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">Packages</span></h2>
           <p className="text-xs font-black uppercase tracking-[0.4em] text-white/70">wedding packages designed around your love story</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`group relative p-12 rounded-[3rem] border transition-all duration-700 flex flex-col items-center text-center backdrop-blur-3xl bg-neutral-950/80 border-white/5 hover:border-white/20 hover:opacity-100 ${
                pkg.featured 
                  ? 'scale-105 z-10 opacity-100 border-cyan-500/40 shadow-[0_20px_50px_rgba(34,211,238,0.1)]' 
                  : 'opacity-75'
              }`}
            >
              
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-8 py-2 rounded-full text-[9px] font-black tracking-widest uppercase shadow-2xl">
                  Signature Choice
                </div>
              )}

              <div className="mb-10 h-40 w-full relative flex items-center justify-center">
                {pkg.count === 1 && (
                  <img src={pkg.icon} className="w-36 h-36 object-contain transition-transform duration-700 group-hover:scale-110" alt={`${pkg.name} single headphone equipment pack logo`} width="144" height="144" />
                )}
                {pkg.count === 2 && (
                  <div className="relative w-48 h-36 flex items-center justify-center">
                    <img src={pkg.icon} className="w-28 h-28 object-contain absolute transition-all duration-700 -translate-x-8 -rotate-12 group-hover:-translate-x-10 group-hover:-rotate-15" alt={`${pkg.name} left headphone gear`} width="112" height="112" />
                    <img src={pkg.icon} className="w-28 h-28 object-contain absolute transition-all duration-700 translate-x-8 rotate-12 group-hover:translate-x-10 group-hover:rotate-15 z-10" alt={`${pkg.name} right headphone gear`} width="112" height="112" />
                  </div>
                )}
                {pkg.count === 3 && (
                  <div className="relative w-56 h-36 flex items-center justify-center">
                    <img src={pkg.icon} className="w-24 h-24 object-contain absolute transition-all duration-700 -translate-x-16 -rotate-12 opacity-85 group-hover:-translate-x-18 group-hover:-rotate-15" alt={`${pkg.name} left headphone`} width="96" height="96" />
                    <img src={pkg.icon} className="w-24 h-24 object-contain absolute transition-all duration-700 translate-x-16 rotate-12 opacity-85 group-hover:translate-x-18 group-hover:rotate-15 z-10" alt={`${pkg.name} right headphone`} width="96" height="96" />
                    <img src={pkg.icon} className="w-28 h-28 object-contain absolute transition-all duration-700 z-20 scale-110 drop-shadow-[0_10px_20px_rgba(34,211,238,0.3)] group-hover:scale-115" alt={`${pkg.name} center main headphone`} width="112" height="112" />
                  </div>
                )}
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 text-cyan-500">{pkg.tier}</p>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-8 leading-none">{pkg.name}</h3>
              
              <ul className="space-y-4 mb-12 text-left w-full flex-grow">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-4 text-[10px] font-bold uppercase tracking-widest opacity-70 leading-relaxed">
                    <Check className="w-4 h-4 flex-shrink-0 text-cyan-500" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenContact}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                  pkg.featured ? 'bg-cyan-500 text-black hover:bg-white hover:text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'
                }`}
              >
                Book Date
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TiersSection;