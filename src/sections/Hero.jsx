import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Flame, Star, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";
import { shuffleArray } from "../utils/shuffle";

const HERO_TEASERS = [
  {
    id: "cartoon-1",
    title: "DRAGON BALL Z SAGA BOO",
    category: "CARTOON",
    tagline: "Mega compilation — the complete Boo saga in one epic watch.",
    banner: "https://api.ameora.fun/content/vas_cartoon/thumnbnail/DRAGONBALLZ/1.png",
    video: "https://api.ameora.fun/content/vas_cartoon/video/dragonballZ/DragonBallZ-M%C3%A9gaCompilation-R%C3%A9sum%C3%A9CompletSagaBoo.mp4",
    accent: "from-indigo-500 to-blue-600",
    glow: "shadow-[0_0_50px_rgba(99,102,241,0.3)]",
  },
  {
    id: "comedy-1",
    title: "LE RUNNING — CE QUE TU PENSES",
    category: "COMEDY",
    tagline: "Ce que tu penses vraiment quand tu fais du running en public.",
    banner: "https://api.ameora.fun/content/GalaxiWebsite/COMEDY-50/i1.jpg",
    video: "https://api.ameora.fun/content/GalaxiWebsite/COMEDY-50/v1.mp4",
    accent: "from-lime-500 to-emerald-600",
    glow: "shadow-[0_0_50px_rgba(163,230,53,0.3)]",
  },
  {
    id: "cooking-1",
    title: "BASQUE AUX OEUFS",
    category: "COOKING",
    tagline: "Un basque moelleux aux oeufs, cuit à la perfection avec une croûte dorée.",
    banner: "https://api.ameora.fun/content/GalaxiWebsite/COOKING/i1.jpg",
    video: "https://api.ameora.fun/content/GalaxiWebsite/COOKING/v1.mp4",
    accent: "from-amber-500 to-orange-600",
    glow: "shadow-[0_0_50px_rgba(245,158,11,0.3)]",
  }
];

export default function Hero() {
  const [heroTeasers] = useState(() => shuffleArray(HERO_TEASERS));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroTeasers.length);
    }, 8000); // 8 seconds per slide
    return () => clearInterval(timer);
  }, [heroTeasers.length]);

  const slide = heroTeasers[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black select-none flex items-center">
      
      {/* BACKGROUND TEASER MEDIA (IMAGE OR SCALING VIDEO) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Subtle slow infinite panning for background card */}
          <div className="absolute inset-0 bg-[#050409]/40 z-10 pointer-events-none" />
          
          {/* Ambient overlay gradients for movie feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/25 to-transparent z-10 pointer-events-none" />

          {/* Fallback Preview Image */}
          <img
            src={slide.banner}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Autoplaying direct video layer (loads in background, plays smoothly) */}
          <video
            src={slide.video}
            autoPlay
            loop
            muted={videoMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none mix-blend-screen opacity-55"
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating Animated Sparks/Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.4 + 0.1, 
              x: Math.random() * 1200, 
              y: Math.random() * 800 + 200, 
              scale: Math.random() * 0.8 + 0.4 
            }}
            animate={{
              y: [null, Math.random() * -100 - 150],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 blur-xs"
          />
        ))}
      </div>

      {/* HERO HERO TITLE & EXPLORER PANEL */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 relative z-20 mt-16 md:mt-24">
        <div className="max-w-2xl flex flex-col gap-6 text-left">
          
          {/* Animated Category Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide + "-badge"}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 w-fit px-4.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] font-black tracking-widest text-slate-100 uppercase"
            >
              <Flame className="w-3.5 h-3.5 text-fuchsia-400 fill-fuchsia-400/20" />
              <span>TENDANCE SUR AETHER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </motion.div>
          </AnimatePresence>

          {/* Slid-in Titles */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide + "-text"}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <h2 className="font-display text-5xl md:text-7xl font-black leading-tight tracking-tight text-white uppercase">
                {slide.title}
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed font-medium tracking-wide">
                {slide.tagline}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Interactive buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            {/* Watch Now Button */}
            <Link
              to={`/video/${slide.id}`}
              onClick={handleClickSound}
              onMouseEnter={handleHoverSound}
              className={`flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r ${slide.accent} text-white font-bold tracking-wide hover:scale-105 active:scale-98 transition-all duration-300 pointer-events-auto cursor-pointer ${slide.glow}`}
            >
              <Play className="w-4 h-4 fill-white" />
              REGARDER MAINTENANT
            </Link>

            {/* Explore Categories Button */}
            <Link
              to="/categories"
              onClick={handleClickSound}
              onMouseEnter={handleHoverSound}
              className="flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold tracking-wide hover:bg-white/15 hover:border-white/20 hover:scale-105 active:scale-98 transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              EXPLORER TOUT
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* FOOTER MEDIA AUDIO TOGGLE */}
      <div className="absolute bottom-10 right-8 md:right-12 z-20 flex items-center gap-4">
        <button
          onClick={() => { handleClickSound(); setVideoMuted(!videoMuted); }}
          onMouseEnter={handleHoverSound}
          className="p-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/15 hover:border-white/20 transition-all cursor-pointer pointer-events-auto shadow-lg"
          title={videoMuted ? "Unmute cinematic background video" : "Mute cinematic background video"}
        >
          {videoMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-fuchsia-400 animate-pulse" />}
        </button>
      </div>

      {/* AUTOMATIC CAROUSEL PROGRESS INDICATORS */}
      <div className="absolute bottom-10 left-6 md:left-8 z-20 flex items-center gap-3">
        {heroTeasers.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => { handleClickSound(); setCurrentSlide(idx); }}
            onMouseEnter={handleHoverSound}
            className="flex flex-col gap-1 items-start text-left group"
          >
            {/* Rotating indicator bar */}
            <div className="h-[3px] w-12 bg-white/15 rounded-full overflow-hidden relative">
              {currentSlide === idx && (
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "0%" }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="absolute inset-0 bg-white"
                />
              )}
            </div>
            <span
              className={`text-[9px] font-black tracking-widest uppercase transition-colors duration-300 ${
                currentSlide === idx ? "text-white" : "text-slate-500 group-hover:text-slate-300"
              }`}
            >
              0{idx + 1}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
