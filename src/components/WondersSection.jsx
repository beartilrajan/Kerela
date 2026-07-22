import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STUNNING_WONDERS } from '../data/tourismData';
import { Compass, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WondersSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.children;

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="wonders"
      ref={sectionRef}
      className="bg-stone-50 py-24 px-4 sm:px-8 md:px-16 text-stone-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Centered Serif Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.25em]">
            Timeless Treasures
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-900">
            Stunning Wonders
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Indulge your senses in ancient sacred architecture, mist-kissed high altitude tea estates, and authentic Ayurvedic wellness retreats.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {STUNNING_WONDERS.map((wonder) => (
            <div
              key={wonder.id}
              className="group relative rounded-2xl overflow-hidden h-[480px] shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-stone-900 flex flex-col justify-between p-8 text-white border border-stone-200/50"
            >
              {/* Card Image */}
              <img
                src={wonder.image}
                alt={wonder.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Dark Gradient Overlay (Bottom to Top) */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500" />

              {/* Top Tag */}
              <div className="relative z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 uppercase tracking-widest">
                  {wonder.tag}
                </span>
              </div>

              {/* Bottom Card Content Over Gradient */}
              <div className="relative z-10 space-y-3">
                <span className="text-amber-400 text-xs font-medium tracking-wide block">
                  {wonder.subtitle}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                  {wonder.title}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                  {wonder.description}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform">
                    Explore Wonder &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
