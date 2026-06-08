import React, { useState } from 'react';
import { Users, Heart, ArrowRight, X } from 'lucide-react';
import { ASSETS, team } from '../../data/constants';
import { handleImgError } from '../../utils/helpers';

const TeamSection = ({ onOpenContact }) => {
  const [activeTeamMember, setActiveTeamMember] = useState(null);

  return (
    <>
      <section id="about" className="scroll-mt-24 py-32 px-6 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-5 relative group sticky top-28">
               <div className="absolute inset-0 -rotate-2 grayscale opacity-20 transition-all group-hover:rotate-0">
                  <img src={ASSETS.DUSTIN_STORY} className="w-full h-full object-cover rounded-[2.5rem]" alt="Heritage background visual" onError={handleImgError} width="800" height="1000" loading="lazy" />
               </div>
               <img src={ASSETS.DUSTIN_PROFILE} className="relative z-10 w-[95%] mx-auto rounded-[3rem] shadow-2xl contrast-110 border border-white/5" alt="Dustin Anderson founder portrait" onError={handleImgError} width="800" height="1000" loading="lazy" />
               <div className="absolute -bottom-8 -right-8 bg-white p-10 rounded-[2.5rem] shadow-2xl text-black z-20 rotate-3">
                  <p className="text-[10px] font-black uppercase tracking-draw opacity-70 italic leading-none">The Founder</p>
                  <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-[0.8] mt-2">Dustin <br/> Anderson</h3>
               </div>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.5em] block">Founder Spotlight</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight italic underline decoration-white decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">How It All <br/>Started</h2>
              </div>
              
              <div className="space-y-6 text-white/75 text-base font-medium leading-relaxed uppercase italic">
                <p>Born and raised in Orlando, Florida, Dustin Anderson is the founder and creative force behind BeatLife DJ. With over 15 years of experience, Dustin has entertained crowds across weddings, resorts, nightlife venues, sporting events, school dances, and major attractions throughout Central Florida.</p>
                <p>With a microphone in his hand since the age of four, entertainment has always been second nature. Over the years, Dustin has performed with and for major brands including Disney, Universal Studios, Orlando City Soccer, and the Orlando Magic, while also performing Disney weddings for more than four years.</p>
                <p>His experience ranges from luxury weddings and interactive resort entertainment to downtown Orlando nightlife, corporate events, youth events, and large scale celebrations. Known for professional DJ mixing, crowd interaction, and polished MC skills, Dustin focuses on creating unforgettable experiences through music, energy, and connection.</p>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] relative overflow-hidden group mt-6">
                <div className="relative z-10 flex gap-6">
                  <Heart className="w-8 h-8 text-cyan-500 flex-shrink-0 fill-cyan-500" aria-hidden="true" />
                  <div>
                    <h3 className="text-white font-black italic tracking-tighter text-xl uppercase leading-none mb-3">Play From The Heart</h3>
                    <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest leading-relaxed text-white/80">
                      At the heart of Dustin Anderson's craft is a simple philosophy: Play From The Heart. Creating authentic moments, deep energetic connection, and memories that linger long after the music fades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 space-y-16">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 text-cyan-500">
                <Users className="w-5 h-5" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">Partners & Members</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">Meet The <span className="text-cyan-500">Collective</span></h2>
              <p className="text-base md:text-lg text-white/70 uppercase italic max-w-2xl mx-auto">The elite forces driving seamless planning, absolute trust, and high-energy show execution.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {team.map((member, idx) => (
                <div key={idx} className="group relative flex flex-col justify-start rounded-[2.5rem] border border-white/5 bg-neutral-950/80 hover:border-cyan-500/30 transition-all duration-700 p-8 space-y-6 cursor-pointer" onClick={() => setActiveTeamMember(member)}>
                  <div className="aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 relative group-hover:border-cyan-500/30 transition-all duration-500">
                  <img src={member.img} alt={`${member.name} - ${member.role} headshot`} onError={handleImgError} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" width="350" height="350" loading="lazy" />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500/80 block italic">{member.role}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">{member.name}</h3>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-cyan-400 group-hover:text-cyan-300 transition-all duration-300">
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Read Biography</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeTeamMember && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-12 animate-fade-in">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setActiveTeamMember(null)}></div>
          
          <div className="relative w-full max-w-7xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 max-h-[95vh] overflow-y-auto">
            <button onClick={() => setActiveTeamMember(null)} className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all" aria-label="Close biography modal">
                <X className="w-6 h-6" aria-hidden="true" />
            </button>
            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center space-y-8 order-2 lg:order-1 bg-[#0a0a0a] text-center">
              <div className="space-y-6 flex flex-col items-center">
                <div className="text-left w-full space-y-2">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-tight text-white">{activeTeamMember.name}</h2>
                  <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-cyan-500 block italic">{activeTeamMember.role}</span>
                </div>
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-2xl shrink-0 mt-2 transition-all duration-500 hover:scale-110 hover:border-cyan-500/80 hover:rotate-6 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] group/modalset">
                  <img src={ASSETS.ICONS.SINGLE} className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(34,211,238,0.3)] transition-transform duration-500 group-hover/modalset:scale-105" alt="Single Headphone Icon" width="112" height="112" loading="lazy" />
                </div>
                <div className="text-base md:text-lg text-white/70 font-medium leading-relaxed whitespace-pre-line max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar text-left w-full mt-4">{activeTeamMember.bio}</div>
              </div>
              <button onClick={() => { onOpenContact(); setActiveTeamMember(null); }} className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest bg-white text-black px-8 py-4 rounded-full hover:bg-cyan-500 hover:text-white transition-all w-fit shadow-xl mx-auto">Inquire with {activeTeamMember.name.split(' ')[0]}</button>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 bg-neutral-900 border-b lg:border-b-0 lg:border-l border-white/5">
              <div className="w-full h-full aspect-square lg:aspect-auto flex items-center justify-center bg-black p-6">
                <div className="relative w-full max-w-lg aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"><img src={activeTeamMember.img} alt={`${activeTeamMember.name} portrait expanded view`} className="w-full h-full object-cover opacity-90 transition-transform duration-1000" onError={handleImgError} width="500" height="500" loading="lazy" /></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TeamSection;