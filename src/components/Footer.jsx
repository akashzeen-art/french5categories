import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050409] pt-16 pb-8 overflow-hidden select-none">

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">

          {/* Left: Logo + desc */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link
              to="/"
              onClick={handleClickSound}
              onMouseEnter={handleHoverSound}
              className="flex items-center gap-2.5 group w-fit"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <div className="flex items-center justify-center w-full h-full rounded-[11px] bg-[#050409]">
                  <Sparkles className="w-5 h-5 text-fuchsia-400" />
                </div>
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white">AETHER</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Une plateforme de divertissement multi-catégories — cuisine, comédie, cartoons, jeux & mode.
            </p>
          </div>

          {/* Right: Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-extrabold text-xs tracking-widest text-white uppercase">Catégories</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400 font-medium">
              {[
                { label: "Cuisine Maison", path: "/cooking" },
                { label: "Sketches & Fous Rires", path: "/comedy" },
                { label: "Univers Cartoon", path: "/cartoon" },
                { label: "Zone de Jeux", path: "/games" },
                { label: "Tutos Beauté", path: "/fashion" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    onClick={handleClickSound}
                    onMouseEnter={handleHoverSound}
                    className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-center">
          <span className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} AETHER Stream. Tous droits réservés.
          </span>
        </div>

      </div>
    </footer>
  );
}
