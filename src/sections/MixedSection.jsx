import { Link } from "react-router-dom";
import { Sparkles, Gamepad2, Shirt, Play, Eye } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";

export default function MixedSection({ videos }) {
  // Extract 3 Fashion and 3 Gaming videos for high contrast split layout
  const fashionList = videos.filter((v) => v.category === "fashion").slice(3, 6);
  const gamingList = videos.filter((v) => v.category === "games").slice(3, 6);

  return (
    <section className="py-24 bg-[#080710] text-white relative overflow-hidden select-none border-t border-white/5">
      
      {/* Decorative vertical glowing neon divider */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-cyan-500/20 via-fuchsia-500/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
          
          {/* LEFT SIDE: Fashion Luxury Slide-reel */}
          <div className="flex flex-col gap-8">
            
            {/* Title block */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-black tracking-widest text-rose-400 uppercase">
                <Shirt className="w-4 h-4 text-rose-400" />
                CYBER CHIC DESIGN
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                LIFESTYLE LUXE
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-md">
                Elegance meets functional aesthetic design. A slow-motion catalog of luxurious modern clothing cuts.
              </p>
            </div>

            {/* Visual catalog list */}
            <div className="flex flex-col gap-5">
              {fashionList.map((vid) => (
                <Link
                  key={vid.id}
                  to={`/video/${vid.id}`}
                  onClick={handleClickSound}
                  onMouseEnter={handleHoverSound}
                  className="flex items-center gap-5 p-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden relative flex-shrink-0">
                    <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 justify-center">
                    <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest">{vid.creator}</span>
                    <h4 className="font-serif text-sm text-slate-100 group-hover:text-rose-400 font-semibold line-clamp-1 transition-colors">{vid.title}</h4>
                    <span className="text-[10px] text-slate-400 font-sans">{vid.duration} • {vid.views}</span>
                  </div>
                </Link>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: Cyberpunk Gaming Float-cards */}
          <div className="flex flex-col gap-8">
            
            {/* Title block */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-black tracking-widest text-cyan-400 uppercase">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                VIRTUAL WARFARE
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                ESPORTS SPECTACLE
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-md">
                Fast reflex esports, high intensity speedruns, and cyber arenas broadcast in ultra-premium latency-free frames.
              </p>
            </div>

            {/* Visual catalog list */}
            <div className="flex flex-col gap-5">
              {gamingList.map((vid) => (
                <Link
                  key={vid.id}
                  to={`/video/${vid.id}`}
                  onClick={handleClickSound}
                  onMouseEnter={handleHoverSound}
                  className="flex items-center gap-5 p-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden relative flex-shrink-0">
                    <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 justify-center">
                    <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">{vid.creator}</span>
                    <h4 className="font-display text-sm text-slate-100 group-hover:text-cyan-400 font-bold line-clamp-1 transition-colors uppercase">{vid.title}</h4>
                    <span className="text-[10px] text-slate-400 font-sans">{vid.duration} • {vid.views}</span>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
