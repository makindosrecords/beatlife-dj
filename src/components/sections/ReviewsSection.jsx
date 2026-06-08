import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/constants';
import { WeddingWireIcon, TheKnotIcon } from '../ui/Icons';

const ReviewsSection = () => {
  const reviewsScrollRef = useRef(null);

  const handleReviewsScroll = (direction) => {
    if (reviewsScrollRef.current) {
      const scrollAmount = 400;
      reviewsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="scroll-mt-24 py-32 bg-[#0a0a0a] px-6 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto space-y-16">
        
        {/* Section Headings with aligned navigation controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 text-left">
             <div className="inline-flex items-center gap-3 text-cyan-500">
               <Star className="w-5 h-5 fill-cyan-500 text-cyan-500" aria-hidden="true" />
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">Client Testimonials</span>
             </div>
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Praise & <span className="text-cyan-500">Reviews</span></h2>
             <p className="text-lg md:text-xl text-white/70 max-w-2xl uppercase italic">Proven dancefloor outcomes and absolute structural satisfaction.</p>
          </div>

          {/* Premium scroll utility buttons */}
          <div className="flex gap-4 self-start md:self-auto">
            <button onClick={() => handleReviewsScroll('left')} className="w-16 h-16 rounded-full border border-white/10 hover:border-cyan-500 bg-neutral-950 flex items-center justify-center text-white/80 hover:text-white transition-all transform hover:scale-105" aria-label="Scroll reviews left">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={() => handleReviewsScroll('right')} className="w-16 h-16 rounded-full border border-white/10 hover:border-cyan-500 bg-neutral-950 flex items-center justify-center text-white/80 hover:text-white transition-all transform hover:scale-105" aria-label="Scroll reviews right">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Scrolling snap row track */}
        <div ref={reviewsScrollRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 scrollbar-none scrollbar-hide select-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {testimonials.map((test, index) => (
            <div key={index} className="group flex-shrink-0 w-[90%] sm:w-[500px] snap-start relative p-12 rounded-[3rem] border border-white/5 bg-neutral-950/80 hover:border-cyan-500/30 transition-all duration-700 flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(34,211,238,0.05)]">
              <div className="space-y-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-2xl shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-500/80 group-hover:rotate-6 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]">
                  <img src={test.headset} alt="Heart package headphone emblem" className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(34,211,238,0.3)]" width="96" height="96" />
                </div>
                
                <div className="flex gap-1.5 text-cyan-500 justify-center">
                  {Array.from({ length: test.stars }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-cyan-500" aria-hidden="true" />
                  ))}
                </div>
                
                <p className="text-white/80 text-base leading-relaxed font-semibold uppercase italic leading-normal text-center pt-2">"{test.quote}"</p>
              </div>
              
              <div className="pt-10 border-t border-white/5 mt-10 text-center">
                <h3 className="text-lg font-black uppercase tracking-tighter text-white leading-none mb-2">{test.author}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">{test.meta}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Centered Award/Review badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 pt-12 border-t border-white/5">
          <a href="https://www.weddingwire.com/biz/the-game-plan-orlando/dceca396dc820257.html" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 bg-gradient-to-br from-neutral-900 to-black border border-cyan-500/40 hover:border-cyan-400 px-8 py-5 rounded-3xl transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transform hover:-translate-y-1.5 w-72 justify-start shrink-0" aria-label="Read BeatLife DJ reviews on WeddingWire">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300 shadow-inner shrink-0">
              <WeddingWireIcon className="w-8 h-8" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black tracking-[0.2em] text-white/50 uppercase leading-none">Reviewed On</p>
              <p className="text-lg font-bold text-white uppercase tracking-wider mt-1 group-hover:text-cyan-400 transition-colors">WeddingWire</p>
            </div>
          </a>
          
          <a href="https://www.theknot.com/marketplace/beat-life-dj-orlando-fl-2100018#unified-lightbox-modal" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 bg-gradient-to-br from-neutral-900 to-black border border-cyan-500/40 hover:border-cyan-400 px-8 py-5 rounded-3xl transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transform hover:-translate-y-1.5 w-72 justify-start shrink-0" aria-label="Read BeatLife DJ reviews on The Knot">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300 shadow-inner shrink-0">
              <TheKnotIcon className="w-8 h-8" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black tracking-[0.2em] text-white/50 uppercase leading-none">Featured On</p>
              <p className="text-lg font-bold text-white uppercase tracking-wider mt-1 group-hover:text-cyan-400 transition-colors">The Knot</p>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;