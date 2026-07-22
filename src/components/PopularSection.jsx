import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { POPULAR_DESTINATIONS, DESTINATION_CATEGORIES } from '../data/tourismData';
import { Star, MapPin, ArrowUpRight, Filter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PopularSection({ onSelectDestination }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const filteredDestinations = activeCategory === 'All'
    ? POPULAR_DESTINATIONS
    : POPULAR_DESTINATIONS.filter((d) => d.category === activeCategory);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="popular"
      ref={sectionRef}
      className="bg-stone-900 py-24 px-4 sm:px-8 md:px-16 text-white overflow-hidden relative"
    >
      {/* Background Decorative Ambient Lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Centered Title Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
            Iconic Escapes
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Popular Destinations
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Explore Kerala's most beloved sanctuary locations — from mist-crowned mountain crests to palm-lined tranquil lagoons.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {DESTINATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-stone-950 border-amber-400 shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-stone-800/80 text-stone-300 border-white/10 hover:border-amber-400/50 hover:text-amber-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Responsive Grid with Fix-Corner-Glitch */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination && onSelectDestination(dest)}
              className="group relative rounded-3xl overflow-hidden h-[460px] shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-stone-950 flex flex-col justify-between p-6 text-white border border-white/10 hover:border-amber-400/40 fix-corner-glitch"
            >
              {/* Background Image with Hover Scale and Corner Glitch Fix */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 fix-corner-glitch"
              />

              {/* Black Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute inset-0 bg-stone-950/30 group-hover:bg-transparent transition-colors duration-500" />

              {/* Top Card Controls */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-amber-300 uppercase tracking-widest shadow-md">
                  {dest.category}
                </span>

                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-stone-950 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.district}, Kerala</span>
                  <span className="mx-1 text-stone-500">•</span>
                  <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-white font-semibold">{dest.rating}</span>
                    <span className="text-stone-400 text-[10px]">({dest.reviews})</span>
                  </div>
                </div>

                {/* Destination Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {dest.name}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                  {dest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
