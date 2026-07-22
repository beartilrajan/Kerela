import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { POPULAR_DESTINATIONS } from '../data/tourismData';
import { Star, MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PopularSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.children;

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
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
      id="popular"
      ref={sectionRef}
      className="bg-white py-24 px-4 sm:px-8 md:px-16 text-stone-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Centered Title Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.25em]">
            Iconic Escapes
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-900">
            Popular Destinations
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Explore Kerala's most beloved sanctuary locations — from mist-crowned mountain crests to palm-lined tranquil lagoons.
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {POPULAR_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group relative rounded-2xl overflow-hidden h-[460px] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-stone-900 flex flex-col justify-between p-6 text-white"
            >
              {/* Background Image with Hover Scale */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Strong Black-to-Transparent Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-500" />

              {/* Top Card Controls */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-medium text-amber-300 uppercase tracking-wider">
                  {dest.category}
                </span>

                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-stone-950 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Card Content (Static Text) */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.district}, Kerala</span>
                  <span className="mx-1">•</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{dest.rating}</span>
                  </div>
                </div>

                {/* White Serif Destination Title at Bottom Left */}
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {dest.name}
                </h3>

                <p className="text-stone-300 text-xs font-light leading-relaxed line-clamp-2">
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
