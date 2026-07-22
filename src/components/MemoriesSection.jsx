import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEMORIES_CAROUSEL } from '../data/tourismData';
import { ChevronLeft, ChevronRight, Sparkles, Clock, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MemoriesSection({ onSelectExperience }) {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column reveal
      gsap.fromTo(
        leftColRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Right carousel cards staggered reveal
      if (carouselRef.current) {
        const cards = carouselRef.current.children;
        gsap.fromTo(
          cards,
          { x: 80, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative bg-stone-950 text-white py-28 overflow-hidden select-none border-t border-white/5"
    >
      {/* Dark Moody Blurred Landscape Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80"
          alt="Moody Kerala Landscape"
          className="w-full h-full object-cover blur-lg opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Heading */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Unforgettable Journeys
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Memories for a <br />
              <span className="italic font-normal text-amber-300">Lifetime</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Immerse yourself in authentic experiences that linger in your heart long after your journey ends. From peaceful coir weaving along canal villages to twilight Kathakali stories and wilderness jungle safaris.
            </p>

            <div className="pt-4 flex items-center gap-4">
              {/* Circular Dark Buttons with Gold Chevrons */}
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full bg-stone-900/80 hover:bg-amber-400 text-stone-300 hover:text-stone-950 border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110"
                aria-label="Scroll Carousel Left"
              >
                <ChevronLeft className="w-6 h-6 text-amber-400 hover:text-stone-950" />
              </button>

              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full bg-stone-900/80 hover:bg-amber-400 text-stone-300 hover:text-stone-950 border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110"
                aria-label="Scroll Carousel Right"
              >
                <ChevronRight className="w-6 h-6 text-amber-400 hover:text-stone-950" />
              </button>
            </div>
          </div>

          {/* Right Column: Horizontally Bleeding Card Carousel with Corner Glitch Fix */}
          <div className="lg:col-span-7 overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 pr-12 -mr-4 sm:-mr-8"
            >
              {MEMORIES_CAROUSEL.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectExperience && onSelectExperience(item)}
                  className="group relative w-[280px] sm:w-[320px] h-[440px] shrink-0 rounded-3xl overflow-hidden shadow-2xl bg-stone-900 border border-white/10 flex flex-col justify-between p-6 cursor-pointer fix-corner-glitch hover:border-amber-400/40 transition-all duration-500"
                >
                  {/* Card Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 fix-corner-glitch"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-black/30" />

                  {/* Top Tag */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-amber-300">
                      {item.subtitle}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-200 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {/* Bottom Text Details */}
                  <div className="relative z-10 space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-stone-300 text-xs font-light leading-relaxed line-clamp-3">
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
