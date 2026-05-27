import { Link } from "react-router-dom";
import { Sparkles, Play, Compass, Star } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";

export default function CartoonUniverse({ videos }) {
  // Extract 6 cartoon videos
  const cartoonVideos = videos.filter((v) => v.category === "cartoon").slice(0, 6);

  const bubbleList = [
    { size: "w-8 h-8", bottom: "10%", left: "6%", delay: "0s" },
    { size: "w-12 h-12", top: "15%", left: "8%", delay: "1.5s" },
    { size: "w-6 h-6", top: "25%", right: "10%", delay: "0.5s" },
    { size: "w-10 h-10", bottom: "18%", right: "7%", delay: "2s" },
  ];

  return (
    <section className="py-24 bg-[#E0F2FE] text-[#1E3A8A] relative overflow-hidden select-none">
      
      {/* Decorative Cloud Backgrounds */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-white opacity-40">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        </svg>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {bubbleList.map((bub, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full border border-white/40 bg-white/10 backdrop-blur-xs animate-bounce ${bub.size}`}
            style={{
              bottom: bub.bottom,
              top: bub.top,
              left: bub.left,
              right: bub.right,
              animationDelay: bub.delay,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-indigo-600 uppercase">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              PARADIS ANIMÉ
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-[#1E293B] tracking-tight uppercase">
              UNIVERS CARTOON
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#334155] font-medium leading-relaxed">
            Dragon Ball Z, Hey Arnold, Inspecteur Gadget, Pokémon — les dessins animés cultes qui ont marqué des générations.
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cartoonVideos.map((vid, idx) => (
            <div
              key={vid.id}
              className="group"
            >
              <Link
                to={`/video/${vid.id}`}
                onClick={handleClickSound}
                onMouseEnter={handleHoverSound}
                className="block relative rounded-3xl overflow-hidden bg-white border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
              >
                
                {/* Image wrapping */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                  {/* Play circle */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Views count */}
                  <span className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase bg-indigo-500 text-white px-2.5 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-white" />
                    {vid.views}
                  </span>
                </div>

                {/* Info details */}
                <div className="p-6.5 flex flex-col gap-2 bg-gradient-to-b from-white to-[#F8FAFC]">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                    <span>{vid.creator}</span>
                    <span>{vid.duration}</span>
                  </div>
                  
                  <h3 className="font-display font-extrabold text-sm text-[#0F172A] line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase">
                    {vid.title}
                  </h3>
                  
                  <p className="text-[11px] text-[#475569] leading-relaxed line-clamp-2">
                    {vid.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-16 text-center">
          <Link
            to="/cartoon"
            onClick={handleClickSound}
            onMouseEnter={handleHoverSound}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-[#1E293B] text-white text-xs font-bold tracking-widest uppercase hover:scale-105 active:scale-98 transition-all duration-300 shadow-md font-display"
          >
            ENTRER DANS LE MONDE DES CARTOONS →
          </Link>
        </div>
      </div>
    </section>
  );
}
