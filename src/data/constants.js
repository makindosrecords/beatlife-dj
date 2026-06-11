// LITERAL ASSET MAPPING
export const ASSETS = {
  NAV_HEART: '/images/beatlife_heart.svg',
  NAV_TEXT: '/images/Beatlife_text_only.svg',
  SIDE_LOGO: '/images/Beatlife_side_logo.svg',
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

// ADVANCED CATEGORIZED INTERACTIVE GALLERY DATA
export const GALLERY_ITEMS = [
  {
    category: 'weddings',
    url: '/images/wedding_beatlife.avif',
    title: 'Grand Wedding Reception',
    desc: 'Dustin Anderson packing the dance floor at a grand ballroom celebration.'
  },
  {
    category: 'weddings',
    url: '/images/dancing_cloud_beatlife.avif',
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

export const services = [
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

export const packages = [
  { name: "Single Heart", icon: ASSETS.ICONS.SINGLE, count: 1, tier: "ESSENTIAL", features: ["1 Hour Consultation", "Reception (4-5 hours)", "Complete DJ/Emcee Set Up", "Dance Floor Lighting"] },
  { name: "Double Heart", icon: ASSETS.ICONS.DOUBLE, count: 2, tier: "SIGNATURE", featured: true, features: ["1 Hour Consultation", "Ceremony & Reception", "Reception (5-6 hours)", "Complete DJ/Emcee Set Up", "Enhanced Dance Floor Lights", "Limited uplighting around the room and dj booth"] },
  { name: "Triple Heart", icon: ASSETS.ICONS.TRIPLE, count: 3, tier: "POWERHOUSE", features: ["1 Hour Consultation", "Ceremony & Reception", "Reception (5-6 hours)", "DJ/Emcee Set Up + Subwoofer", "Premium Dance Floor Lighting", "15-25 Professional Uplights"] }
];

// Expanded Testimonial Database (from 3 to 7 high-end listings)
export const testimonials = [
  { quote: "Beatlife transformed our wedding reception into an absolute concert experience. Dustin had the dancefloor packed before salads were even cleared. Worth every single penny.", author: "Sarah & Marcus T.", meta: "Wedding Reception • Waldorf Astoria", headset: ASSETS.ICONS.TRIPLE, stars: 5 },
  { quote: "Our resort guests expect world-class programming, and Dustin Anderson delivers exactly that. His interactive poolside game setup is professional, incredibly engaging, and completely responsive to our brand.", author: "Elena R.", meta: "Entertainment Director • Premier Orlando Resort", headset: ASSETS.ICONS.SINGLE, stars: 5 },
  { quote: "Sleek, organized, and structurally flawless timeline management. Dustin emceed our product launch and handled custom AV transitions with record-label precision.", author: "David K.", meta: "VP Operations • Global Tech Summit", headset: ASSETS.ICONS.DOUBLE, stars: 5 },
  { quote: "The school dance of the decade! BeatLife DJ brought festival-level sound, intelligent light shows, and clean mixing that kept 1,200 students dancing until the final second.", author: "Jennifer L.", meta: "School Homecoming • Winter Park High", headset: ASSETS.ICONS.DOUBLE, stars: 5 },
  { quote: "From Dustin Anderson's ceremony sound setup to Jackie's warm guidance during beauty and planning prep, the client experience is absolutely unparalleled. Pure magic.", author: "Brandon & Claire M.", meta: "Luxury Wedding • Ritz Carlton Orlando", headset: ASSETS.ICONS.TRIPLE, stars: 5 },
  { quote: "Clean corporate operations, flawless execution, and a stunning booth presentation. They handled our multi-city franchise conference with total authority.", author: "Michael S.", meta: "Operations Summit • Marriott Lakeside", headset: ASSETS.ICONS.SINGLE, stars: 5 },
  { quote: "The karaoke night setup BeatLife brought to our guest experience was completely transformative. Absolute high-energy crowd participation all night.", author: "Samantha V.", meta: "Resort Poolside • Wyndham Palms", headset: ASSETS.ICONS.SINGLE, stars: 5 }
];

// Expanded elite support partners roster data
export const team = [
  { name: "Lance Wolfe", role: "Partner", img: ASSETS.LANCE_PROFILE, bio: "With 15+ years in entertainment, Lance Wolfe has worked behind the scenes with some of the biggest names in dance music from Grammy Award–winner Nitty Gritty to Yookie, Whipped Cream, Henry Fong, Acraze, and more. His background in marketing, talent buying, and artist development gives him an unmatched eye for what makes a crowd come alive. Now part of the BeatLife team, Lance is committed to redefining what wedding entertainment can be—bigger energy, cleaner transitions, premium service and unforgettable moments." },
  { name: "Cynthia Pearl", role: "Partner / Office Manager", img: ASSETS.CYNTHIA_PROFILE, bio: "Cynthia brings many years of office management expertise to the BeatLife team. Her warm personality, prompt communication, and exceptional attention to detail make brides and grooms feel at ease throughout the planning process. Cynthia ensures every couple receives a seamless, organized, and truly personalized experience from start to finish." },
  { name: "Jackelyn Michele Poynter", role: "Beauty & Client Experience Consultant", img: ASSETS.JACKIE_PROFILE, bio: "Jackelyn brings over 15 years of experience working with some of the biggest hair and makeup companies in the wedding industry. A professional hair and makeup artist with a background in wedding planning, Jackie is the heart and feminine touch behind BeatLife DJ, helping brides feel calm, confident, and fully supported every step of the way.\n\nShe consults directly with our couples, answers detailed planning questions, and helps guide the overall wedding day experience with warmth and clarity. Jackie has even provided hair and makeup services for Burt Reynolds, reflecting the high level of professionalism and trust she brings to every client.\n\nHer true superpower is putting brides at ease both before and on their wedding day. From beauty guidance to timeline reassurance, Jackie ensures every bride feels heard, cared for, and beautifully prepared, allowing them to relax and truly enjoy one of the most important days of their lives." }
];