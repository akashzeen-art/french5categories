import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play } from "lucide-react";

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Increment loading bar smoothly over 5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 45); // ~4.5 seconds for complete bar

    const timeout = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 800); // Wait for transition fade out
    }, 5500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    setTimeout(onComplete, 600);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050409] select-none"
        >
          {/* Animated Glow Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

          {/* Morphing Glowing Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.15, 0.9, 1],
              rotate: [0, 90, 180, 360],
              borderRadius: ["40% 60% 60% 40% / 40% 40% 60% 60%", "60% 40% 50% 50% / 50% 60% 40% 50%", "40% 60% 60% 40% / 40% 40% 60% 60%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-72 h-72 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 blur-[80px]"
          />

          <motion.div
            animate={{
              scale: [1.2, 0.9, 1.1, 1.2],
              rotate: [360, 270, 90, 0],
              borderRadius: ["50% 50% 30% 70% / 50% 60% 40% 50%", "40% 60% 60% 40% / 40% 40% 60% 60%", "50% 50% 30% 70% / 50% 60% 40% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-80 h-80 bg-gradient-to-bl from-cyan-600/10 to-indigo-600/10 blur-[90px]"
          />

          {/* Main Content Logo Reveal */}
          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
            {/* Pulsing Cinematic Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 p-[1px] shadow-[0_0_50px_rgba(168,85,247,0.4)] mb-8"
            >
              <div className="flex items-center justify-center w-full h-full rounded-[15px] bg-[#090812]">
                <Sparkles className="w-9 h-9 text-fuchsia-400 animate-pulse-slow" />
              </div>
            </motion.div>

            {/* Glowing Brand Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="font-display text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent"
            >
              AETHER STREAM
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="mt-3 text-sm text-slate-400/90 tracking-widest font-display font-medium uppercase"
            >
              Expériences Cinématographiques Immersives
            </motion.p>

            {/* Sound Wave Animation */}
            <div className="flex justify-center items-center gap-1.5 h-10 mt-8 mb-4">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [0.3, 1.2, 0.4, 0.9, 0.3],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                  className="w-1 rounded-full bg-gradient-to-t from-indigo-500 to-fuchsia-500"
                  style={{
                    height: "32px",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </div>

            {/* Progress Container */}
            <div className="w-64 mt-4 relative">
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] tracking-wider text-slate-400 font-mono">
                <span>SYSTÈME EN LIGNE</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Skip Intro Floating Button */}
            <motion.button
              onClick={handleSkip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-12 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-wider text-white hover:bg-white/15 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              PASSER L'INTRO
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
