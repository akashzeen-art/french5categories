import { useState } from "react";
import { Sparkles, MessageSquare, Award, Clock, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";

const team = [
  { name: "Celine Roche", role: "DIRECTRICE MODE", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { name: "Marcus Thorne", role: "COORDINATEUR JEUX", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { name: "Hiroshi Sato", role: "CHEF CULINAIRE", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
];

export default function About() {
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    handleClickSound();
    if (feedbackName.trim() && feedbackText.trim()) {
      setFeedbackSubmitted(true);
      setFeedbackName("");
      setFeedbackText("");
    }
  };

  return (
    <div className="bg-[#050409] text-white pt-32 pb-24 relative overflow-hidden select-none min-h-screen">
      
      {/* Decorative vertical grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10 flex flex-col gap-24">
        
        {/* Intro Manifesto */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-fuchsia-400 uppercase animate-pulse">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            L'ART DU STREAMING
          </div>
          <h1 className="font-display text-4xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">
            MISSION AETHER
          </h1>
          <p className="max-w-xl text-sm md:text-base text-slate-400 font-medium leading-relaxed mt-4">
            Nous sommes un laboratoire de design haute performance, redéfinissant la consommation visuelle numérique. En fusionnant les structures cinématographiques avec les magazines modernes, AETHER apporte un divertissement premium entre vos mains.
          </p>
        </div>

        {/* Interactive History Timeline */}
        <div className="flex flex-col gap-12">
          <h3 className="font-display font-black text-xl text-center uppercase tracking-widest">FEUILLE DE ROUTE</h3>
          <div className="flex flex-col gap-8">
            {[
              { year: "2024", title: "L'ARCHITECTURE DÉFINIE", desc: "Notre équipe a posé les bases des styles, paramètres de design et moteurs de lecture vidéo directe." },
              { year: "2025", title: "LES 5 DOMAINES CRÉATIFS", desc: "Cuisine, humour, cartoon, jeux et mode ont été modularés en grilles visuelles à fort contraste." },
              { year: "2026", title: "LA COUCHE D'INTERACTION FLUIDE", desc: "Intégration de déclencheurs audio, curseurs personnalisés et sliders tactiles pour une immersion totale." }
            ].map((step, idx) => (
              <div
                key={idx}
                onMouseEnter={handleHoverSound}
                className="p-8 rounded-2xl glass-card bg-white/2 border border-white/5 flex flex-col md:flex-row gap-6 items-start hover:border-purple-500/20 transition-all duration-300"
              >
                <span className="font-display font-black text-3xl md:text-4xl text-fuchsia-400 md:w-32 flex-shrink-0">
                  {step.year}
                </span>
                <div className="flex flex-col gap-2 text-left">
                  <h4 className="font-display font-bold text-sm text-slate-100 uppercase">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="flex flex-col gap-12">
          <h3 className="font-display font-black text-xl text-center uppercase tracking-widest">NOTRE ÉQUIPE</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((cur) => (
              <div
                key={cur.name}
                onMouseEnter={handleHoverSound}
                className="group p-5 rounded-2xl glass-card bg-[#121118] border border-white/5 flex flex-col gap-4 text-center cursor-pointer hover:border-fuchsia-500/20 transition-all duration-300"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={cur.img} alt={cur.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h4 className="font-display font-black text-sm text-white uppercase">{cur.name}</h4>
                  <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase">{cur.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact/Feedback Panel */}
        <div className="p-8 md:p-12 rounded-3xl glass-card bg-gradient-to-tr from-purple-950/20 to-cyan-950/20 border border-white/5 max-w-2xl mx-auto w-full text-center relative overflow-hidden">
          <h3 className="font-display font-black text-2xl uppercase tracking-widest mb-2">BOITE À RETOURS</h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto mb-8 font-medium">
            Des questions ou suggestions ? Envoyez-nous vos pensées directement !
          </p>

          {!feedbackSubmitted ? (
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4 text-left max-w-md mx-auto">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-400 tracking-wider uppercase">Votre Nom</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Marie Dupont"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500/50 backdrop-blur-md"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-400 tracking-wider uppercase">Message / Retour</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Partagez vos impressions sur la plateforme AETHER..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500/50 backdrop-blur-md resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={handleHoverSound}
                className="mt-2 w-full py-4 rounded-full bg-white hover:bg-fuchsia-500 hover:text-white text-black font-black text-xs tracking-widest uppercase hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                ENVOYER MON AVIS
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4 py-10">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
              <div className="flex flex-col gap-1.5">
                <h4 className="font-display font-black text-sm text-white uppercase">AVIS ENVOYÉ !</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Merci pour votre contribution. Notre équipe examinera votre message !
                </p>
              </div>
              <button
                onClick={() => setFeedbackSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold hover:bg-white/10 transition-all cursor-pointer"
              >
                Envoyer une autre réponse
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
