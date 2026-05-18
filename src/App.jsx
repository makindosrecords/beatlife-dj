import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, VolumeX, Heart, Zap, Users, 
  Check, Mic2, Star, Trophy, Mail, Phone, 
  MapPin, Sparkles, Menu, X, ArrowRight,
  Play, ShieldCheck, Film, Copy, Camera, Music
} from 'lucide-react';

/**
 * BEATLIFE: CINEMATIC EDITORIAL DEPLOYMENT (V8.7)
 * --------------------------------------
 * UI Focus: Balanced Cinematic Service Gallery with 16:9 framing,
 * full-color thumbnails with zoom hover, integrated Modal experience, 
 * and distinct Heart Tiers.
 */

// Custom Inline SVG Icons for stability
const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeService, setActiveService] = useState(null); 
  const [showcaseStarted, setShowcaseStarted] = useState(false);
  const heroVideoRef = useRef(null);
  const showcaseVideoRef = useRef(null);

  // LITERAL ASSET MAPPING
  const ASSETS = {
    NAV_HEART: '/images/beatlife_heart.svg',
    NAV_TEXT: '/images/Beatlife_text_only.svg',
    HERO_LOGO: '/images/beatlife_logo.svg', 
    HERO_VIDEO: '/images/hero-dance-loop.mp4', 
    SHOWCASE_VIDEO: '/images/Welcome-to-Beatlife.mp4',
    // YouTube IDs
    WEDDING_YT: '_qtb426zjQE',
    RESORT_YT: 'IYIpex6qt3w',
    SCHOOL_YT: '5UHLuZV2HeA',
    CORPORATE_YT: 'KshcvRshCjA',
    DUSTIN_STORY: '/images/My-Story.jpg_1675286438-scaled.jpeg',
    DUSTIN_PROFILE: '/images/Facetune_17-08-2022-13-34-48.jpeg',
    ICONS: {
      SINGLE: '/images/headset1.png',
      DOUBLE: '/images/headset2.png',
      TRIPLE: '/images/headset3.png'
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { 
      title: "Weddings", 
      youtubeId: ASSETS.WEDDING_YT, 
      desc: "This is your special day! We are all about communication, reliability, and attention to detail. When it comes to your wedding, we are committed to making it memorable. We will consult with you to ensure we know exactly what you want so that your vision will be realized. We’ve done thousands of weddings, many on a grand scale, and others that are more intimate. We’ll make sure your favorites are played and the timeline flows smoothly. There is no excuse for a missed moment or an empty dance floor!",
      thumbnail: `https://img.youtube.com/vi/${ASSETS.WEDDING_YT}/hqdefault.jpg`
    },
    { 
      title: "Resorts", 
      youtubeId: ASSETS.RESORT_YT, 
      desc: "Our professional DJ’s will host the ultimate interactive show. We deliver an action packed family friendly event, with a wide variety of props and over 25 party games designed for adults and children. Our music selections are tasteful and responsive to the preferences of the crowd. Your resort guests have worked hard all year for this vacation, and they deserve the time of their lives. Our priority is 100% guest satisfaction!",
      thumbnail: `https://img.youtube.com/vi/${ASSETS.RESORT_YT}/hqdefault.jpg`
    },
    { 
      title: "School Events", 
      youtubeId: ASSETS.SCHOOL_YT, 
      desc: "We do Sweet Sixteen Parties, Proms/Homecoming, Bar Mitzvahs, Graduations, and more. We’re in touch with the pulse of “what’s now,” to stay on level with a youthful audience. Knowing current music and blending beats professionally is everything to a young crowd. We promise to come in and make an impression with our emcee/DJ skills. We'll play the songs they want to hear to keep the kids on their feet, filling the dance floor!!!",
      thumbnail: `https://img.youtube.com/vi/${ASSETS.SCHOOL_YT}/hqdefault.jpg`
    },
    { 
      title: "Corporate", 
      youtubeId: ASSETS.CORPORATE_YT, 
      desc: "We have an impressive resume of corporate clients. We’ll make sure the event agenda moves forward and that your guests have a good time. We can emcee your event or hand the microphone over to you. We’re all about communication, reliability, attention to detail, and performance. For corporate events and private parties, we set some stellar memories in motion.",
      thumbnail: `https://img.youtube.com/vi/${ASSETS.CORPORATE_YT}/hqdefault.jpg`
    },
    { 
      title: "Karaoke", 
      icon: <Mic2 className="w-10 h-10 text-cyan-500" />, 
      desc: "We have state-of-the-art karaoke equipment with thousands of musical selections. Our DJs are professional singers who will be there to encourage your guests to sing their hearts out. Get up on stage and rock the mic. We’ll make sure everyone has a good time."
    },
    { 
      title: "Photo Booths", 
      icon: <Camera className="w-10 h-10 text-cyan-500" />, 
      desc: "Premium lighting and captures to preserve every moment of the night. Our interactive booths feature high-resolution imaging and instant sharing to ensure your guests leave with a permanent memory of the celebration."
    }
  ];

  const packages = [
    { name: "Single Heart", icon: ASSETS.ICONS.SINGLE, tier: "ESSENTIAL", features: ["1 Hour Consultation", "Reception (4-5 hours)", "Complete DJ/Emcee Set Up", "2 Speakers", "2 Dance Floor Lights"] },
    { name: "Double Heart", icon: ASSETS.ICONS.DOUBLE, tier: "SIGNATURE", featured: true, features: ["1 Hour Consultation", "Ceremony & Reception", "Reception (5-6 hours)", "Complete DJ/Emcee Set Up", "2 Speakers", "Enhanced Dance Floor Lights"] },
    { name: "Triple Heart", icon: ASSETS.ICONS.TRIPLE, tier: "POWERHOUSE", features: ["1 Hour Consultation", "Ceremony & Reception", "Reception (5-6 hours)", "DJ/Emcee Set Up + Subwoofer", "8-10 Dance Floor Lights", "6 Professional Up Lights"] }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handlePlayShowcase = () => {
    setShowcaseStarted(true);
    if (showcaseVideoRef.current) {
      showcaseVideoRef.current.play();
    }
  };

  const copyEmail = () => {
    const el = document.createElement('textarea');
    el.value = 'dustin@beatlifedj.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      
      {/* --- REFINED BOLD NAVIGATION --- */}
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-black/95 backdrop-blur-xl py-2 border-b border-white/5 shadow-2xl' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-8 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="flex items-center gap-2 md:gap-3">
              <img src={ASSETS.NAV_HEART} alt="Beatlife Heart" className={`transition-all duration-700 h-auto ${scrolled ? 'w-12 md:w-16' : 'w-16 md:w-24'}`} />
              <img src={ASSETS.NAV_TEXT} alt="Beatlife Text" className={`transition-all duration-700 h-auto ${scrolled ? 'w-24 md:w-32' : 'w-32 md:w-44'}`} />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {['Services', 'Tiers', 'About'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs font-black tracking-[0.4em] uppercase transition-all text-white/60 hover:text-white relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-black px-10 py-3 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-cyan-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl"
            >
              Book Dustin
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* --- 100VH CINEMATIC HERO --- */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <video 
          ref={heroVideoRef}
          autoPlay loop muted playsInline
          src={ASSETS.HERO_VIDEO}
          className="absolute inset-0 w-full h-full object-cover scale-[1.01]"
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black"></div>
        
        <div className="relative z-20 text-center px-6 max-w-[1600px] flex flex-col items-center justify-center h-full pt-16">
          <img 
            src={ASSETS.HERO_LOGO} 
            alt="Beatlife Logo" 
            className="w-[16rem] md:w-[28rem] h-auto mb-6 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-pulse" 
          />
          
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span className="text-[10px] font-black text-white/90 tracking-[0.3em] uppercase leading-none">Experience 3,000+ Unforgettable Events</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-[1000] leading-[0.9] tracking-tighter uppercase italic mb-6 drop-shadow-2xl">
              PLAY FROM <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-cyan-700">THE HEART.</span>
            </h1>

            <p className="text-lg md:text-2xl font-bold uppercase italic text-white/60 mb-8 max-w-4xl mx-auto leading-tight">
              The Powerhouse Emcee for Orlando's Exclusive Events. <br className="hidden md:block" />
              <span className="text-white">Guidance for your vision. Mastery for your dancefloor.</span>
            </p>

            <div className="flex flex-wrap gap-4 md:gap-8 justify-center pb-6">
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="bg-white text-black px-12 md:px-16 py-5 md:py-6 rounded-full font-black text-[11px] md:text-xs uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Consultation
              </button>
              <button 
                onClick={() => scrollToSection('showcase')}
                className="group flex items-center gap-4 px-6 py-4 text-white font-black uppercase text-[10px] md:text-xs tracking-widest transition-all hover:text-cyan-400"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-500 transition-all">
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                </div>
                Watch Intro
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <p className="text-[10px] font-black tracking-[0.5em] uppercase">Scroll</p>
          <div className="w-px h-12 bg-white/50 animate-pulse"></div>
        </div>
      </header>

      {/* --- THEATER MODE INTRODUCTION --- */}
      <section id="showcase" className="py-32 bg-[#0a0a0a] px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 space-y-4">
             <div className="inline-flex items-center gap-3 text-cyan-500">
               <Film className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-[0.6em]">The Official introduction</span>
             </div>
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Welcome to <span className="text-cyan-500">Beatlife.</span></h2>
             <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-medium uppercase italic leading-relaxed">
               Experience a studio-grade interactive performance designed to move the heart.
             </p>
          </div>
          
          <div className="w-full relative max-w-5xl">
            <div className="aspect-video bg-neutral-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer" onClick={handlePlayShowcase}>
              {!showcaseStarted && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-cyan-500 group-hover:scale-110 transition-all duration-700">
                    <Play className="w-8 h-8 md:w-10 md:h-10 fill-white" />
                  </div>
                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.8em] text-white/50">Start Production</p>
                </div>
              )}
              <video 
                ref={showcaseVideoRef}
                controls={showcaseStarted}
                className="w-full h-full object-cover"
                src={ASSETS.SHOWCASE_VIDEO}
                preload="metadata"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- REFINED UNIFORM SERVICES SECTION --- */}
      <section id="services" className="py-32 bg-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
             <div className="inline-flex items-center gap-3 text-cyan-500">
               <Zap className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-[0.6em]">Our Capabilities</span>
             </div>
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Event <span className="text-cyan-500">Solutions.</span></h2>
             <p className="text-lg md:text-xl text-white/30 max-w-2xl mx-auto uppercase italic">Precision mixing meets world-class hosting across every environment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col space-y-6 cursor-pointer"
                onClick={() => setActiveService(service)}
              >
                {/* 16:9 Cinematic Container for Uniform Formatting */}
                <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl relative group-hover:border-cyan-500 transition-all duration-500">
                  {/* Background: YouTube Thumbnail or Placeholder - ALWAYS COLOR */}
                  {service.youtubeId ? (
                    <img 
                      src={service.thumbnail} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000"
                      alt={service.title}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-1000 flex items-center justify-center">
                      <div className="opacity-20 group-hover:opacity-40 transition-opacity">
                        {service.icon}
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-all duration-500">
                    <div className="w-16 h-16 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500 transition-all">
                       {service.youtubeId ? <Play className="w-6 h-6 fill-white text-white" /> : <ArrowRight className="w-6 h-6 text-white" />}
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic leading-none">{service.title}</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500 border-b border-cyan-500/20">
                      {service.youtubeId ? 'Watch Set' : 'View Details'}
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTEGRATED SERVICE MODAL --- */}
      {activeService && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fade-in" onClick={() => setActiveService(null)}></div>
          
          <div className="relative w-full max-w-7xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 max-h-[95vh] overflow-y-auto">
            <button 
                onClick={() => setActiveService(null)}
                className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Content Side */}
            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center space-y-10 order-2 lg:order-1 bg-[#0a0a0a]">
              <div className="space-y-6">
                <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.5em] flex items-center gap-4">
                   <div className="w-12 h-px bg-cyan-500"></div> Capability overview
                </span>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none text-white">{activeService.title}</h2>
                <p className="text-lg md:text-xl text-white/60 font-medium uppercase italic leading-relaxed">
                  {activeService.desc}
                </p>
              </div>
              <button 
                onClick={() => { setIsContactOpen(true); setActiveService(null); }}
                className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] bg-white text-black px-10 py-5 rounded-full hover:bg-cyan-500 transition-all w-fit"
              >
                Inquire for {activeService.title}
              </button>
            </div>

            {/* Visual Side */}
            <div className="lg:w-1/2 order-1 lg:order-2 bg-neutral-900 border-b lg:border-b-0 lg:border-l border-white/5">
              {activeService.youtubeId ? (
                <div className="w-full h-full aspect-video lg:aspect-auto flex items-center bg-black">
                  <iframe 
                    className="w-full h-full min-h-[400px]"
                    src={`https://www.youtube.com/embed/${activeService.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-20 text-center space-y-8 bg-black/40">
                   <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center text-cyan-500 bg-white/5">
                      {activeService.icon}
                   </div>
                   <img src={ASSETS.NAV_TEXT} className="w-64 opacity-20 grayscale" alt="Beatlife" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- DISTINCT HEART TIERS SECTION --- */}
      <section id="tiers" className="py-32 bg-[#0a0a0a] px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Heart <span className="text-cyan-500 underline decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">Tiers.</span></h2>
             <p className="text-xs font-black uppercase tracking-[0.6em] text-white/30">Technical Frameworks for Professional Performance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {packages.map((pkg, i) => (
              <div key={i} className={`group relative p-12 rounded-[3rem] border transition-all duration-700 flex flex-col items-center text-center backdrop-blur-3xl ${pkg.featured ? 'bg-white text-black border-white shadow-2xl scale-105 z-10' : 'bg-transparent border-white/5 opacity-50 hover:opacity-100 hover:border-white/20'}`}>
                
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-8 py-2 rounded-full text-[9px] font-black tracking-widest uppercase shadow-2xl">
                    Signature Choice
                  </div>
                )}

                <div className="mb-10 h-28 flex items-center">
                  <img src={pkg.icon} className={`w-32 h-32 object-contain transition-transform duration-700 group-hover:scale-110 ${pkg.featured ? 'invert brightness-0' : ''}`} alt={pkg.name} />
                </div>

                <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-3 ${pkg.featured ? 'text-black/40' : 'text-cyan-500'}`}>{pkg.tier}</p>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-8 leading-none">{pkg.name}</h3>
                
                <ul className="space-y-4 mb-12 text-left w-full flex-grow">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-4 text-[10px] font-bold uppercase tracking-widest opacity-70 leading-relaxed">
                      <Check className={`w-4 h-4 flex-shrink-0 ${pkg.featured ? 'text-black' : 'text-cyan-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setIsContactOpen(true)}
                  className={`w-full py-5 rounded-2xl font-[1000] text-[10px] uppercase tracking-[0.3em] transition-all ${pkg.featured ? 'bg-black text-white hover:bg-cyan-500' : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'}`}
                >
                  Verify Date
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
             <div className="absolute inset-0 -rotate-2 grayscale opacity-20 transition-all group-hover:rotate-0">
                <img src={ASSETS.DUSTIN_STORY} className="w-full h-full object-cover rounded-[2.5rem]" alt="Heritage" />
             </div>
             <img src={ASSETS.DUSTIN_PROFILE} className="relative z-10 w-[95%] mx-auto rounded-[3rem] shadow-2xl contrast-110 border border-white/5" alt="Dustin" />
             <div className="absolute -bottom-8 -right-8 bg-white p-10 rounded-[2.5rem] shadow-2xl text-black z-20 rotate-3">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-40 italic leading-none">The Founder</p>
                <p className="text-3xl font-[1000] tracking-tighter uppercase italic leading-[0.8]">Dustin <br/> Anderson</p>
             </div>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.5em] block">Played from the heart since 2011</span>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] italic underline decoration-white decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">Heritage <br/>Meets the <br/>Main Stage.</h2>
            </div>
            
            <div className="space-y-8 text-white/50 text-lg md:text-xl font-medium leading-relaxed italic uppercase">
              <p>Born in Orlando. Dustin’s interest in music began at <span className="text-white underline decoration-cyan-500 decoration-2">Church Street Station</span> performing alongside his father.</p>
              <p>A graduate of the Dr. Phillips High Theatre Magnet and touring musician. Dustin bridges technical production with pure crowd psychology.</p>
              
              <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
                <div className="relative z-10 flex gap-6">
                  <Zap className="w-10 h-10 text-cyan-500 flex-shrink-0" />
                  <div>
                    <p className="text-white font-black italic tracking-tighter text-2xl uppercase leading-none mb-3">DNA Standards.</p>
                    <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest leading-relaxed">
                      Partner at <span className="text-cyan-400 font-black">DNA Music Group</span>. Every Beatlife event reflects record-label technical standards. Studio grade sound. No shortcuts. Just heart.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT MODAL --- */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsContactOpen(false)}></div>
          
          <div className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in slide-in-from-bottom-8 duration-500 max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="lg:w-2/5 p-12 md:p-16 bg-white text-black flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] rotate-12">
                 <img src={ASSETS.HERO_LOGO} className="w-80 grayscale" alt="Watermark" />
              </div>
              <div className="relative z-10">
                 <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.8] mb-12">Book the <br/>Beat.</h2>
                 <div className="space-y-8">
                    <div className="flex gap-6 items-center group cursor-pointer">
                      <div className="w-14 h-14 rounded-[1.2rem] bg-black text-cyan-500 flex items-center justify-center shadow-xl"><Phone className="w-6 h-6" /></div>
                      <div><p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1 italic">The Hotline</p><p className="text-2xl font-black italic tracking-tighter leading-none">(321) 400-3507</p></div>
                    </div>
                    <div className="flex gap-6 items-center group cursor-pointer" onClick={copyEmail}>
                      <div className="w-14 h-14 rounded-[1.2rem] bg-black text-cyan-500 flex items-center justify-center shadow-xl"><Mail className="w-6 h-6" /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1 italic">Digital Inquiries</p>
                        <p className="text-lg font-black italic tracking-tighter leading-none flex items-center gap-2">
                          dustin@beatlifedj.com <Copy className="w-3 h-3 opacity-30" />
                        </p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="lg:w-3/5 p-12 md:p-16 space-y-12">
               <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 italic block mb-3">Host Identity</label>
                      <input type="text" className="w-full bg-transparent outline-none font-black text-2xl uppercase tracking-tighter placeholder:text-white/5" placeholder="FULL NAME" />
                    </div>
                    <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 italic block mb-3">Reply Channel</label>
                      <input type="email" className="w-full bg-transparent outline-none font-black text-2xl uppercase tracking-tighter placeholder:text-white/5" placeholder="EMAIL ADDRESS" />
                    </div>
                  </div>
                  <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/30 italic block mb-3">Configuration</label>
                     <select className="w-full bg-transparent outline-none font-black text-xl uppercase tracking-tighter appearance-none cursor-pointer">
                        <option className="bg-black text-white">WEDDING EXPERIENCE</option>
                        <option className="bg-black text-white">YOUTH / MITZVAH SHOW</option>
                        <option className="bg-black text-white">CORPORATE PRODUCTION</option>
                        <option className="bg-black text-white">SWEET 16 / QUINCEAÑERA</option>
                     </select>
                  </div>
                  <button className="w-full bg-cyan-500 text-white py-8 rounded-[1.5rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-white hover:text-black transition-all">
                    Transmit Session Request
                  </button>
               </form>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="py-24 px-6 border-t border-white/5">
         <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-5">
               <div className="flex items-center gap-5">
                  <img src={ASSETS.NAV_HEART} className="w-14 grayscale opacity-40" />
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic leading-none">Beatlife Entertainment</p>
               </div>
               <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest italic">DNA Music Group Partner • Studio Grade standards since 2011</p>
            </div>
            
            <div className="flex gap-10">
               <a href="#" className="w-12 h-12 flex items-center justify-center text-white/10 hover:text-cyan-500 transition-colors">
                  <FacebookIcon className="w-8 h-8" />
               </a>
               <a href="#" className="w-12 h-12 flex items-center justify-center text-white/10 hover:text-cyan-500 transition-colors">
                  <InstagramIcon className="w-8 h-8" />
               </a>
            </div>

            <div className="space-y-2 opacity-20">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">© 2026 The Vision Guided.</p>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] italic leading-none">Orlando / Nationwide</p>
            </div>
         </div>
      </footer>

      {/* --- MOBILE NAV --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 transition-transform hover:rotate-90"><X className="w-10 h-10" /></button>
          <div className="space-y-12">
            {['Services', 'Tiers', 'About'].map(tab => (
              <button 
                key={tab} 
                onClick={() => scrollToSection(tab.toLowerCase())}
                className="block text-5xl font-black uppercase tracking-tighter italic hover:text-cyan-500 transition-colors"
              >
                {tab}
              </button>
            ))}
            <button 
              onClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }}
              className="block text-5xl font-black uppercase tracking-tighter italic text-cyan-500"
            >
              Contact
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

    </div>
  );
};

export default App;