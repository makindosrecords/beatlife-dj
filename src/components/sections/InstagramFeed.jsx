import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import { InstagramIcon } from '../ui/Icons';

const InstagramFeed = () => {
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [igLoading, setIgLoading] = useState(true);

  useEffect(() => {
    const fetchInstagram = async () => {
      try {
        const res = await fetch('/api/instagram');
        if (res.ok) {
          const data = await res.json();
          setInstagramPosts(data ? data.slice(0, 10) : []);
        }
      } catch (err) {
        console.error('Error fetching Instagram:', err);
      } finally {
        setIgLoading(false);
      }
    };
    fetchInstagram();
  }, []);

  return (
    <section id="socials" className="py-32 bg-black px-6 border-t border-white/5 relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-3 text-cyan-500">
             <InstagramIcon className="w-5 h-5" aria-hidden="true" />
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/70">Follow The Journey</span>
           </div>
           <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Latest on <span className="text-cyan-500">Socials</span></h2>
        </div>
        
        {igLoading ? (
           <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
           </div>
        ) : instagramPosts.length > 0 ? (
           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
             {instagramPosts.map((post) => (
               <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className="group relative aspect-[9/16] rounded-[1.5rem] overflow-hidden bg-neutral-900 border border-white/5 hover:border-cyan-500/50 transition-all duration-500 shadow-lg block" onMouseEnter={(e) => { const vid = e.currentTarget.querySelector('video'); if (vid) vid.play().catch(() => {}); }} onMouseLeave={(e) => { const vid = e.currentTarget.querySelector('video'); if (vid) { vid.pause(); vid.currentTime = 0; } }}>
                 <img src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url} alt={post.caption || 'Instagram Post'} className={`relative z-10 w-full h-full object-cover transition-all duration-700 ${post.media_type === 'VIDEO' ? 'opacity-80 group-hover:opacity-0' : 'opacity-80 group-hover:opacity-100 group-hover:scale-110'}`} loading="lazy" />
                 
                 {post.media_type === 'VIDEO' && (
                   <video src={post.media_url} preload="none" className="absolute inset-0 w-full h-full object-cover z-0" muted loop playsInline />
                 )}

                 {post.media_type === 'VIDEO' && (
                   <div className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:opacity-0 transition-opacity duration-300">
                      <Film className="w-4 h-4 text-white" aria-hidden="true" />
                   </div>
                 )}

                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center p-4 text-center z-20 pb-6">
                    <InstagramIcon className="w-6 h-6 text-cyan-500 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                    <p className="text-white text-[10px] md:text-xs font-medium line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 uppercase italic">{post.caption ? post.caption.slice(0, 75) + (post.caption.length > 75 ? '...' : '') : 'View on Instagram'}</p>
                 </div>
               </a>
             ))}
           </div>
        ) : (
           <div className="text-center text-white/50 py-12 border border-white/10 rounded-3xl bg-neutral-950">
              <p className="text-sm font-black uppercase tracking-widest">Unable to load feed. Check back later.</p>
           </div>
        )}
        
        <div className="mt-16 text-center">
           <a href="https://www.instagram.com/beatlifedj" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest bg-transparent border border-cyan-500 text-cyan-500 px-8 py-4 rounded-full hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">Follow @beatlifedj</a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;