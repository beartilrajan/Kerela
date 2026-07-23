import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TRAVELER_REVIEWS } from '../data/tourismData';
import { Star, Quote, ShieldCheck, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TravelersSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 88%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="travelers"
      ref={sectionRef}
      className="bg-stone-900 py-24 px-4 sm:px-8 md:px-16 text-white border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
            Global Impressions
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Loved by Travelers
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Read heartfelt stories from explorers who surrendered their senses to Kerala's timeless beauty.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TRAVELER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-950/80 border border-white/10 hover:border-amber-400/40 p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-2 fix-corner-glitch relative"
            >
              <Quote className="w-10 h-10 text-amber-400/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-stone-300 text-sm italic font-light leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border border-amber-400/50 fix-corner-glitch"
                />
                <div>
                  <h4 className="font-serif text-base font-bold text-white">
                    {rev.name}
                  </h4>
                  <p className="text-stone-400 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {rev.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10 text-center">
          <div className="space-y-1">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">50K+</h3>
            <p className="text-stone-400 text-xs uppercase tracking-wider">Annual Explorers</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">4.9/5</h3>
            <p className="text-stone-400 text-xs uppercase tracking-wider">Satisfaction Rating</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">100%</h3>
            <p className="text-stone-400 text-xs uppercase tracking-wider">Certified Responsible Tourism</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">24/7</h3>
            <p className="text-stone-400 text-xs uppercase tracking-wider">Concierge Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
