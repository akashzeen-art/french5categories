import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Play, Hexagon } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";
import { shuffleArray } from "../utils/shuffle";

const MORPH_CATEGORIES = ["games", "cooking", "fashion"];

export default function ShapeMorphing({ videos }) {
  const [activeShape, setActiveShape] = useState("rectangle");

  const morphVideos = useMemo(() => {
    const picks = MORPH_CATEGORIES.map((cat) =>
      videos.find((v) => v.category === cat)
    ).filter(Boolean);
    return shuffleArray(picks);
  }, [videos]);

  const shapes = [
    { id: "rectangle", name: "RECTANGLE MAGAZINE", class: "clip-rect" },
    { id: "circle", name: "CERCLE CINÉMATIQUE", class: "clip-circle" },
    { id: "triangle", name: "TRIANGLE AVANT-GARDE", class: "clip-triangle" },
    { id: "polygon", name: "POLYGONE CYBER", class: "clip-polygon" }
  ];

  return (
    <section className="py-24 bg-[#080710] text-white relative overflow-hidden select-none border-t border-white/5">
      
      {/* Decorative radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 gap-3">
          <span className="flex items-center gap-2 text-xs font-black tracking-widest text-fuchsia-400 uppercase">
            <Hexagon className="w-4 h-4 text-fuchsia-400" />
            ALCHIMIE GÉOMÉTRIQUE
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            PORTAIL MORPHIQUE
          </h2>
          <p className="max-w-md text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
            Cliquez pour transformer notre fenêtre vidéo en géométries futuristes.
          </p>
        </div>

        {/* Morphing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls - Left side */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="text-[10px] text-slate-500 tracking-widest font-black uppercase mb-2">MODULATEURS GÉOMÉTRIQUES</p>
            {shapes.map((s) => (
              <button
                key={s.id}
                onClick={() => { handleClickSound(); setActiveShape(s.id); }}
                onMouseEnter={handleHoverSound}
                className={`w-full text-left px-6 py-4.5 rounded-xl border font-display text-xs font-extrabold tracking-wider transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  activeShape === s.id
                    ? "bg-gradient-to-r from-indigo-600/10 to-fuchsia-600/10 border-fuchsia-500/50 text-white shadow-lg shadow-fuchsia-500/5"
                    : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
                }`}
              >
                <span>{s.name}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${activeShape === s.id ? "bg-fuchsia-400" : "bg-slate-600"}`} />
              </button>
            ))}
          </div>

          {/* Morphing Viewport - Center Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {morphVideos.map((vid) => {
              const activeClass = shapes.find(s => s.id === activeShape)?.class || "clip-rect";
              return (
                <div key={vid.id} className="flex flex-col gap-4 group">
                  
                  {/* Morph container */}
                  <Link
                    to={`/video/${vid.id}`}
                    onClick={handleClickSound}
                    onMouseEnter={handleHoverSound}
                    className={`block relative aspect-[4/5] bg-white/5 border border-white/5 p-1 rounded-2xl overflow-hidden cursor-pointer shadow-2xl`}
                  >
                    <div className={`w-full h-full relative overflow-hidden ${activeClass}`}>
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Interactive play trigger */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                          <Play className="w-4 h-4 fill-black ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Descriptions */}
                  <div className="px-1 text-center">
                    <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">{vid.category}</span>
                    <h4 className="font-display font-bold text-xs text-slate-200 uppercase line-clamp-1 mt-1 group-hover:text-white transition-colors">
                      {vid.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
