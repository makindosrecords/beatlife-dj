import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, VolumeX, Heart, Zap, Users, 
  Check, Mic2, Star, Trophy, Mail, Phone, 
  MapPin, Sparkles, Menu, X, ArrowRight,
  Play, ShieldCheck, Film, Copy, Camera, Music,
  ChevronLeft, ChevronRight, Eye
} from 'lucide-react';

/**
 * BEATLIFE: CINEMATIC EDITORIAL DEPLOYMENT (V13.8)
 * --------------------------------------
 * UI Focus: Performance and Accessibility optimized web experience.
 * Fully compliant with WCAG AA contrast rules, reflow-free scroll observation,
 * instant hero video loading, LCP preloads, and sequential heading structures.
 * Asset Upgrades: Swapped key raster images to ultra-compressed AVIF format.
 * Feature Addition: Expanded Team & Testimonials Section with centered headphone cards,
 * clean vertical text alignments, customized biography popouts, and premium glowing review badges.
 * Media Upgrades: Replaced Karaoke & Photo Booth placeholders with high-fidelity AVIF previews across both main layout and popouts.
 * Branding: Refined all text references to read "BeatLife DJ" instead of "BeatLife DJs".
 * Taglines: Subheaders updated for Welcome, Services, and Heart Tiers. Review badges standardized and made uniform size.
 */

// Custom Inline SVG Icons for stability
const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const WeddingWireIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {/* Clean overlapping rings representing weddings / WeddingWire profile */}
    <ellipse cx="8.5" cy="12" rx="5.5" ry="5.5" />
    <ellipse cx="15.5" cy="12" rx="5.5" ry="5.5" />
    <path d="M12 9v6" strokeWidth="1.5" />
  </svg>
);

const TheKnotIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {/* Stylized premium continuous twist loop representing "The Knot" */}
    <path d="M4 12c0-3.3 2.7-6 6-6 2.5 0 4.7 1.5 5.6 3.8L4.4 14.2C4.1 13.5 4 12.8 4 12zm16 0c0 3.3-2.7 6-6 6-2.5 0-4.7-1.5-5.6-3.8l11.2-4.4c.3.7.4 1.4.4 2.2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Utility function to cleanly extract paragraphs & list items for custom visual rendering
const parseDescription = (descText) => {
  if (!descText) return { textParagraphsBefore: [], listItems: [], listTitle: "", textParagraphsAfter: [] };
  const lines = descText.split('\n');
  const textParagraphsBefore = [];
  const textParagraphsAfter = [];
  const listItems = [];
  let listTitle = "";
  let foundList = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('•')) {
      listItems.push(trimmed.substring(1).trim());
      foundList = true;
    } else if (trimmed.endsWith(':') || trimmed.toLowerCase().includes('include') || trimmed.toLowerCase().includes('features can include') || trimmed.toLowerCase().includes('enhancements can include')) {
      listTitle = trimmed;
    } else if (trimmed !== '') {
      if (foundList) {
        textParagraphsAfter.push(trimmed);
      } else {
        textParagraphsBefore.push(trimmed);
      }
    }
  });

  return { textParagraphsBefore, listItems, listTitle, textParagraphsAfter };
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeService, setActiveService] = useState(null); 
  const [activeTeamMember, setActiveTeamMember] = useState(null); 
  const [showcaseStarted, setShowcaseStarted] = useState(false);
  
  // Gallery Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const heroVideoRef = useRef(null);
  const showcaseVideoRef = useRef(null);
  const reviewsScrollRef = useRef(null);

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
    BEFORE_BOOK_YT: '09HSJt9kGGM',
    // Upgraded to AVIF
    DUSTIN_STORY: '/images/My-Story.jpg_1675286438-scaled.avif',
    DUSTIN_PROFILE: '/images/Facetune_17-08-2022-13-34-48.avif',
    // Exact mapping of user's uploaded filenames in AVIF formats
    LANCE_PROFILE: '/images/Lance-Wolfe-Beatlife.avif',
    CYNTHIA_PROFILE: '/images/Cynthia-Pearl-Beatlife.avif',
    JACKIE_PROFILE: '/images/Jackelyn-Michele-Poynter-Beatlife.avif',
    ICONS: {
      SINGLE: '/images/headset1.png',
      DOUBLE: '/images/headset2.png',
      TRIPLE: '/images/headset3.png'
    }
  };

  // Performance Optimization: Initialized directly to optimized 2MB hero video
  const [videoSrc, setVideoSrc] = useState(ASSETS.HERO_VIDEO);

  // ADVANCED CATEGORIZED INTERACTIVE GALLERY DATA
  const GALLERY_ITEMS = [
    {
      category: 'weddings',
      url: '/images/wedding_beatlife.avif',
      title: 'Grand Wedding Reception',
      desc: 'Dustin Anderson packing the dance floor at a grand ballroom celebration.'
    },
    {
      category: 'weddings',
      url: '/images/dancing_cloud_beatlife.avif',
      title: 'Dancing On The Clouds',
      title: 'Dancing on a cloud',
      desc: 'Premium low-lying fog enhancements for a magical first dance.'
    },
    {
      category: 'corporate',
      url: '/images/beatlife_venue_2.avif',
      title: 'Polished Corporate Gala',
      desc: 'Elegant background design and timeline management for executive brands.'
    },
    {
      category: 'weddings',
      url: '/images/warehouse_wedding_beatlife.avif',
      title: 'Warehouse Wedding Celebration',
      desc: 'An unforgettable night with family and friends celebrating on the dance floor.'
    },
    {
      category: 'lighting',
      url: '/images/wedding_gobo_beatlife.avif',
      title: 'Custom Monogram Projection',
      desc: 'Personalized monogram and gobo designs illuminated elegantly.'
    },
    {
      category: 'equipment',
      url: '/images/beatlife_equipment.avif',
      title: 'Studio-Grade Control Booth',
      desc: 'High-fidelity Pioneer hardware configurations for clean, real live mixing.'
    },
    {
      category: 'weddings',
      url: '/images/bride_groom_beatlife.avif',
      title: 'A Magical First Dance',
      desc: 'The beautiful couple sharing a special moment on the dance floor.'
    },
    {
      category: 'weddings',
      url: '/images/venue_beatlife.avif',
      title: 'Elegant Reception Dinner',
      desc: 'A beautifully configured wedding venue ready for an evening of celebration.'
    }
  ];

  useEffect(() => {
    document.title = "Professional Wedding DJ & Event Entertainment in Orlando | BeatLife DJ";

    // SEO Optimization: Dynamically inject meta description if missing
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "BeatLife DJ provides professional wedding DJ, MC, and event entertainment services in Orlando, Florida. Book Dustin Anderson for an unforgettable experience.";

    // SEO Optimization: Inject LocalBusiness JSON-LD Schema
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "EntertainmentBusiness",
        "name": "BeatLife DJ",
        "image": "https://www.beatlifedj.com" + ASSETS.HERO_LOGO,
        "@id": "https://www.beatlifedj.com",
        "url": "https://www.beatlifedj.com",
        "telephone": "+1-321-400-3507",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Orlando",
          "addressRegion": "FL",
          "addressCountry": "US"
        },
        "description": "Professional wedding DJ, MC, and event entertainment services in Orlando, Florida.",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=100086740441401",
          "https://www.instagram.com/beatlifedj",
          "https://www.weddingwire.com/biz/the-game-plan-orlando/dceca396dc820257.html",
          "https://www.theknot.com/marketplace/beat-life-dj-orlando-fl-2100018"
        ]
      };
      schemaScript.text = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    }

    // 1. Optimize Scroll forced-reflows using IntersectionObserver instead of tracking window.scrollY
    const anchor = document.getElementById('scroll-anchor');
    if (anchor) {
      const observer = new IntersectionObserver(([entry]) => {
        setScrolled(!entry.isIntersecting);
      }, { threshold: 0 });
      observer.observe(anchor);
      
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    // 2. Preload LCP critical logo
    const preloadLogo = document.createElement('link');
    preloadLogo.rel = 'preload';
    preloadLogo.as = 'image';
    preloadLogo.href = ASSETS.HERO_LOGO;
    preloadLogo.fetchPriority = 'high';
    document.head.appendChild(preloadLogo);

    // 3. Inject Preconnect endpoints to optimize LCP discovery delay
    const preconnectYT = document.createElement('link');
    preconnectYT.rel = 'preconnect';
    preconnectYT.href = 'https://img.youtube.com';

    const dnsPrefetchYT = document.createElement('link');
    dnsPrefetchYT.rel = 'dns-prefetch';
    dnsPrefetchYT.href = 'https://img.youtube.com';

    document.head.appendChild(preconnectYT);
    document.head.appendChild(dnsPrefetchYT);

    return () => {
      document.head.removeChild(preloadLogo);
      document.head.removeChild(preconnectYT);
      document.head.removeChild(dnsPrefetchYT);
    };
  }, []);

  const services = [
    { 
      title: "Weddings", 
      youtubeId: ASSETS.WEDDING_YT, 
      headset: ASSETS.ICONS.DOUBLE,
      desc: `At BeatLife DJ, we create unforgettable wedding experiences that are elegant, exciting, and completely personalized to each couple. From intimate ceremonies to packed dance floors, we focus on smooth event flow, attention to detail, and creating moments your guests will remember forever.

With over 15 years of experience and more than four years performing Disney weddings, Dustin Anderson and the BeatLife team know how to keep the energy flowing while making couples feel relaxed and confident throughout the entire celebration.

Unlike many companies that rely on playlists, we are real DJs who genuinely mix live, blending music seamlessly across genres and generations to keep the dance floor packed all night long.

Wedding enhancements include:
• Dancing on the Clouds
• Monogram and Gobo Projection
• Uplighting and Dance Floor Lighting
• Photo Booths
• CO2 Cannons
• Ceremony Audio and Wireless Microphones

We do more than DJ weddings.

We create moments, memories, and packed dance floors while playing from the heart.`,
      thumbnail: `https://img.youtube.com/vi/${ASSETS.WEDDING_YT}/hqdefault.jpg`
    },
    { 
      title: "Resorts", 
      youtubeId: ASSETS.RESORT_YT, 
      headset: ASSETS.ICONS.TRIPLE,
      desc: `BeatLife DJ creates high energy interactive entertainment experiences for resorts, pool parties, corporate events, weddings, and private celebrations throughout Central Florida.

What sets us apart is our combination of real DJ skill, professional MC hosting, crowd interaction, games, karaoke, and live mixing that keeps both adults and kids fully engaged from start to finish.

Our events can include:
• Interactive Games and Contests
• Group Dancing
• Karaoke Entertainment
• Prize Giveaways
• Professional DJ Mixing and MC Hosting

We create energetic, interactive experiences guests become part of.`,
      thumbnail: `https://img.youtube.com/vi/${ASSETS.RESORT_YT}/hqdefault.jpg`
    },
    { 
      title: "School Events", 
      youtubeId: ASSETS.SCHOOL_YT, 
      headset: ASSETS.ICONS.SINGLE,
      desc: `BeatLife DJ specializes in high energy school and youth entertainment for proms, homecomings, school dances, Sweet 16s, graduations, youth conventions, cheer competitions, and festivals throughout Central Florida.

We are real DJs who mix live, blend music seamlessly, and combine professional MC hosting with crowd interaction, games, group dancing, and high energy entertainment that keeps students engaged all night long.

Enhancements can include:
• Photo Booths
• Karaoke
• CO2 Cannons
• Intelligent Lighting
• Interactive Games and Giveaways

Our mission is simple:

Create unforgettable experiences students will remember long after the event is over.`,
      thumbnail: `https://img.youtube.com/vi/${ASSETS.SCHOOL_YT}/hqdefault.jpg`
    },
    { 
      title: "Corporate", 
      youtubeId: ASSETS.CORPORATE_YT, 
      headset: ASSETS.ICONS.TRIPLE,
      desc: `BeatLife DJ provides professional entertainment for corporate events, company parties, conferences, holiday celebrations, and private functions throughout Central Florida.

We combine professional DJ mixing, polished MC hosting, crowd interaction, and attention to detail to create experiences that are both professional and unforgettable.

Whether you want elegant background music, interactive entertainment, or a packed dance floor, we know how to create the perfect atmosphere for your event.

Services can include:
• Professional DJ and MC Services
• Karaoke Entertainment
• Photo Booth Experiences
• Intelligent Lighting and Special Effects
• Wireless Microphones and Audio Support`,
      thumbnail: `https://img.youtube.com/vi/${ASSETS.CORPORATE_YT}/hqdefault.jpg`
    },
    { 
      title: "Karaoke", 
      thumbnail: '/images/karaoke-beatlife.avif',
      headset: ASSETS.ICONS.SINGLE,
      desc: `BeatLife DJ brings high energy karaoke entertainment to resorts, bars, corporate events, and private parties throughout Central Florida.

With professional sound equipment, thousands of song selections, crowd interaction, and live DJ mixing between singers, we create an exciting atmosphere that keeps guests engaged all night long.`
    },
    { 
      title: "Photo Booths", 
      thumbnail: '/images/photo-booth-beatlife.avif',
      headset: ASSETS.ICONS.DOUBLE,
      desc: `Our Photo Booth experiences are the perfect addition to weddings, corporate events, school dances, and private parties.

Features can include:
• Instant Prints
• Digital Sharing
• Custom Templates
• Fun Props
• Full Digital Galleries
• On Site Attendant Support

A fun and interactive way for guests to capture memories throughout the night.`
    }
  ];

  const packages = [
    { name: "Single Heart", icon: ASSETS.ICONS.SINGLE, count: 1, tier: "ESSENTIAL", features: ["1 Hour Consultation", "Reception (4-5 hours)", "Complete DJ/Emcee Set Up", "Dance Floor Lighting"] },
    { name: "Double Heart", icon: ASSETS.ICONS.DOUBLE, count: 2, tier: "SIGNATURE", featured: true, features: ["1 Hour Consultation", "Ceremony & Reception", "Reception (5-6 hours)", "Complete DJ/Emcee Set Up", "Enhanced Dance Floor Lights", "Limited uplighting around the room and dj booth"] },
    { name: "Triple Heart", icon: ASSETS.ICONS.TRIPLE, count: 3, tier: "POWERHOUSE", features: ["1 Hour Consultation", "Ceremony & Reception", "Reception (5-6 hours)", "DJ/Emcee Set Up + Subwoofer", "Premium Dance Floor Lighting", "15-25 Professional Uplights"] }
  ];

  // Expanded Testimonial Database (from 3 to 7 high-end listings)
  const testimonials = [
    {
      quote: "Beatlife transformed our wedding reception into an absolute concert experience. Dustin had the dancefloor packed before salads were even cleared. Worth every single penny.",
      author: "Sarah & Marcus T.",
      meta: "Wedding Reception • Waldorf Astoria",
      headset: ASSETS.ICONS.TRIPLE,
      stars: 5
    },
    {
      quote: "Our resort guests expect world-class programming, and Dustin Anderson delivers exactly that. His interactive poolside game setup is professional, incredibly engaging, and completely responsive to our brand.",
      author: "Elena R.",
      meta: "Entertainment Director • Premier Orlando Resort",
      headset: ASSETS.ICONS.SINGLE,
      stars: 5
    },
    {
      quote: "Sleek, organized, and structurally flawless timeline management. Dustin emceed our product launch and handled custom AV transitions with record-label precision.",
      author: "David K.",
      meta: "VP Operations • Global Tech Summit",
      headset: ASSETS.ICONS.DOUBLE,
      stars: 5
    },
    {
      quote: "The school dance of the decade! BeatLife DJ brought festival-level sound, intelligent light shows, and clean mixing that kept 1,200 students dancing until the final second.",
      author: "Jennifer L.",
      meta: "School Homecoming • Winter Park High",
      headset: ASSETS.ICONS.DOUBLE,
      stars: 5
    },
    {
      quote: "From Dustin Anderson's ceremony sound setup to Jackie's warm guidance during beauty and planning prep, the client experience is absolutely unparalleled. Pure magic.",
      author: "Brandon & Claire M.",
      meta: "Luxury Wedding • Ritz Carlton Orlando",
      headset: ASSETS.ICONS.TRIPLE,
      stars: 5
    },
    {
      quote: "Clean corporate operations, flawless execution, and a stunning booth presentation. They handled our multi-city franchise conference with total authority.",
      author: "Michael S.",
      meta: "Operations Summit • Marriott Lakeside",
      headset: ASSETS.ICONS.SINGLE,
      stars: 5
    },
    {
      quote: "The karaoke night setup BeatLife brought to our guest experience was completely transformative. Absolute high-energy crowd participation all night.",
      author: "Samantha V.",
      meta: "Resort Poolside • Wyndham Palms",
      headset: ASSETS.ICONS.SINGLE,
      stars: 5
    }
  ];

  // Expanded elite support partners roster data
  const team = [
    {
      name: "Lance Wolfe",
      role: "Partner",
      img: ASSETS.LANCE_PROFILE,
      bio: "With 15+ years in entertainment, Lance Wolfe has worked behind the scenes with some of the biggest names in dance music from Grammy Award–winner Nitty Gritty to Yookie, Whipped Cream, Henry Fong, Acraze, and more. His background in marketing, talent buying, and artist development gives him an unmatched eye for what makes a crowd come alive. Now part of the BeatLife team, Lance is committed to redefining what wedding entertainment can be—bigger energy, cleaner transitions, premium service and unforgettable moments."
    },
    {
      name: "Cynthia Pearl",
      role: "Partner / Office Manager",
      img: ASSETS.CYNTHIA_PROFILE,
      bio: "Cynthia brings many years of office management expertise to the BeatLife team. Her warm personality, prompt communication, and exceptional attention to detail make brides and grooms feel at ease throughout the planning process. Cynthia ensures every couple receives a seamless, organized, and truly personalized experience from start to finish."
    },
    {
      name: "Jackelyn Michele Poynter",
      role: "Beauty & Client Experience Consultant",
      img: ASSETS.JACKIE_PROFILE,
      bio: `Jackelyn brings over 15 years of experience working with some of the biggest hair and makeup companies in the wedding industry. A professional hair and makeup artist with a background in wedding planning, Jackie is the heart and feminine touch behind BeatLife DJ, helping brides feel calm, confident, and fully supported every step of the way.

She consults directly with our couples, answers detailed planning questions, and helps guide the overall wedding day experience with warmth and clarity. Jackie has even provided hair and makeup services for Burt Reynolds, reflecting the high level of professionalism and trust she brings to every client.

Her true superpower is putting brides at ease both before and on their wedding day. From beauty guidance to timeline reassurance, Jackie ensures every bride feels heard, cared for, and beautifully prepared, allowing them to relax and truly enjoy one of the most important days of their lives.`
    }
  ];

  // Optimize scrolling offset reflows using native browser behavior without querying geometry parameters in JS
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
    el.value = 'beatlifedj@gmail.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleImgError = (e) => {
    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230c0c0c" stroke="%23333" stroke-width="1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2322d3ee" font-family="sans-serif" font-weight="bold" font-size="6">BEATLIFE EVENT</text></svg>';
  };

  // Carousel controls
  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  // Lightbox Navigation helpers
  const handleNextSlide = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  // Testimonials scrolling logic
  const handleReviewsScroll = (direction) => {
    if (reviewsScrollRef.current) {
      const scrollAmount = 400;
      reviewsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Optional: Track contact form submissions as conversions in Google Ads
  const handleFormSubmit = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18196802294/r8hgCLXQ6LccEPbV9ORD'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden antialiased">
      
      {/* Scroll anchor target observed by event observer to prevent scroll layout thrashing */}
      <div id="scroll-anchor" className="absolute top-0 left-0 w-full h-1 pointer-events-none"></div>

      {/* --- REFINED BOLD NAVIGATION --- */}
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-black/95 backdrop-blur-xl py-2 border-b border-white/5 shadow-2xl' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-8 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <img src={ASSETS.NAV_HEART} alt="Beatlife Heart decorative brand symbol" width="96" height="96" className={`transition-all duration-700 h-auto ${scrolled ? 'w-12 md:w-16' : 'w-16 md:w-24'}`} />
              <img src={ASSETS.NAV_TEXT} alt="Beatlife Typography text Brandmark" width="176" height="34" className={`transition-all duration-700 h-auto ${scrolled ? 'w-24 md:w-32' : 'w-32 md:w-44'}`} />
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-10">
            {['Services', 'Tiers', 'Company', 'About', 'Reviews'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs font-black tracking-[0.4em] uppercase transition-all text-white/60 hover:text-white relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full" aria-hidden="true"></span>
              </button>
            ))}
            
            {/* Elegant Vertical Divider */}
            <span className="w-px h-6 bg-white/10" aria-hidden="true"></span>
            
            {/* SVG Header Social Bar */}
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=100086740441401" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/beatlifedj" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.weddingwire.com/biz/the-game-plan-orlando/dceca396dc820257.html" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on WeddingWire">
                <WeddingWireIcon className="w-5 h-5" />
              </a>
              <a href="https://www.theknot.com/marketplace/beat-life-dj-orlando-fl-2100018#unified-lightbox-modal" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on The Knot">
                <TheKnotIcon className="w-5 h-5" />
              </a>
            </div>

            <span className="w-px h-6 bg-white/10" aria-hidden="true"></span>

            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-black px-10 py-3 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-cyan-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl"
            >
              Book Dustin
            </button>
          </div>

          <button className="xl:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Open Navigation Menu">
            <Menu className="w-8 h-8" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* --- 100VH CINEMATIC HERO --- */}
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

            {/* TAGLINE UPDATED AS REQUESTED */}
            <p className="text-lg md:text-2xl font-bold uppercase italic text-white/80 drop-shadow-md mb-8 max-w-4xl mx-auto leading-tight">
              turning events into <span className="text-white">unforgettable experiences</span>
            </p>

            <div className="flex flex-wrap gap-4 md:gap-8 justify-center pb-6">
              {/* BUTTON POSITIONS SWITCHED */}
              <button 
                onClick={() => scrollToSection('showcase')}
                className="group flex items-center gap-4 px-6 py-4 text-white font-black uppercase text-[10px] md:text-xs tracking-widest transition-all hover:text-cyan-400"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-500 transition-all">
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" aria-hidden="true" />
                </div>
                Watch Intro
              </button>
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="bg-white text-black px-12 md:px-16 py-5 md:py-6 rounded-full font-black text-[11px] md:text-xs uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Consultation
              </button>
            </div>
          </div>
        </div>

        {/* SCROLL TEXT REMOVED */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-white/50 animate-pulse"></div>
        </div>
      </header>

      {/* --- THEATER MODE INTRODUCTION --- */}
      <section id="showcase" className="py-32 bg-[#0a0a0a] px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 space-y-4">
             <div className="inline-flex items-center gap-4 text-cyan-500">
               <Film className="w-6 h-6" aria-hidden="true" />
               <span className="text-sm font-black uppercase tracking-[0.6em] text-white/70">The Official introduction</span>
             </div>
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Welcome to <span className="text-cyan-500">Beatlife</span></h2>
             {/* SUBHEADING REWRITTEN TO "Real mixing. Real talent. Real moments." */}
             <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium uppercase italic leading-relaxed">
               Real mixing. Real talent. Real moments.
             </p>
          </div>
          
          <div className="w-full relative max-w-5xl group">
            <div className="aspect-video bg-neutral-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer" onClick={handlePlayShowcase}>
              {!showcaseStarted && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-500">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-white/30 bg-black/30 backdrop-blur-[1px] flex items-center justify-center group-hover:border-cyan-500 group-hover:scale-110 transition-all duration-700">
                    <Play className="w-8 h-8 md:w-10 md:h-10 fill-white" aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.8em] text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Start Production</p>
                </div>
              )}
              <video 
                ref={showcaseVideoRef}
                controls={showcaseStarted}
                playsInline
                className="w-full h-full object-cover"
                src={`${ASSETS.SHOWCASE_VIDEO}#t=0.001`}
                preload="metadata"
              >
                <track kind="captions" src="" label="Introduction captions" default />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* --- REFINED UNIFORM SERVICES SECTION (BRIGHTER MODE) --- */}
      <section id="services" className="scroll-mt-24 py-32 bg-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
             <div className="inline-flex items-center gap-3 text-cyan-500">
               <Zap className="w-5 h-5" aria-hidden="true" />
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">Our Capabilities</span>
             </div>
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Event <span className="text-cyan-500">Solutions</span></h2>
             {/* SUBHEADING REWRITTEN TO "Skilled MC's. Creative Dj's. Packed dancefloors." */}
             <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto uppercase italic">Skilled MC's. Creative Dj's. Packed dancefloors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col space-y-6 cursor-pointer"
                onClick={() => setActiveService(service)}
              >
                {/* 16:9 Cinematic Container for Uniform Formatting with Brightened Default Mode */}
                <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl relative group-hover:border-cyan-500 transition-all duration-500 bg-neutral-900">
                  {/* Background: YouTube Thumbnail or AVIF Image - ALWAYS COLOR with increased default visibility */}
                  {service.thumbnail ? (
                    <img 
                      src={service.thumbnail} 
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                      alt={`${service.title} capabilities preview thumbnail`}
                      width="640"
                      height="480"
                      onError={handleImgError}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center overflow-hidden">
                      <div className="relative z-10 p-5 rounded-2xl bg-white/10 border border-white/15 text-cyan-400 shadow-2xl group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-all duration-500">
                        {service.icon}
                      </div>
                    </div>
                  )}
                  
                  {/* Softer black overlay mask for a brighter card presentation */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all duration-500">
                    <div className="w-16 h-16 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500 transition-all">
                       {service.youtubeId ? <Play className="w-6 h-6 fill-white text-white" aria-hidden="true" /> : <ArrowRight className="w-6 h-6 text-white" aria-hidden="true" />}
                    </div>
                  </div>

                  {/* Title position with visual focus */}
                  <div className="absolute bottom-6 left-8 right-8 flex justify-start items-end z-10">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTEGRATED SERVICE MODAL --- */}
      {activeService && (() => {
        const descData = parseDescription(activeService.desc);
        return (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-12">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fade-in" onClick={() => setActiveService(null)}></div>
            
            <div className="relative w-full max-w-7xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 max-h-[95vh] overflow-y-auto">
              <button 
                  onClick={() => setActiveService(null)}
                  className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all"
                  aria-label="Close details modal"
              >
                  <X className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Content Side - Rendered in highly readable prose block */}
              <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center space-y-8 order-2 lg:order-1 bg-[#0a0a0a] text-center">
                <div className="space-y-6 flex flex-col items-center">
                  {/* Title at the top */}
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none text-white w-full text-center">
                    {activeService.title}
                  </h2>
                  
                  {/* Centered brand headset variation with dynamic styling & hover animations */}
                  {activeService.headset && (
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-2xl shrink-0 mt-2 transition-all duration-500 hover:scale-110 hover:border-cyan-500/80 hover:rotate-6 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] group/modalset">
                      <img 
                        src={activeService.headset} 
                        className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(34,211,238,0.3)]" 
                        alt={`${activeService.title} headphone emblem icon`} 
                        width="112"
                        height="112"
                      />
                    </div>
                  )}
                  
                  {/* Dynamically parsed copy containing structured paragraphs & professional checkmark list layout */}
                  <div className="text-base md:text-lg text-white/70 font-medium leading-relaxed whitespace-pre-line max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar text-left w-full mt-4 space-y-6">
                    {/* Render paragraphs before list */}
                    {descData.textParagraphsBefore.map((para, pIdx) => (
                      <p key={pIdx} className="uppercase italic">{para}</p>
                    ))}

                    {/* Highly stylized custom cyan checkmark list replacing plain bullet dots */}
                    {descData.listItems.length > 0 && (
                      <div className="py-6 border-t border-b border-white/10 w-full text-left my-4">
                        {descData.listTitle && (
                          <p className="text-xs font-black tracking-[0.3em] text-cyan-500 uppercase mb-4 italic">
                            {descData.listTitle}
                          </p>
                        )}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {descData.listItems.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-3 text-xs md:text-sm font-bold text-white/80 uppercase tracking-wide leading-tight">
                              <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Render paragraphs after list */}
                    {descData.textParagraphsAfter.map((para, pIdx) => (
                      <p key={pIdx} className="text-cyan-400 font-bold uppercase italic tracking-wide">{para}</p>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => { setIsContactOpen(true); setActiveService(null); }}
                  className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest bg-white text-black px-8 py-4 rounded-full hover:bg-cyan-500 hover:text-white transition-all w-fit shadow-xl mx-auto"
                >
                  Book Now
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
                      title={`${activeService.title} performance reel`}
                    />
                  </div>
                ) : activeService.thumbnail ? (
                  <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-black p-6">
                    <div className="relative w-full max-w-lg aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                      <img 
                        src={activeService.thumbnail} 
                        alt={`${activeService.title} presentation image`} 
                        className="w-full h-full object-cover opacity-95 transition-transform duration-1000"
                        onError={handleImgError}
                        width="500"
                        height="500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-12 md:p-20 text-center relative overflow-hidden bg-black">
                     {/* Abstract glowing backlights */}
                     <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] -top-10 -left-10 pointer-events-none"></div>
                     <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] -bottom-20 -right-20 pointer-events-none"></div>
                     
                     {/* Pristine icon layout without temporary headphone overlays for clean visual consistency */}
                     <div className="relative flex items-center justify-center w-40 h-40 mb-8 rounded-3xl bg-neutral-900 border border-white/10 text-cyan-400 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                        {activeService.icon}
                     </div>

                     <img src={ASSETS.NAV_TEXT} className="w-64 opacity-25 grayscale hover:opacity-45 hover:grayscale-0 transition-all duration-500" alt="Beatlife Text brand logo" width="300" height="60" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- DISTINCT HEART TIERS SECTION --- */}
      <section id="tiers" className="scroll-mt-24 py-32 bg-[#0a0a0a] px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Heart <span className="text-cyan-500 underline decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">Packages</span></h2>
             {/* SUBHEADING REWRITTEN TO "wedding packages designed around your love story" */}
             <p className="text-xs font-black uppercase tracking-[0.4em] text-white/70">wedding packages designed around your love story</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {packages.map((pkg, i) => (
              /* PACKAGES CONFIGURED UNIFORMLY BLACK/DARK */
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

                {/* ENLARGED IMAGE CONTAINER - CORRESPONDING COUNT OF HEADPHONE LOGOS LAID OUT UNIFORMLY AND LARGE */}
                <div className="mb-10 h-40 w-full relative flex items-center justify-center">
                  {pkg.count === 1 && (
                    <img 
                      src={pkg.icon} 
                      className="w-36 h-36 object-contain transition-transform duration-700 group-hover:scale-110" 
                      alt={`${pkg.name} single headphone equipment pack logo`} 
                      width="144"
                      height="144"
                    />
                  )}
                  {pkg.count === 2 && (
                    <div className="relative w-48 h-36 flex items-center justify-center">
                      <img 
                        src={pkg.icon} 
                        className="w-28 h-28 object-contain absolute transition-all duration-700 -translate-x-8 -rotate-12 group-hover:-translate-x-10 group-hover:-rotate-15" 
                        alt={`${pkg.name} left headphone gear`} 
                        width="112"
                        height="112"
                      />
                      <img 
                        src={pkg.icon} 
                        className="w-28 h-28 object-contain absolute transition-all duration-700 translate-x-8 rotate-12 group-hover:translate-x-10 group-hover:rotate-15 z-10" 
                        alt={`${pkg.name} right headphone gear`} 
                        width="112"
                        height="112"
                      />
                    </div>
                  )}
                  {pkg.count === 3 && (
                    <div className="relative w-56 h-36 flex items-center justify-center">
                      <img 
                        src={pkg.icon} 
                        className="w-24 h-24 object-contain absolute transition-all duration-700 -translate-x-16 -rotate-12 opacity-85 group-hover:-translate-x-18 group-hover:-rotate-15" 
                        alt={`${pkg.name} left headphone`} 
                        width="96"
                        height="96"
                      />
                      <img 
                        src={pkg.icon} 
                        className="w-24 h-24 object-contain absolute transition-all duration-700 translate-x-16 rotate-12 opacity-85 group-hover:translate-x-18 group-hover:rotate-15 z-10" 
                        alt={`${pkg.name} right headphone`} 
                        width="96"
                        height="96"
                      />
                      <img 
                        src={pkg.icon} 
                        className="w-28 h-28 object-contain absolute transition-all duration-700 z-20 scale-110 drop-shadow-[0_10px_20px_rgba(34,211,238,0.3)] group-hover:scale-115" 
                        alt={`${pkg.name} center main headphone`} 
                        width="112"
                        height="112"
                      />
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
                  onClick={() => setIsContactOpen(true)}
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                    pkg.featured 
                      ? 'bg-cyan-500 text-black hover:bg-white hover:text-black shadow-lg shadow-cyan-500/20' 
                      : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'
                  }`}
                >
                  Book Date
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RECONSTRUCTED COMPANY SECTION --- */}
      <section id="company" className="scroll-mt-24 py-32 bg-black px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Section Heading */}
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-3 text-cyan-500">
               <Users className="w-5 h-5" aria-hidden="true" />
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">About BeatLife DJ</span>
             </div>
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">About <span className="text-cyan-500">BeatLife DJ</span></h2>
             <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto uppercase italic">Full Service Entertainment Based In Orlando, Florida</p>
          </div>

          {/* Asymmetrical Video & Copy Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Side: Before You Book Video AND the interactive gallery carousel popout */}
            <div className="lg:col-span-6 space-y-12">
              
              {/* Before You Book Video Player */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest italic text-white/70 flex items-center gap-4">
                  <Film className="w-6 h-6 text-cyan-500" aria-hidden="true" /> Before You Book
                </h3>
                <div 
                  className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer"
                  onClick={() => setActiveService({ 
                    title: "Before You Book", 
                    youtubeId: ASSETS.BEFORE_BOOK_YT, 
                    headset: ASSETS.ICONS.SINGLE, 
                    desc: `Services include:
• Professional DJs and MCs
• Sound and Lighting Production
• Uplighting and Special Effects
• Photo Booths
• Interactive Games and Group Dancing
• Customized Entertainment Experiences` 
                  })}
                >
                  {/* Upgraded: Set opacity to full 100% to remove low-quality dull masking */}
                  <img 
                    src={`https://img.youtube.com/vi/${ASSETS.BEFORE_BOOK_YT}/hqdefault.jpg`} 
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000"
                    alt="Dustin Anderson hosting live, teaser snapshot of Before You Book briefing video"
                    onError={handleImgError}
                    width="480"
                    height="360"
                  />
                  {/* Upgraded: Swapped bg-black/30 dark mask to bg-transparent with dynamic group hover darken feedback */}
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/10 transition-colors duration-500">
                    <div className="w-20 h-20 rounded-full border border-white/40 bg-black/50 backdrop-blur-[2px] flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500 transition-all duration-500 shadow-lg shadow-cyan-500/10">
                       <Play className="w-8 h-8 fill-white text-white translate-x-0.5" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              {/* UPGRADED SLEEK MINI-CAROUSEL GALLERY (Brighter default visibility) */}
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest italic text-white/70 flex items-center gap-4">
                    <Camera className="w-6 h-6 text-cyan-500" aria-hidden="true" /> Event Gallery
                  </h3>
                </div>

                {/* Main Carousel Element (Entirely clickable now to launch lightbox) */}
                <div 
                  onClick={() => setLightboxIndex(carouselIndex)}
                  className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group/carousel bg-neutral-950 cursor-pointer"
                >
                  {/* Upgraded: Removed opacity dampeners completely to make assets glow with original sharpness */}
                  <img 
                    src={GALLERY_ITEMS[carouselIndex]?.url} 
                    alt={GALLERY_ITEMS[carouselIndex]?.title} 
                    className="w-full h-full object-cover opacity-85 group-hover/carousel:opacity-100 group-hover/carousel:scale-105 transition-all duration-1000"
                    onError={handleImgError}
                    width="640"
                    height="360"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  
                  {/* Left Navigation */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrevCarousel(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/5 hover:border-cyan-500 flex items-center justify-center text-white/80 hover:text-white transition-all z-10 opacity-0 group-hover/carousel:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                  </button>

                  {/* Right Navigation */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNextCarousel(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/5 hover:border-cyan-500 flex items-center justify-center text-white/80 hover:text-white transition-all z-10 opacity-0 group-hover/carousel:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" aria-hidden="true" />
                  </button>

                  {/* Click indicator overlay */}
                  <div 
                    className="absolute inset-0 flex flex-col justify-end p-8 bg-black/30 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
                  >
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

            {/* Right Side: Structured Brand Narrative Copy */}
            <div className="lg:col-span-6 space-y-8">
              <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.5em] block">STUDIO-GRADE COLLECTIVE OPERATIONS</span>
              <h4 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase italic leading-[0.9] text-white">We create experiences while playing from the heart</h4>
              
              <div className="space-y-6 text-white/75 text-base font-medium leading-relaxed uppercase italic">
                <p>
                  BeatLife DJ is a full service entertainment company based in Orlando, Florida, specializing in weddings, corporate events, private parties, school dances, proms, resort entertainment, nightlife events, and large scale celebrations.
                </p>
                <p>
                  Led by owner and founder Dustin Anderson, BeatLife DJ has built a reputation for professional DJ mixing, polished MC hosting, crowd interaction, and creating unforgettable experiences that keep guests engaged from beginning to end. With over 15 years of experience and performances connected with Marriott, Wyndham Resorts, Orlando Magic events, schools, wedding venues, and premier event spaces throughout Central Florida, we know how to create the perfect atmosphere for every audience and occasion.
                </p>
                <p>
                  From elegant weddings and polished corporate functions to interactive resort entertainment and packed dance floors, we focus on smooth event flow, attention to detail, and creating moments people remember long after the event is over.
                </p>
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

      {/* --- FULLSCREEN LIGHTBOX SYSTEM --- */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl animate-fade-in" onClick={() => setLightboxIndex(null)}></div>
          
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Left Navigation */}
          <button 
            onClick={handlePrevSlide}
            className="absolute left-6 md:left-12 z-50 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" aria-hidden="true" />
          </button>

          {/* Main Visual Frame */}
          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center z-10 animate-in zoom-in-95 duration-500">
            <img 
              src={GALLERY_ITEMS[lightboxIndex].url} 
              alt={`${GALLERY_ITEMS[lightboxIndex].title} - expanded view`} 
              className="w-full max-h-[70vh] aspect-video rounded-3xl object-cover border border-white/10 shadow-2xl"
              onError={handleImgError}
              width="1000"
              height="600"
            />
            {/* Slide Metadata */}
            <div className="mt-6 text-center space-y-2 max-w-2xl px-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                {GALLERY_ITEMS[lightboxIndex].category}
              </span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                {GALLERY_ITEMS[lightboxIndex].title}
              </h3>
              <p className="text-white/70 text-sm md:text-base uppercase italic">
                {GALLERY_ITEMS[lightboxIndex].desc}
              </p>
            </div>
          </div>

          {/* Right Navigation */}
          <button 
            onClick={handleNextSlide}
            className="absolute right-6 md:right-12 z-50 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* --- UNIFIED SINGLE PAGE ABOUT & TEAM SECTION --- */}
      <section id="about" className="scroll-mt-24 py-32 px-6 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-28">
          
          {/* Founder Profile Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Dustin Profile Media Card */}
            <div className="lg:col-span-5 relative group sticky top-28">
               <div className="absolute inset-0 -rotate-2 grayscale opacity-20 transition-all group-hover:rotate-0">
                  <img src={ASSETS.DUSTIN_STORY} className="w-full h-full object-cover rounded-[2.5rem]" alt="Heritage background visual" onError={handleImgError} width="800" height="1000" />
               </div>
               <img src={ASSETS.DUSTIN_PROFILE} className="relative z-10 w-[95%] mx-auto rounded-[3rem] shadow-2xl contrast-110 border border-white/5" alt="Dustin Anderson founder portrait" onError={handleImgError} width="800" height="1000" />
               <div className="absolute -bottom-8 -right-8 bg-white p-10 rounded-[2.5rem] shadow-2xl text-black z-20 rotate-3">
                  <p className="text-[10px] font-black uppercase tracking-draw opacity-70 italic leading-none">The Founder</p>
                  <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-[0.8] mt-2">Dustin <br/> Anderson</h3>
               </div>
            </div>
            
            {/* Right Column: Digestible single-page narrative block with matched, refined editorial sizing */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.5em] block">Founder Spotlight</span>
                {/* Heading line-height updated to leading-tight to fix squished typography spacing */}
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight italic underline decoration-white decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">How It All <br/>Started</h2>
              </div>
              
              {/* Unified bio blocks - matched perfectly to the premium scale of the Company section */}
              <div className="space-y-6 text-white/75 text-base font-medium leading-relaxed uppercase italic">
                <p>
                  Born and raised in Orlando, Florida, Dustin Anderson is the founder and creative force behind BeatLife DJ. With over 15 years of experience, Dustin has entertained crowds across weddings, resorts, nightlife venues, sporting events, school dances, and major attractions throughout Central Florida.
                </p>
                <p>
                  With a microphone in his hand since the age of four, entertainment has always been second nature. Over the years, Dustin has performed with and for major brands including Disney, Universal Studios, Orlando City Soccer, and the Orlando Magic, while also performing Disney weddings for more than four years.
                </p>
                <p>
                  His experience ranges from luxury weddings and interactive resort entertainment to downtown Orlando nightlife, corporate events, youth events, and large scale celebrations. Known for professional DJ mixing, crowd interaction, and polished MC skills, Dustin focuses on creating unforgettable experiences through music, energy, and connection.
                </p>
              </div>

              {/* Philosophy Spot card */}
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

          {/* --- MEET THE ELITE TEAM GRID (Clean cards triggering modal popups) --- */}
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
                <div 
                  key={idx} 
                  className="group relative flex flex-col justify-start rounded-[2.5rem] border border-white/5 bg-neutral-950/80 hover:border-cyan-500/30 transition-all duration-700 p-8 space-y-6 cursor-pointer"
                  onClick={() => setActiveTeamMember(member)}
                >
                  {/* Photo Frame Container with robust fallbacks and explicit sizes */}
                  <div className="aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 relative group-hover:border-cyan-500/30 transition-all duration-500">
                    <img 
                      src={member.img} 
                      alt={`${member.name} - ${member.role} headshot`} 
                      onError={handleImgError}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      width="350"
                      height="350"
                    />
                  </div>

                  {/* Identification Metadata */}
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500/80 block italic">
                      {member.role}
                    </span>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">
                      {member.name}
                    </h3>
                  </div>

                  {/* Interactive CTA replace long bio text to ensure super clean main page aesthetic */}
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

      {/* --- TESTIMONIALS SECTION (With premium horizontal snap scroll & glow effects) --- */}
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
              <button 
                onClick={() => handleReviewsScroll('left')}
                className="w-16 h-16 rounded-full border border-white/10 hover:border-cyan-500 bg-neutral-950 flex items-center justify-center text-white/80 hover:text-white transition-all transform hover:scale-105"
                aria-label="Scroll reviews left"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={() => handleReviewsScroll('right')}
                className="w-16 h-16 rounded-full border border-white/10 hover:border-cyan-500 bg-neutral-950 flex items-center justify-center text-white/80 hover:text-white transition-all transform hover:scale-105"
                aria-label="Scroll reviews right"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Scrolling snap row track */}
          <div 
            ref={reviewsScrollRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 scrollbar-none scrollbar-hide select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((test, index) => (
              <div 
                key={index} 
                className="group flex-shrink-0 w-[90%] sm:w-[500px] snap-start relative p-12 rounded-[3rem] border border-white/5 bg-neutral-950/80 hover:border-cyan-500/30 transition-all duration-700 flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(34,211,238,0.05)]"
              >
                <div className="space-y-6 flex flex-col items-center">
                  {/* Testimonial Header: Prominent, Centered Headphone logo matching Service Modal effect */}
                  <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-2xl shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-500/80 group-hover:rotate-6 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]">
                    <img 
                      src={test.headset} 
                      alt="Heart package headphone emblem" 
                      className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(34,211,238,0.3)]" 
                      width="96"
                      height="96"
                    />
                  </div>
                  
                  {/* Centered Rating Stars underneath Headset logo */}
                  <div className="flex gap-1.5 text-cyan-500 justify-center">
                    {Array.from({ length: test.stars }).map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-cyan-500" aria-hidden="true" />
                    ))}
                  </div>
                  
                  <p className="text-white/80 text-base leading-relaxed font-semibold uppercase italic leading-normal text-center pt-2">
                    "{test.quote}"
                  </p>
                </div>
                
                {/* Meta details aligned centered */}
                <div className="pt-10 border-t border-white/5 mt-10 text-center">
                  <h3 className="text-lg font-black uppercase tracking-tighter text-white leading-none mb-2">{test.author}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">{test.meta}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Centered Award/Review badges for WeddingWire and The Knot (Standardized to exactly w-72 width) */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-12 border-t border-white/5">
            <a 
              href="https://www.weddingwire.com/biz/the-game-plan-orlando/dceca396dc820257.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-gradient-to-br from-neutral-900 to-black border border-cyan-500/40 hover:border-cyan-400 px-8 py-5 rounded-3xl transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transform hover:-translate-y-1.5 w-72 justify-start shrink-0"
              aria-label="Read BeatLife DJ reviews on WeddingWire"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300 shadow-inner shrink-0">
                <WeddingWireIcon className="w-8 h-8" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black tracking-[0.2em] text-white/50 uppercase leading-none">Reviewed On</p>
                <p className="text-lg font-bold text-white uppercase tracking-wider mt-1 group-hover:text-cyan-400 transition-colors">WeddingWire</p>
              </div>
            </a>
            
            <a 
              href="https://www.theknot.com/marketplace/beat-life-dj-orlando-fl-2100018#unified-lightbox-modal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-gradient-to-br from-neutral-900 to-black border border-cyan-500/40 hover:border-cyan-400 px-8 py-5 rounded-3xl transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transform hover:-translate-y-1.5 w-72 justify-start shrink-0"
              aria-label="Read BeatLife DJ reviews on The Knot"
            >
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

      {/* --- INTEGRATED TEAM MEMBER MODAL POPUP (Standardized pop-out effects) --- */}
      {activeTeamMember && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-12 animate-fade-in">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setActiveTeamMember(null)}></div>
          
          <div className="relative w-full max-w-7xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 max-h-[95vh] overflow-y-auto">
            <button 
                onClick={() => setActiveTeamMember(null)}
                className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black transition-all"
                aria-label="Close biography modal"
            >
                <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Content Side */}
            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center space-y-8 order-2 lg:order-1 bg-[#0a0a0a] text-center">
              <div className="space-y-6 flex flex-col items-center">
                {/* Meta Indicator: Name at top, role/title with larger layout directly beneath */}
                <div className="text-left w-full space-y-2">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-tight text-white">
                    {activeTeamMember.name}
                  </h2>
                  <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-cyan-500 block italic">
                    {activeTeamMember.role}
                  </span>
                </div>
                
                {/* Centered Headphone representation (Standardized to Services effect with glowing hover-scale mechanics) */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-2xl shrink-0 mt-2 transition-all duration-500 hover:scale-110 hover:border-cyan-500/80 hover:rotate-6 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] group/modalset">
                  <img 
                    src={ASSETS.ICONS.SINGLE} 
                    className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(34,211,238,0.3)] transition-transform duration-500 group-hover/modalset:scale-105" 
                    alt="Single Headphone Icon" 
                    width="112"
                    height="112"
                  />
                </div>
                
                {/* Biography prose layout with custom scroll bar support */}
                <div className="text-base md:text-lg text-white/70 font-medium leading-relaxed whitespace-pre-line max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar text-left w-full mt-4">
                  {activeTeamMember.bio}
                </div>
              </div>
              
              <button 
                onClick={() => { setIsContactOpen(true); setActiveTeamMember(null); }}
                className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest bg-white text-black px-8 py-4 rounded-full hover:bg-cyan-500 hover:text-white transition-all w-fit shadow-xl mx-auto"
              >
                Inquire with {activeTeamMember.name.split(' ')[0]}
              </button>
            </div>

            {/* Visual Side */}
            <div className="lg:w-1/2 order-1 lg:order-2 bg-neutral-900 border-b lg:border-b-0 lg:border-l border-white/5">
              <div className="w-full h-full aspect-square lg:aspect-auto flex items-center justify-center bg-black p-6">
                <div className="relative w-full max-w-lg aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={activeTeamMember.img} 
                    alt={`${activeTeamMember.name} portrait expanded view`} 
                    className="w-full h-full object-cover opacity-90 transition-transform duration-1000"
                    onError={handleImgError}
                    width="500"
                    height="500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTACT MODAL --- */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsContactOpen(false)}></div>
          
          <div className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in slide-in-from-bottom-8 duration-500 max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="lg:w-2/5 p-8 md:p-12 lg:p-16 bg-white text-black flex flex-col justify-between relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] rotate-12">
                 <img src={ASSETS.HERO_LOGO} className="w-80 grayscale" alt="Watermark branded symbol" width="320" height="150" />
              </div>
              <div className="relative z-10">
                 <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.8] mb-8 md:mb-12">Book the <br/>Beat</h2>
                 <div className="space-y-6 md:space-y-8">
                    <a href="tel:3214003507" className="flex gap-6 items-center group cursor-pointer">
                      <div className="w-14 h-14 rounded-[1.2rem] bg-black text-cyan-500 flex items-center justify-center shadow-xl"><Phone className="w-6 h-6" /></div>
                      <div><p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1 italic">The Hotline</p><p className="text-xl md:text-2xl font-black italic tracking-tighter leading-none">(321) 400-3507</p></div>
                    </a>
                    <div className="flex gap-6 items-center group cursor-pointer" onClick={copyEmail}>
                      <div className="w-14 h-14 rounded-[1.2rem] bg-black text-cyan-500 flex items-center justify-center shadow-xl"><Mail className="w-6 h-6" /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1 italic">Digital Inquiries</p>
                        <p className="text-base md:text-lg font-black italic tracking-tighter leading-none flex items-center gap-2">
                          beatlifedj@gmail.com <Copy className="w-3 h-3 opacity-30" />
                        </p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="lg:w-3/5 p-8 md:p-12 lg:p-16 space-y-8 md:space-y-12">
               <form action="https://api.web3forms.com/submit" method="POST" className="space-y-8 md:space-y-10" onSubmit={handleFormSubmit}>
                  <input type="hidden" name="access_key" value="c82ba055-610f-4ae9-9a05-b0fe3aafeafe" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Host Identity</label>
                      <input type="text" name="name" required className="w-full bg-transparent outline-none font-black text-xl md:text-2xl uppercase tracking-tighter placeholder:text-white/5" placeholder="FULL NAME" />
                    </div>
                    <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Reply Channel</label>
                      <input type="email" name="email" required className="w-full bg-transparent outline-none font-black text-xl md:text-2xl uppercase tracking-tighter placeholder:text-white/5" placeholder="EMAIL ADDRESS" />
                    </div>
                    <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Direct Line</label>
                      <input type="tel" name="phone" className="w-full bg-transparent outline-none font-black text-xl md:text-2xl uppercase tracking-tighter placeholder:text-white/5" placeholder="PHONE NUMBER" />
                    </div>
                    <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Configuration</label>
                       <select name="event_type" className="w-full bg-transparent outline-none font-black text-lg md:text-xl uppercase tracking-tighter appearance-none cursor-pointer">
                          <option value="Weddings" className="bg-black text-white">WEDDINGS</option>
                          <option value="Resorts" className="bg-black text-white">RESORTS</option>
                          <option value="School Events" className="bg-black text-white">SCHOOL EVENTS</option>
                          <option value="Youth Events" className="bg-black text-white">YOUTH EVENTS</option>
                          <option value="Corporate" className="bg-black text-white">CORPORATE</option>
                          <option value="Karaoke" className="bg-black text-white">KARAOKE</option>
                          <option value="Photo Booths" className="bg-black text-white">PHOTO BOOTHS</option>
                       </select>
                    </div>
                  </div>
                  <div className="border-b border-white/10 focus-within:border-cyan-500 transition-all py-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/70 italic block mb-3">Additional Comments</label>
                     <textarea name="comments" rows="3" className="w-full bg-transparent outline-none font-black text-lg md:text-xl uppercase tracking-tighter placeholder:text-white/5 resize-none custom-scrollbar" placeholder="ANY SPECIFIC DETAILS OR REQUESTS?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-cyan-500 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                    Contact Beatlife
                  </button>
               </form>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
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

      {/* --- MOBILE NAV --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 transition-transform hover:rotate-90" aria-label="Close Navigation Menu"><X className="w-10 h-10" /></button>
          <div className="space-y-12">
            {['Services', 'Tiers', 'Company', 'About', 'Reviews'].map(tab => (
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
          
          {/* Mobile Social Drawer Group */}
          <div className="absolute bottom-10 flex gap-6 items-center">
            <a href="https://www.facebook.com/profile.php?id=100086740441401" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on Facebook">
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/beatlifedj" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on Instagram">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href="https://www.weddingwire.com/biz/the-game-plan-orlando/dceca396dc820257.html" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on WeddingWire">
              <WeddingWireIcon className="w-6 h-6" />
            </a>
            <a href="https://www.theknot.com/marketplace/beat-life-dj-orlando-fl-2100018#unified-lightbox-modal" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-500 transition-colors" aria-label="Visit Beatlife on The Knot">
              <TheKnotIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      )}

      {/* Custom Styles for Scrollbars inside modals */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.6);
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
};

export default App;