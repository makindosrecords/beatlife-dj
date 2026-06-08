import React from 'react';
import { Mail, Phone, X, Copy } from 'lucide-react';
import { ASSETS } from '../../data/constants';

const ContactModal = ({ onClose }) => {
  const copyEmail = () => {
    const el = document.createElement('textarea');
    el.value = 'beatlifedj@gmail.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleFormSubmit = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18196802294/r8hgCLXQ6LccEPbV9ORD'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in slide-in-from-bottom-8 duration-500 max-h-[95vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all" aria-label="Close booking modal">
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="lg:w-2/5 p-8 md:p-12 lg:p-16 bg-white text-black flex flex-col justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 p-8 opacity-[0.05] rotate-12"><img src={ASSETS.HERO_LOGO} className="w-80 grayscale" alt="Watermark branded symbol" width="320" height="150" /></div>
          <div className="relative z-10">
             <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.8] mb-8 md:mb-12">Book the <br/>Beat</h2>
             <div className="space-y-6 md:space-y-8">
                <a href="tel:3214003507" className="flex gap-6 items-center group cursor-pointer"><div className="w-14 h-14 rounded-[1.2rem] bg-black text-cyan-500 flex items-center justify-center shadow-xl"><Phone className="w-6 h-6" /></div><div><p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1 italic">The Hotline</p><p className="text-xl md:text-2xl font-black italic tracking-tighter leading-none">(321) 400-3507</p></div></a>
                <div className="flex gap-6 items-center group cursor-pointer" onClick={copyEmail}><div className="w-14 h-14 rounded-[1.2rem] bg-black text-cyan-500 flex items-center justify-center shadow-xl"><Mail className="w-6 h-6" /></div><div><p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1 italic">Digital Inquiries</p><p className="text-base md:text-lg font-black italic tracking-tighter leading-none flex items-center gap-2">beatlifedj@gmail.com <Copy className="w-3 h-3 opacity-30" /></p></div></div>
             </div>
          </div>
        </div>

        <div className="lg:w-3/5 p-8 md:p-12 lg:p-16 space-y-8 md:space-y-12">
           <form action="https://api.web3forms.com/submit" method="POST" className="space-y-8 md:space-y-10" onSubmit={handleFormSubmit}>
              <input type="hidden" name="access_key" value="c82ba055-610f-4ae9-9a05-b0fe3aafeafe" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2"><label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Host Identity</label><input type="text" name="name" required className="w-full bg-transparent outline-none font-black text-xl md:text-2xl uppercase tracking-tighter placeholder:text-white/5" placeholder="FULL NAME" /></div>
                <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2"><label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Reply Channel</label><input type="email" name="email" required className="w-full bg-transparent outline-none font-black text-xl md:text-2xl uppercase tracking-tighter placeholder:text-white/5" placeholder="EMAIL ADDRESS" /></div>
                <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2"><label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Direct Line</label><input type="tel" name="phone" className="w-full bg-transparent outline-none font-black text-xl md:text-2xl uppercase tracking-tighter placeholder:text-white/5" placeholder="PHONE NUMBER" /></div>
                <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2"><label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Configuration</label><select name="event_type" className="w-full bg-transparent outline-none font-black text-lg md:text-xl uppercase tracking-tighter appearance-none cursor-pointer"><option value="Weddings" className="bg-black text-white">WEDDINGS</option><option value="Resorts" className="bg-black text-white">RESORTS</option><option value="School Events" className="bg-black text-white">SCHOOL EVENTS</option><option value="Youth Events" className="bg-black text-white">YOUTH EVENTS</option><option value="Corporate" className="bg-black text-white">CORPORATE</option><option value="Karaoke" className="bg-black text-white">KARAOKE</option><option value="Photo Booths" className="bg-black text-white">PHOTO BOOTHS</option></select></div>
              </div>
              <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Additional Comments</label>
                 <textarea name="comments" rows="3" className="w-full bg-transparent outline-none font-black text-lg md:text-xl uppercase tracking-tighter placeholder:text-white/5 resize-none custom-scrollbar" placeholder="ANY SPECIFIC DETAILS OR REQUESTS?"></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-500 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">Contact Beatlife</button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;