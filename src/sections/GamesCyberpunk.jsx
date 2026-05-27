import { Link } from "react-router-dom";
import { Gamepad2, Play, Flame, ShieldAlert } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";

export default function GamesCyberpunk({ videos }) {
  // Extract 6 games videos
  const gameVideos = videos.filter((v) => v.category === "games").slice(0, 6);

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden select-none">
      
      {/* Cybersecurity scan grid line */}
      <div className="absolute inset-0 bg-[#00f0ff]/[0.01] bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      {/* Cyber ambient glow blobs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#ff007f]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#00f0ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00f0ff] uppercase">
              <Gamepad2 className="w-4 h-4 text-[#00f0ff]" />
              JEUX EN LIGNE
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tight uppercase glitch-title">
              GAME ZONE
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 font-medium leading-relaxed">
            Tetris, 2048, Pinball, Water Sort, Bottle Flip et bien plus — des dizaines de jeux addictifs à jouer directement dans le navigateur.
          </p>
        </div>

        {/* Cyberpunk RGB Border Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gameVideos.map((vid, idx) => (
            <div
              key={vid.id}
              className="rgb-border-container group"
            >
              <Link
                to={`/video/${vid.id}`}
                onClick={handleClickSound}
                onMouseEnter={handleHoverSound}
                className="block rgb-border-content cursor-pointer p-4 overflow-hidden relative"
              >
                
                {/* Image Wrap */}
                <div className="aspect-[16/10] relative rounded-xl overflow-hidden mb-5">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Cyber Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />

                  {/* Play circle */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#00f0ff] text-black flex items-center justify-center shadow-xl">
                      <Play className="w-5 h-5 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Gamer Pro badge */}
                  <span className="absolute top-4 left-4 z-20 text-[8px] font-black tracking-widest uppercase bg-black/70 border border-[#00f0ff]/30 text-[#00f0ff] px-2.5 py-1 rounded">
                    EN DIRECT
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 relative z-10">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <span className="text-[#ff007f]">{vid.creator}</span>
                    <span>{vid.duration}</span>
                  </div>

                  <h3 className="font-display font-black text-sm text-white group-hover:text-[#00f0ff] transition-colors uppercase line-clamp-1">
                    {vid.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>

                  <div className="flex items-center gap-4 text-[9px] font-bold text-slate-500 border-t border-white/5 pt-4 mt-2 uppercase tracking-wider">
                    <span>{vid.views}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-16 text-center">
          <Link
            to="/games"
            onClick={handleClickSound}
            onMouseEnter={handleHoverSound}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff007f] hover:scale-105 active:scale-98 transition-all duration-300 shadow-[0_0_35px_rgba(0,240,255,0.25)] text-white text-xs font-bold tracking-widest uppercase font-display"
          >
            JOUER MAINTENANT →
          </Link>
        </div>
      </div>
    </section>
  );
}
