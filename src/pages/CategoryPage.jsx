import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Play, Eye, Heart, ArrowLeft,
  ChefHat, Laugh, Clapperboard, Gamepad2, Shirt 
} from "lucide-react";
import { getVideos } from "../data/videos";
import { handleHoverSound, handleClickSound } from "../utils/sound";
import { shuffleArray } from "../utils/shuffle";

const themeConfigs = {
  cooking: {
    name: "CUISINE",
    icon: ChefHat,
    desc: "Burgers, tagines, lasagnes, kebabs et currys — des recettes du monde entier préparées avec passion.",
    bg: "bg-[#FFF8EE] text-[#1C140A]",
    cardBg: "bg-white border-[#F0E5D8] text-[#1C140A]",
    cardTitle: "text-[#2C1D0F]",
    cardDesc: "text-[#6C5B4C]",
    headerBg: "from-amber-600/80 to-orange-700/80",
    accentText: "text-[#FF4500]",
    accentBg: "bg-[#FF4500] text-white",
    filterActive: "bg-[#2C1D0F] text-white",
    filterInactive: "bg-white border-[#F0E5D8] text-[#6C5B4C] hover:bg-[#FDF4E7]",
    cardHover: "hover:rotate-1 hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-500/20",
    playBg: "bg-[#FF4500] text-white",
  },
  comedy: {
    name: "COMÉDIE",
    icon: Laugh,
    desc: "Bureau des Plaintes, COVID, Emoji, Jean Michel Bruitage — les meilleurs sketches français qui font rire.",
    bg: "bg-[#0B0F19] text-white",
    cardBg: "bg-[#121824] border-white/5 text-slate-100",
    cardTitle: "text-slate-100",
    cardDesc: "text-slate-400",
    headerBg: "from-emerald-600/80 to-lime-700/80",
    accentText: "text-[#a3e635]",
    accentBg: "bg-[#a3e635] text-[#0B0F19]",
    filterActive: "bg-[#a3e635] text-[#0B0F19]",
    filterInactive: "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white",
    cardHover: "hover:scale-102 hover:border-[#a3e635]/30 hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]",
    playBg: "bg-[#a3e635] text-[#0B0F19]",
  },
  cartoon: {
    name: "CARTOON",
    icon: Clapperboard,
    desc: "Dragon Ball Z, Hey Arnold, Inspecteur Gadget, Pokémon — les dessins animés cultes de plusieurs générations.",
    bg: "bg-[#E0F2FE] text-[#1E3A8A]",
    cardBg: "bg-white border-white text-slate-700",
    cardTitle: "text-[#0F172A]",
    cardDesc: "text-[#475569]",
    headerBg: "from-indigo-600/80 to-blue-700/80",
    accentText: "text-indigo-600",
    accentBg: "bg-indigo-600 text-white",
    filterActive: "bg-indigo-600 text-white",
    filterInactive: "bg-white border-[#E2E8F0] text-slate-500 hover:bg-slate-50",
    cardHover: "hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl hover:border-indigo-500/20",
    playBg: "bg-indigo-500 text-white",
  },
  games: {
    name: "JEUX",
    icon: Gamepad2,
    desc: "Tetris, 2048, Pinball, Water Sort — des dizaines de jeux addictifs à jouer dans le navigateur.",
    bg: "bg-black text-white",
    cardBg: "bg-[#05050A] border-white/5 text-slate-300",
    cardTitle: "text-white",
    cardDesc: "text-slate-400",
    headerBg: "from-cyan-600/80 to-[#ff007f]/80",
    accentText: "text-[#00f0ff]",
    accentBg: "bg-[#00f0ff] text-black",
    filterActive: "bg-[#00f0ff] text-black",
    filterInactive: "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white",
    cardHover: "hover:scale-102 hover:border-[#00f0ff]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
    playBg: "bg-[#00f0ff] text-black",
  },
  fashion: {
    name: "MODE",
    icon: Shirt,
    desc: "Maquillage, coiffure, soins de la peau et ongles — des tutoriels beauté pour se sublimer au quotidien.",
    bg: "bg-[#FAF9F6] text-[#1A1A1A]",
    cardBg: "bg-white border-stone-200 text-stone-700",
    cardTitle: "text-stone-900",
    cardDesc: "text-stone-500",
    headerBg: "from-stone-700/80 to-stone-900/80",
    accentText: "text-[#C5A880]",
    accentBg: "bg-stone-950 text-white",
    filterActive: "bg-stone-950 text-white",
    filterInactive: "bg-white border-stone-200 text-stone-500 hover:bg-stone-50",
    cardHover: "hover:scale-102 hover:shadow-lg hover:border-[#C5A880]/30",
    playBg: "bg-stone-950 text-white",
  }
};

export default function CategoryPage() {
  const location = useLocation();
  const catId = location.pathname.split("/").pop(); // Extract e.g. "cooking" or "games"
  const theme = themeConfigs[catId] || themeConfigs.cooking;
  
  const [allVideos, setAllVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    const list = shuffleArray(getVideos().filter((v) => v.category === catId));
    setAllVideos(list);
    setFilteredVideos(list);
  }, [catId]);

  const Icon = theme.icon;

  return (
    <div className={`pt-24 pb-24 relative overflow-hidden select-none min-h-screen ${theme.bg}`}>
      
      {/* Dynamic Background elements based on Category */}
      {catId === "games" && (
        <div className="absolute inset-0 bg-[#00f0ff]/[0.005] bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      )}
      {catId === "cartoon" && (
        <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-white opacity-40">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
          </svg>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col gap-16">
        
        {/* Dynamic Category Page Header / Banner */}
        <div className={`p-8 md:p-14 rounded-3xl bg-gradient-to-tr ${theme.headerBg} text-white shadow-2xl relative overflow-hidden flex flex-col gap-5 border border-white/10`}>
          <div className="absolute top-0 right-10 w-96 h-96 bg-white/5 blur-[90px] rounded-full pointer-events-none" />
          
          <Link
            to="/categories"
            onClick={handleClickSound}
            onMouseEnter={handleHoverSound}
            className="flex items-center gap-2 text-xs font-bold bg-black/30 w-fit px-3.5 py-1.5 rounded-full hover:bg-black/50 transition-colors border border-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            RETOUR AU RÉPERTOIRE
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/10 w-fit">
              <Icon className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase bg-white text-black px-3 py-1 rounded-full font-display">
              CHAINE CATÉGORIE
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase leading-tight tracking-tight mt-2">
            {theme.name} REALM
          </h1>
          <p className="max-w-xl text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
            {theme.desc} Une playlist de vidéos en haute qualité.
          </p>
        </div>

        {/* Categories Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              className="group"
            >
              <Link
                to={`/video/${vid.id}`}
                onClick={handleClickSound}
                onMouseEnter={handleHoverSound}
                className={`block rounded-2xl overflow-hidden shadow-lg ${theme.cardBg} border transition-all duration-500 cursor-pointer ${theme.cardHover}`}
              >
                
                {/* Visual Thumbnail */}
                <div className="aspect-[16/10] relative overflow-hidden bg-black">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />

                  {/* Dynamic Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl ${theme.playBg}`}>
                      <Play className="w-5 h-5 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Video Duration */}
                  <span className="absolute bottom-4 right-4 z-20 text-[9px] font-bold font-mono tracking-wide px-2 py-0.5 rounded bg-black/70 text-slate-300">
                    {vid.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className={theme.accentText}>{vid.creator}</span>
                  </div>

                  <h3 className={`font-display font-black text-sm uppercase line-clamp-1 group-hover:${theme.accentText} transition-colors ${theme.cardTitle}`}>
                    {vid.title}
                  </h3>

                  <p className={`text-xs line-clamp-2 leading-relaxed ${theme.cardDesc}`}>
                    {vid.description}
                  </p>

                  <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 border-t border-black/5 dark:border-white/5 pt-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {vid.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10" />
                      {vid.likes} J'aime
                    </span>
                  </div>
                </div>

              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
