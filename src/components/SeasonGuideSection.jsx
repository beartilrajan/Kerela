import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEASON_GUIDE } from '../data/tourismData';
import { Sun, CloudRain, Snowflake, CheckCircle2, Calendar, Thermometer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SeasonGuideSection() {
  const [activeSeasonId, setActiveSeasonId] = useState('monsoon');
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const activeSeason = SEASON_GUIDE.find((s) => s.id === activeSeasonId) || SEASON_GUIDE[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.97, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeSeasonId]);

  const getSeasonIcon = (id, isActive) => {
    const iconClass = `w-5 h-5 transition-colors duration-200 ${
      isActive ? 'text-stone-950 font-bold' : 'text-amber-400 group-hover:text-white'
    }`;
    switch (id) {
      case 'monsoon':
        return <CloudRain className={iconClass} />;
      case 'winter':
        return <Snowflake className={iconClass} />;
      case 'summer':
        return <Sun className={iconClass} />;
      default:
        return <Sun className={iconClass} />;
    }
  };

  return (
    <section
      id="seasons"
      ref={sectionRef}
      className="bg-stone-950 py-24 px-4 sm:px-8 md:px-16 text-white border-t border-white/5 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
            Year-Round Magic
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Kerala Seasonal Guide
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Discover the ideal season tailored to your travel desires — from monsoon rejuvenation to winter highland mist.
          </p>

          {/* Season Selector Tabs */}
          <div className="pt-6 flex flex-wrap justify-center gap-3">
            {SEASON_GUIDE.map((s) => {
              const isActive = activeSeasonId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSeasonId(s.id)}
                  className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 border-amber-400 shadow-xl shadow-amber-400/20 scale-105'
                      : 'bg-stone-900/80 text-stone-300 border-white/10 hover:border-amber-400/50 hover:text-white'
                  }`}
                >
                  {getSeasonIcon(s.id, isActive)}
                  <span>{s.season}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Display Card with Fix-Corner-Glitch */}
        <div
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900 rounded-3xl overflow-hidden border border-white/10 p-6 sm:p-10 shadow-2xl fix-corner-glitch"
        >
          {/* Left Column: Image with rounded clip */}
          <div className="lg:col-span-6 h-[340px] sm:h-[420px] rounded-2xl overflow-hidden relative fix-corner-glitch">
            <img
              src={activeSeason.image}
              alt={activeSeason.season}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 fix-corner-glitch"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-stone-200">
              <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/15">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">{activeSeason.months}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/15">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">{activeSeason.temp}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Activity Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-amber-400 font-semibold text-xs uppercase tracking-widest block">
              {activeSeason.tagline}
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {activeSeason.season}
            </h3>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              {activeSeason.description}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Recommended Activities:
              </h4>
              <ul className="space-y-2.5">
                {activeSeason.activities.map((act, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-200 text-xs sm:text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
