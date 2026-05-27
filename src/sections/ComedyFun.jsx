import { Link } from "react-router-dom";
import { Laugh, Play, Heart } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";

export default function ComedyFun({ videos }) {
  // Extract 6 comedy videos
  const comedyVideos = videos.filter((v) => v.category === "comedy").slice(0, 6);

  const bouncingEmojis = [
    { char: "😂", style: { bottom: "15%", left: "4%", fontSize: "36px", animationDelay: "0.2s" } },
    { char: "😜", style: { top: "15%", left: "10%", fontSize: "28px", animationDelay: "0.7s" } },
    { char: "💀", style: { bottom: "20%", right: "6%", fontSize: "32px", animationDelay: "0s" } },
    { char: "👻", style: { top: "18%", right: "8%", fontSize: "30px", animationDelay: "1.4s" } },
  ];

  return (
    <section className="py-24 bg-[#0B0F19] text-white relative overflow-hidden select-none">
      
      {/* Decorative gradient radial lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(163,230,53,0.06)_0%,rgba(0,0,0,0)_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.06)_0%,rgba(0,0,0,0)_50%)] pointer-events-none" />

      {/* Floating Emojis */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {bouncingEmojis.map((emoji, idx) => (
          <div
            key={idx}
            style={emoji.style}
            className="absolute animate-bounce select-none opacity-20 filter saturate-150"
          >
            {emoji.char}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#a3e635] uppercase">
              <Laugh className="w-4 h-4 text-[#a3e635]" />
              HUMOUR FRANÇAIS
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
              SKETCHES & FOUS RIRES
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 font-medium leading-relaxed">
            Bureau des Plaintes, COVID, Emoji, Jean Michel Bruitage — les meilleurs sketches français qui vont vous faire pleurer de rire.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comedyVideos.map((vid, idx) => (
            <div
              key={vid.id}
              className="group"
            >
              <Link
                to={`/video/${vid.id}`}
                onClick={handleClickSound}
                onMouseEnter={handleHoverSound}
                className="block relative rounded-2xl overflow-hidden glass-card border border-white/5 bg-[#121824] transition-all duration-500 hover:scale-102 hover:border-[#a3e635]/30 hover:shadow-[0_0_30px_rgba(163,230,53,0.15)] cursor-pointer"
              >
                
                {/* Image Wrap */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Neon Lime Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/35 to-transparent z-10" />

                  {/* Play circle */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#a3e635] text-[#0B0F19] flex items-center justify-center shadow-xl">
                      <Play className="w-5 h-5 fill-current ml-1" />
                    </div>
                  </div>
                  
                  {/* Creator label */}
                  <span className="absolute bottom-4 left-4 z-20 text-[9px] font-black tracking-widest uppercase bg-[#a3e635]/90 text-[#0B0F19] px-2.5 py-1 rounded font-display">
                    {vid.creator}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col gap-2.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider"></span>
                  <h3 className="font-display font-extrabold text-sm text-slate-100 group-hover:text-[#a3e635] transition-colors uppercase line-clamp-1">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 border-t border-white/5 pt-4 mt-2">
                    <span className="flex items-center gap-1 hover:text-white transition-colors">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10" />
                      {vid.likes} Likes
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="mt-16 text-center">
          <Link
            to="/comedy"
            onClick={handleClickSound}
            onMouseEnter={handleHoverSound}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-[#a3e635] text-[#0B0F19] text-xs font-bold tracking-widest uppercase hover:scale-105 active:scale-98 transition-all duration-300 shadow-md font-display"
          >
            VOIR TOUS LES SKETCHES →
          </Link>
        </div>
      </div>
    </section>
  );
}
