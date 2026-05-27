import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { handleHoverSound } from "../utils/sound";

export default function StatsBenefits() {
  const [stats, setStats] = useState({ videos: 0, categories: 0, engagement: 0 });

  useEffect(() => {
    // Simple incremental counts for the premium feel
    const interval = setInterval(() => {
      setStats((prev) => {
        const nextV = prev.videos >= 1000 ? 1000 : prev.videos + 25;
        const nextC = prev.categories >= 5 ? 5 : prev.categories + 1;
        const nextE = prev.engagement >= 99 ? 99 : prev.engagement + 2;
        
        if (nextV === 1000 && nextC === 5 && nextE === 99) {
          clearInterval(interval);
        }
        return { videos: nextV, categories: nextC, engagement: nextE };
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#050409] text-white relative overflow-hidden select-none border-t border-white/5">
      
      {/* Glow blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* BRAND STATEMENT & STAT TIMELINE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-fuchsia-400 uppercase animate-pulse">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              THE BRAND MANIFESTO
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
              LIMITLESS VISION.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg font-medium">
              AETHER Stream is built upon a single core objective: to synthesize luxury, gaming, cooking, cartoons, and humor into a high-performance interactive interface. We host real cinematic video files under responsive styling frameworks.
            </p>

          </div>

          {/* Stats Counters */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: stats.videos + "+", label: "CURATED VIDEO ROLLS", glow: "shadow-[0_0_40px_rgba(139,92,246,0.1)]" },
              { value: stats.categories, label: "CREATIVE CATEGORIES", glow: "shadow-[0_0_40px_rgba(6,182,212,0.1)]" },
              { value: stats.engagement + "%", label: "CREATOR ENGAGEMENT", glow: "shadow-[0_0_40px_rgba(163,230,53,0.1)]" }
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl glass-card text-center flex flex-col gap-2.5 items-center justify-center border border-white/5 bg-white/2 ${stat.glow}`}
              >
                <span className="font-display font-black text-3xl md:text-4xl bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-[8px] font-black text-slate-400 tracking-wider uppercase leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
