import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Compass, Sparkles } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = 'hidden';

    // Show loading screen for 1.4s then smoothly exit
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = 'auto';
            if (onComplete) onComplete();
          },
        });

        tl.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
        }).to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
          },
          '-=0.1'
        );
      }, containerRef);

      return () => ctx.revert();
    }, 1400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-stone-950 text-white flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Ambient Pulsing Glow Orbs */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Centered Content Box */}
      <div ref={contentRef} className="relative z-10 text-center space-y-6 px-6 max-w-md w-full">
        {/* Animated Compass Icon in Glowing Orb */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping opacity-30" />
          <div className="w-20 h-20 rounded-full bg-stone-900/90 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-2xl shadow-amber-400/20">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>
        </div>

        {/* Brand Headline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3" />
            Curating Sanctuary
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-widest text-white">
            KERALA
          </h1>

          <p className="text-[11px] tracking-[0.3em] text-amber-400 font-semibold uppercase">
            God's Own Country
          </p>
        </div>
      </div>
    </div>
  );
}
