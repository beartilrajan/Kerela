import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_EVENT } from '../data/tourismData';
import { Calendar, MapPin, ChevronRight, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhatsNewSection() {
  const sectionRef = useRef(null);
  const cardImageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image scale animation (1.1 -> 1.0) on scroll
      gsap.fromTo(
        cardImageRef.current,
        { scale: 1.2 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Content subtle entrance animation
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="whats-new"
      ref={sectionRef}
      className="bg-stone-50 py-24 px-4 sm:px-8 md:px-16 text-stone-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Centered Serif Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Featured Event 2026
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-900">
            What's New
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Stay updated with Kerala's premier international cultural celebrations, eco-adventures, and monsoon festivals.
          </p>
        </div>

        {/* Large Container-Width Featured Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-900 group h-[500px] sm:h-[580px]">
          {/* Outdoor Background Image */}
          <img
            ref={cardImageRef}
            src={FEATURED_EVENT.image}
            alt={FEATURED_EVENT.title}
            className="w-full h-full object-cover transition-transform duration-700"
          />

          {/* Dark Gradient Overlay (Bottom to Top) */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-transparent" />

          {/* Top Corner Badge */}
          <div className="absolute top-6 left-6 z-10">
            <span className="px-4 py-1.5 rounded-full bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest shadow-lg">
              {FEATURED_EVENT.badge}
            </span>
          </div>

          {/* Bottom Left Content Overlay */}
          <div
            ref={contentRef}
            className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 z-10 max-w-3xl space-y-4 text-white"
          >
            <div className="flex flex-wrap items-center gap-4 text-amber-300 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{FEATURED_EVENT.date}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{FEATURED_EVENT.location}</span>
              </div>
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {FEATURED_EVENT.title}
            </h3>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed line-clamp-2 max-w-2xl">
              {FEATURED_EVENT.description}
            </p>

            <div className="pt-2">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-400/20 group/btn">
                More
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
