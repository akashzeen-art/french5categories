import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Menu, X, ChevronDown, 
  ChefHat, Laugh, Clapperboard, Gamepad2, Shirt, Info, Home
} from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";

const categories = [
  { name: "Cuisine", path: "/cooking", icon: ChefHat, color: "text-amber-400 border-amber-500/20 bg-amber-500/5", desc: "Recettes du monde entier" },
  { name: "Comédie", path: "/comedy", icon: Laugh, color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5", desc: "Sketches et fous rires" },
  { name: "Cartoon", path: "/cartoon", icon: Clapperboard, color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5", desc: "Dessins animés cultes" },
  { name: "Jeux", path: "/games", icon: Gamepad2, color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5", desc: "Jeux en ligne addictifs" },
  { name: "Mode", path: "/fashion", icon: Shirt, color: "text-rose-400 border-rose-500/20 bg-rose-500/5", desc: "Tutos beauté et coiffure" }
];

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          to="/"
          onClick={handleClickSound}
          onMouseEnter={handleHoverSound}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="flex items-center justify-center w-full h-full rounded-[11px] bg-background">
              <Sparkles className="w-5 h-5 text-fuchsia-400 group-hover:animate-pulse" />
            </div>
          </div>
          <span className="font-display font-black text-xl tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
            AETHER
          </span>
        </Link>

        {/* DESKTOP NAV ITEMS */}
        <nav className="hidden md:flex items-center gap-8 font-display text-sm font-semibold">
          <Link
            to="/"
            onClick={handleClickSound}
            onMouseEnter={handleHoverSound}
            className={`transition-colors hover:text-white ${location.pathname === "/" ? "text-fuchsia-400" : "text-slate-300"}`}
          >
            Accueil
          </Link>

          {/* CATEGORIES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => { handleHoverSound(); setDropdownOpen(true); }}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 transition-colors hover:text-white focus:outline-none ${
                ["/cooking", "/comedy", "/cartoon", "/games", "/fashion"].includes(location.pathname)
                  ? "text-fuchsia-400"
                  : "text-slate-300"
              }`}
            >
              Catégories
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* DROPDOWN MENU */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 rounded-2xl glass-card border border-white/10 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                  <div className="relative z-10 flex flex-col gap-1">
                    <p className="text-[10px] text-slate-400 tracking-widest font-bold uppercase mb-2 px-2">EXPLORER LES CATÉGORIES</p>
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.name}
                          to={cat.path}
                          onClick={() => { handleClickSound(); setDropdownOpen(false); }}
                          onMouseEnter={handleHoverSound}
                          className="flex items-center gap-3.5 p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all duration-300 group"
                        >
                          <div className={`p-2 rounded-lg border ${cat.color} group-hover:scale-105 transition-all duration-300`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-slate-200 group-hover:text-white font-bold transition-colors text-[13px]">{cat.name}</h4>
                            <p className="text-slate-400 text-[10px] leading-tight mt-0.5">{cat.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="border-t border-white/5 mt-2 pt-2 text-center">
                      <Link
                        to="/categories"
                        className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition-colors font-bold inline-block"
                        onClick={handleClickSound}
                      >
                        Voir toutes les catégories →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* no Contact link */}
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          {/* MOBILE BURGER MENU */}
          <button
            onClick={() => { handleClickSound(); setMobileMenuOpen(!mobileMenuOpen); }}
            onMouseEnter={handleHoverSound}
            className="p-2 md:hidden rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 text-slate-300 hover:text-white transition-all focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden glass-nav border-t border-white/5 mt-3 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-6 font-display">
              {/* Main links */}
              <div className="flex flex-col gap-4 text-sm font-semibold">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-slate-300 hover:text-white py-1.5 transition-colors"
                >
                  <Home className="w-4 h-4 text-slate-400" />
                  Accueil
                </Link>
                <div className="border-t border-white/5 my-2"></div>
                
                {/* Categories */}
                <div>
                  <p className="text-[10px] text-slate-400 tracking-widest font-bold uppercase mb-3">CATÉGORIES</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.name}
                          to={cat.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className={`p-1.5 rounded-lg border ${cat.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[12px] font-bold text-slate-200">{cat.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
