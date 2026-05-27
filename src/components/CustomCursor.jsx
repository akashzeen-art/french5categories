import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll("a, button, input, [role='button'], .hover-zoom");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Initial and periodic scan to bind custom elements (since SPA navigations change DOM)
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 1500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(interval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Cinematic ambient background cursor glow */}
      <div
        className="cursor-glow hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* High precision interactive cursor ring */}
      <div
        className={`fixed pointer-events-none z-[99999] hidden md:block -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/40 bg-purple-500/5 transition-all duration-300 ease-out ${
          isHovered ? "w-16 h-16 border-purple-400 bg-purple-500/10 scale-110" : "w-8 h-8"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* High precision cursor center dot */}
      <div
        className="fixed pointer-events-none z-[99999] hidden md:block -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-fuchsia-500 rounded-full transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${isHovered ? "scale(1.5)" : "scale(1)"}`,
        }}
      />
    </>
  );
}
