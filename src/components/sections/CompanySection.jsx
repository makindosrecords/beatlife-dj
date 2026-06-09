import React, { useState } from 'react';
import { Users, Film, Play, Camera, ChevronLeft, ChevronRight, Eye, X, Check } from 'lucide-react';
import { ASSETS, GALLERY_ITEMS } from '../../data/constants';
import { handleImgError } from '../../utils/helpers';

const CompanySection = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isBeforeBookOpen, setIsBeforeBookOpen] = useState(false);

  const handleNextCarousel = () => setCarouselIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  const handlePrevCarousel = () => setCarouselIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  
  const handleNextSlide = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };
  
  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <>
      <section id="company" className="scroll-mt-24 py-32 bg-black px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-3 text-cyan-500">
               <Users className="w-5 h-5" aria-hidden="true" />
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">About BeatLife DJ</span>
             </div>
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">About <span className="text-cyan-500">BeatLife DJ</span></h2>
             <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto uppercase italic">Full Service Entertainment Based In Orlando, Florida</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-6 space-y-12">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest italic text-white/70 flex items-center gap-4">
                  <Film className="w-6 h-6 text-cyan-500" aria-hidden="true" /> Before You Book
                </h3>
                <div 
                  className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer"
                  onClick={() => setIsBeforeBookOpen(true)}
                >
                  <img 
                    src={`https://img.youtube.com/vi/${ASSETS.BEFORE_BOOK_YT}/hqdefault.jpg`} 
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000"
                    alt="Dustin Anderson hosting live, teaser snapshot of Before You Book briefing video"
                    onError={handleImgError}
                    width="480"
                    height="360"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/10 transition-colors duration-500">
                    <div className="w-20 h-20 rounded-full border border-white/40 bg-black/50 backdrop-blur-[2px] flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500 transition-all duration-500 shadow-lg shadow-cyan-500/10">
                       <Play className="w-8 h-8 fill-white text-white translate-x-0.5" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest italic text-white/70 flex items-center gap-4">
                    <Camera className="w-6 h-6 text-cyan-500" aria-hidden="true" /> Event Gallery
                  </h3>
                </div>

                <div onClick={() => setLightboxIndex(carouselIndex)} className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group/carousel bg-neutral-950 cursor-pointer">
                  <img 
                    src={GALLERY_ITEMS[carouselIndex]?.url} 
                    alt={GALLERY_ITEMS[carouselIndex]?.title} 
                    className="w-full h-full object-cover opacity-85 group-hover/carousel:opacity-100 group-hover/carousel:scale-105 transition-all duration-1000"
                    onError={handleImgError}
                    width="640"
                    height="360"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  
                  <button onClick={(e) => { e.stopPropagation(); handlePrevCarousel(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/5 hover:border-cyan-500 flex items-center justify-center text-white/80 hover:text-white transition-all z-10 opacity-0 group-hover/carousel:opacity-100" aria-label="Previous image">
                    <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                  </button>

                  <button onClick={(e) => { e.stopPropagation(); handleNextCarousel(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/5 hover:border-cyan-500 flex items-center justify-center text-white/80 hover:text-white transition-all z-10 opacity-0 group-hover/carousel:opacity-100" aria-label="Next image">
                    <ChevronRight className="w-6 h-6" aria-hidden="true" />
                  </button>

                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-black/30 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-3 text-cyan-400 font-bold uppercase tracking-widest text-[10px] mb-2">
                      <Eye className="w-4 h-4" aria-hidden="true" /> Click to Expand Fullscreen
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/20 w-fit">
                      {GALLERY_ITEMS[carouselIndex]?.category}
                    </span>
                    <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white text-left leading-none mt-2">
                      {GALLERY_ITEMS[carouselIndex]?.title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-8">
              <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.5em] block">STUDIO-GRADE COLLECTIVE OPERATIONS</span>
              <h4 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase italic leading-[0.9] text-white">We create experiences while playing from the heart</h4>
              
              <div className="space-y-6 text-white/75 text-base font-medium leading-relaxed uppercase italic">
                <p>BeatLife DJ is a full service entertainment company based in Orlando, Florida, specializing in weddings, corporate events, private parties, school dances, proms, resort entertainment, nightlife events, and large scale celebrations.</p>
                <p>Led by owner and founder Dustin Anderson, BeatLife DJ has built a reputation for professional DJ mixing, polished MC hosting, crowd interaction, and creating unforgettable experiences that keep guests engaged from beginning to end. With over 15 years of experience and performances connected with Marriott, Wyndham Resorts, Orlando Magic events, schools, wedding venues, and premier event spaces throughout Central Florida, we know how to create the perfect atmosphere for every audience and occasion.</p>
                <p>From elegant weddings and polished corporate functions to interactive resort entertainment and packed dance floors, we focus on smooth event flow, attention to detail, and creating moments people remember long after the event is over.</p>
              </div>

              <div className="pt-8 border-t border-white/15">
                <p className="text-sm md:text-base font-black text-cyan-400 uppercase tracking-widest italic">
                  At BeatLife DJ, we do more than play music. We create experiences while playing from the heart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isBeforeBookOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl animate-fade-in" onClick={() => setIsBeforeBookOpen(false)}></div>
          
          <div className="relative w-full max-w-7xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 max-h-[95vh] overflow-y-auto">
            <button onClick={() => setIsBeforeBookOpen(false)} className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all" aria-label="Close details modal">
                <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center space-y-8 order-2 lg:order-1 bg-[#0a0a0a] text-center">
              <div className="space-y-6 flex flex-col items-center">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none text-white w-full text-center">Before You Book</h2>
                
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-2xl shrink-0 mt-2 transition-all duration-500 hover:scale-110 hover:border-cyan-500/80 hover:rotate-6 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] group/modalset">
                  <img src={ASSETS.ICONS.SINGLE} className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(34,211,238,0.3)]" alt="Before You Book headphone emblem icon" width="112" height="112" loading="lazy" />
                </div>
                
                <div className="text-base md:text-lg text-white/70 font-medium leading-relaxed whitespace-pre-line max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar text-left w-full mt-4 space-y-6">
                  <div className="py-6 border-t border-white/10 w-full text-left my-4">
                    <p className="text-xs font-black tracking-[0.3em] text-cyan-500 uppercase mb-4 italic">Services include:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Professional DJs and MCs', 'Sound and Lighting Production', 'Uplighting and Special Effects', 'Photo Booths', 'Interactive Games and Group Dancing', 'Customized Entertainment Experiences'].map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-xs md:text-sm font-bold text-white/80 uppercase tracking-wide leading-tight">
                          <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" aria-hidden="true" /><span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 order-1 lg:order-2 bg-neutral-900 border-b lg:border-b-0 lg:border-l border-white/5">
              <div className="w-full h-full aspect-video lg:aspect-auto flex items-center bg-black">
                <iframe className="w-full h-full min-h-[400px]" src={`https://www.youtube.com/embed/${ASSETS.BEFORE_BOOK_YT}?autoplay=1&controls=1&modestbranding=1&rel=0`} frameBorder="0" allow="autoplay; encrypted-media; fullscreen" allowFullScreen title="Before You Book performance reel" />
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl animate-fade-in" onClick={() => setLightboxIndex(null)}></div>
          
          <button onClick={() => setLightboxIndex(null)} className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all" aria-label="Close lightbox">
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          <button onClick={handlePrevSlide} className="absolute left-6 md:left-12 z-50 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all" aria-label="Previous slide">
            <ChevronLeft className="w-8 h-8" aria-hidden="true" />
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center z-10 animate-in zoom-in-95 duration-500">
            <img src={GALLERY_ITEMS[lightboxIndex].url} alt={`${GALLERY_ITEMS[lightboxIndex].title} - expanded view`} className="w-full max-h-[70vh] aspect-video rounded-3xl object-cover border border-white/10 shadow-2xl" onError={handleImgError} width="1000" height="600" loading="lazy" />
            <div className="mt-6 text-center space-y-2 max-w-2xl px-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">{GALLERY_ITEMS[lightboxIndex].category}</span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">{GALLERY_ITEMS[lightboxIndex].title}</h3>
              <p className="text-white/70 text-sm md:text-base uppercase italic">{GALLERY_ITEMS[lightboxIndex].desc}</p>
            </div>
          </div>

          <button onClick={handleNextSlide} className="absolute right-6 md:right-12 z-50 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all" aria-label="Next slide">
            <ChevronRight className="w-8 h-8" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
};
export default CompanySection;