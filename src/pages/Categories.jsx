import { useState } from "react";
import { Link } from "react-router-dom";
import { ChefHat, Laugh, Clapperboard, Gamepad2, Shirt, ArrowUpRight } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";
import { shuffleArray } from "../utils/shuffle";

const CATEGORIES = [
  {
    id: "cooking",
    name: "COOKING",
    icon: ChefHat,
    desc: "Burgers, tagines, lasagnes, kebabs et currys — des recettes du monde entier préparées avec passion.",
    img: "https://api.ameora.fun/content/GalaxiWebsite/COOKING/i1.jpg",
    color: "from-amber-500/20 to-orange-600/20 text-amber-400 border-amber-500/10",
    accent: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    path: "/cooking",
  },
  {
    id: "comedy",
    name: "COMEDY",
    icon: Laugh,
    desc: "Bureau des Plaintes, COVID, Emoji, Jean Michel Bruitage — les meilleurs sketches français qui font pleurer de rire.",
    img: "https://api.ameora.fun/content/GalaxiWebsite/COMEDY-50/i1.jpg",
    color: "from-emerald-500/20 to-lime-600/20 text-lime-400 border-lime-500/10",
    accent: "hover:border-lime-500/30 hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]",
    path: "/comedy",
  },
  {
    id: "cartoon",
    name: "CARTOON",
    icon: Clapperboard,
    desc: "Dragon Ball Z, Hey Arnold, Inspecteur Gadget, Pokémon — les dessins animés cultes qui ont marqué des générations.",
    img: "https://api.ameora.fun/content/vas_cartoon/thumnbnail/DRAGONBALLZ/1.png",
    color: "from-indigo-500/20 to-blue-600/20 text-indigo-400 border-indigo-500/10",
    accent: "hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    path: "/cartoon",
  },
  {
    id: "games",
    name: "GAMES",
    icon: Gamepad2,
    desc: "Tetris, 2048, Pinball, Water Sort, Bottle Flip et bien plus — des dizaines de jeux addictifs à jouer dans le navigateur.",
    img: "https://cdn.timepass.games/images/b74fdc93-2184-4ece-805b-069e21ba4845.webp",
    color: "from-cyan-500/20 to-blue-600/20 text-cyan-400 border-cyan-500/10",
    accent: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    path: "/games",
  },
  {
    id: "fashion",
    name: "FASHION",
    icon: Shirt,
    desc: "Maquillage, coiffure, soins de la peau et ongles — des tutoriels beauté pour se sublimer au quotidien.",
    img: "https://api.ameora.fun/content/GalaxiWebsite/FASHION-24/i1.jpg",
    color: "from-rose-500/20 to-pink-600/20 text-rose-400 border-rose-500/10",
    accent: "hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    path: "/fashion",
  }
];

export default function Categories() {
  const [categories] = useState(() => shuffleArray(CATEGORIES));

  return (
    <div className="bg-[#050409] text-white pt-32 pb-24 relative overflow-hidden select-none min-h-screen">
      

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Editorial Heading */}
        <div className="flex flex-col items-center text-center mb-20 gap-3">
          <span className="text-[10px] text-slate-500 tracking-widest font-black uppercase">LE RÉPERTOIRE</span>
          <h1 className="font-display text-4xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">
            CATÉGORIES
          </h1>
          <p className="max-w-md text-xs md:text-sm text-slate-400 font-medium leading-relaxed mt-2">
            Explorez nos catégories. Chacune contient des vidéos et jeux en qualité optimale.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={cat.path}
                onClick={handleClickSound}
                onMouseEnter={handleHoverSound}
                className={`p-6 rounded-3xl glass-card bg-white/2 border border-white/5 flex flex-col gap-6 text-left group cursor-pointer transition-all duration-500 hover:-translate-y-2 ${cat.accent}`}
              >
                
                {/* Visual Image Banner */}
                <div className="aspect-[16/9] rounded-2xl overflow-hidden relative border border-white/5">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent z-10" />

                  {/* Icon label badge */}
                  <div className={`absolute top-4 left-4 p-2.5 rounded-xl border z-20 bg-black/60 backdrop-blur-md flex items-center justify-center ${cat.color}`}>
                    <Icon className="w-5 h-5 animate-float" />
                  </div>

                  {/* Top Right Arrow */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform translate-x-10 -translate-y-10 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 relative z-10 flex-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-black tracking-widest uppercase">
                    <span>VIDÉOS EN LIGNE</span>
                    <span>ACTIF</span>
                  </div>
                  
                  <h3 className="font-display font-black text-xl text-white group-hover:text-fuchsia-400 transition-colors uppercase mt-1">
                    {cat.name}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
