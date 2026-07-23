import React, { useState, useEffect } from 'react';

export default function SlantedBackgroundLine() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      // Subtle parallax offset relative to window center
      const x = (e.clientX - window.innerWidth / 2) * 0.03;
      const y = (e.clientY - window.innerHeight / 2) * 0.03;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Parallax translation based on mouse scroll and movement
  const translateY = scrollY * 0.42 + mousePos.y;
  const translateX = scrollY * 0.12 + mousePos.x;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[1] overflow-hidden select-none">
      {/* Primary Slanted Glowing Line Group */}
      <div
        className="absolute top-[-20%] right-[12%] w-[3px] h-[160vh] transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(-22deg)`,
          background: 'linear-gradient(to bottom, transparent, rgba(251, 191, 36, 0.45) 20%, rgba(251, 191, 36, 0.7) 50%, rgba(251, 191, 36, 0.45) 80%, transparent)',
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)',
        }}
      >
        {/* Parallel Secondary Accent Line */}
        <div
          className="absolute -left-6 top-0 w-[1px] h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(251, 191, 36, 0.2) 30%, rgba(255, 255, 255, 0.3) 60%, transparent)',
          }}
        />

        {/* Decorative Diamond Accent Ticks & Nodes along the line */}
        <div className="absolute top-[25%] -left-[5px] w-3 h-3 bg-amber-400 border border-white/60 rotate-45 shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse" />
        <div className="absolute top-[50%] -left-[6px] w-3.5 h-3.5 rounded-full bg-amber-300 border border-amber-500 shadow-[0_0_15px_rgba(251,191,36,1)]" />
        <div className="absolute top-[75%] -left-[5px] w-3 h-3 bg-amber-400 border border-white/60 rotate-45 shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse" />

        {/* Floating Glowing Aura Orb along the slanted axis */}
        <div className="absolute top-[40%] -left-32 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Subtle Counter-Slanted Secondary Fine Grid Line */}
      <div
        className="absolute top-[-10%] left-[8%] w-[1px] h-[150vh] transition-transform duration-100 ease-out will-change-transform opacity-30"
        style={{
          transform: `translate3d(${-translateX * 0.5}px, ${translateY * 0.3}px, 0) rotate(15deg)`,
          background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.25) 40%, rgba(251, 191, 36, 0.3) 70%, transparent)',
        }}
      />
    </div>
  );
}
