import React, { useState } from 'react';
import { Zap, Play, ArrowRight, X, Check } from 'lucide-react';
import { ASSETS, services } from '../../data/constants';
import { parseDescription, handleImgError } from '../../utils/helpers';

const ServicesSection = ({ onOpenContact }) => {
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      <section id="services" className="scroll-mt-24 py-32 bg-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
             <div className="inline-flex items-center gap-3 text-cyan-500">
               <Zap className="w-5 h-5" aria-hidden="true" />
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">Our Capabilities</span>
             </div>
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Event <span className="text-cyan-500">Solutions</span></h2>
             <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto uppercase italic">Skilled MC's. Creative Dj's. Packed dancefloors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col space-y-6 cursor-pointer"
                onClick={() => setActiveService(service)}
              >
                <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl relative group-hover:border-cyan-500 transition-all duration-500 bg-neutral-900">
                  {service.thumbnail ? (
                    <img 
                      src={service.thumbnail} 
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                      alt={`${service.title} capabilities preview thumbnail`}
                      width="640"
                      height="480"
                      loading="lazy"
                      onError={handleImgError}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center overflow-hidden">
                      <div className="relative z-10 p-5 rounded-2xl bg-white/10 border border-white/15 text-cyan-400 shadow-2xl group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-all duration-500">
                        {service.icon}
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all duration-500">
                    <div className="w-16 h-16 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500 transition-all">
                       {service.youtubeId ? <Play className="w-6 h-6 fill-white text-white" aria-hidden="true" /> : <ArrowRight className="w-6 h-6 text-white" aria-hidden="true" />}
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-8 right-8 flex justify-start items-end z-10">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeService && (() => {
        const descData = parseDescription(activeService.desc);
        return (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-12">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fade-in" onClick={() => setActiveService(null)}></div>
            
            <div className="relative w-full max-w-7xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 max-h-[95vh] overflow-y-auto">
              <button onClick={() => setActiveService(null)} className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all" aria-label="Close details modal">
                  <X className="w-6 h-6" aria-hidden="true" />
              </button>

              <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center space-y-8 order-2 lg:order-1 bg-[#0a0a0a] text-center">
                <div className="space-y-6 flex flex-col items-center">
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none text-white w-full text-center">{activeService.title}</h2>
                  
                  {activeService.headset && (
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-2xl shrink-0 mt-2 transition-all duration-500 hover:scale-110 hover:border-cyan-500/80 hover:rotate-6 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] group/modalset">
                      <img src={activeService.headset} className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(34,211,238,0.3)]" alt={`${activeService.title} headphone emblem icon`} width="112" height="112" loading="lazy" />
                    </div>
                  )}
                  
                  <div className="text-base md:text-lg text-white/70 font-medium leading-relaxed whitespace-pre-line max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar text-left w-full mt-4 space-y-6">
                    {descData.textParagraphsBefore.map((para, pIdx) => (<p key={pIdx} className="uppercase italic">{para}</p>))}
                    {descData.listItems.length > 0 && (
                      <div className="py-6 border-t border-b border-white/10 w-full text-left my-4">
                        {descData.listTitle && <p className="text-xs font-black tracking-[0.3em] text-cyan-500 uppercase mb-4 italic">{descData.listTitle}</p>}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {descData.listItems.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-3 text-xs md:text-sm font-bold text-white/80 uppercase tracking-wide leading-tight">
                              <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" aria-hidden="true" /><span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {descData.textParagraphsAfter.map((para, pIdx) => (<p key={pIdx} className="text-cyan-400 font-bold uppercase italic tracking-wide">{para}</p>))}
                  </div>
                </div>
                <button onClick={() => { onOpenContact(); setActiveService(null); }} className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest bg-white text-black px-8 py-4 rounded-full hover:bg-cyan-500 hover:text-white transition-all w-fit shadow-xl mx-auto">Book Now</button>
              </div>

              <div className="lg:w-1/2 order-1 lg:order-2 bg-neutral-900 border-b lg:border-b-0 lg:border-l border-white/5">
                {activeService.youtubeId ? (
                  <div className="w-full h-full aspect-video lg:aspect-auto flex items-center bg-black">
                    <iframe className="w-full h-full min-h-[400px]" src={`https://www.youtube.com/embed/${activeService.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0`} frameBorder="0" allow="autoplay; encrypted-media; fullscreen" allowFullScreen title={`${activeService.title} performance reel`} />
                  </div>
                ) : activeService.thumbnail ? (
                  <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-black p-6">
                    <div className="relative w-full max-w-lg aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                      <img src={activeService.thumbnail} alt={`${activeService.title} presentation image`} className="w-full h-full object-cover opacity-95 transition-transform duration-1000" onError={handleImgError} width="500" height="500" loading="lazy" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-12 md:p-20 text-center relative overflow-hidden bg-black">
                     <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] -top-10 -left-10 pointer-events-none"></div>
                     <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] -bottom-20 -right-20 pointer-events-none"></div>
                     <div className="relative flex items-center justify-center w-40 h-40 mb-8 rounded-3xl bg-neutral-900 border border-white/10 text-cyan-400 shadow-2xl transform hover:scale-105 transition-transform duration-500">{activeService.icon}</div>
                     <img src={ASSETS.NAV_TEXT} className="w-64 opacity-25 grayscale hover:opacity-45 hover:grayscale-0 transition-all duration-500" alt="Beatlife Text brand logo" width="300" height="60" loading="lazy" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default ServicesSection;