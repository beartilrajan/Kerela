import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO_SLIDES } from '../data/tourismData';
import { Play, Pause, Volume2, VolumeX, ChevronRight, ChevronLeft, ArrowRight, MapPin, Thermometer } from 'lucide-react';

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  const glassBoxRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const bgImageRef = useRef(null);

  const activeSlide = HERO_SLIDES[currentIndex];

  // GSAP Initial Load Animation (Fade in text box from right)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        glassBoxRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
    });

    return () => ctx.revert();
  }, []);

  // GSAP Slide Switch Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background subtle scale effect
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.1, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
      );

      // Text stagger reveal
      gsap.fromTo(
        [titleRef.current, descRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, [currentIndex]);

  // Autoplay Timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 6000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-8 md:pb-12 px-4 sm:px-8 md:px-16 text-white select-none">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-stone-950">
        <img
          ref={bgImageRef}
          src={activeSlide.image}
          alt={activeSlide.title}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        {/* Layered Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-stone-950/80" />
      </div>

      {/* Top Ambient Badges */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between pt-6">
        <div className="flex items-center gap-3 bg-stone-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-stone-300 font-medium">{activeSlide.tagline}</span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-xs text-stone-300">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeSlide.location}</span>
          </div>
          {activeSlide.temp && (
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeSlide.temp}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-12">
        {/* Left Side Quote / Sub-Headline */}
        <div className="lg:col-span-6 space-y-4">
          <p className="text-amber-400 font-medium tracking-[0.3em] uppercase text-xs sm:text-sm">
            Discover God's Own Country
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] text-shadow-lg">
            Where Nature <br />
            <span className="italic font-normal text-amber-300">Finds Its Voice</span>
          </h1>
        </div>

        {/* Right Side Glassmorphism Text Box */}
        <div className="lg:col-span-6 flex justify-end">
          <div
            ref={glassBoxRef}
            className="glass-box p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl relative border border-white/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
                0{currentIndex + 1} / 0{HERO_SLIDES.length}
              </span>
              <span className="text-xs text-stone-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                {activeSlide.name}
              </span>
            </div>

            <h2
              ref={titleRef}
              className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight"
            >
              {activeSlide.title}
            </h2>

            <p
              ref={descRef}
              className="text-stone-300 text-sm sm:text-base leading-relaxed font-light"
            >
              {activeSlide.description}
            </p>

            <div className="pt-2">
              <a
                href="#popular"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/60 hover:border-amber-400 text-white hover:text-stone-950 hover:bg-amber-400 transition-all duration-300 text-xs sm:text-sm font-medium uppercase tracking-wider group"
              >
                More
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-10 max-w-7xl w-full mx-auto pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Horizontal Text-Based Slider Navigation */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar w-full md:w-auto">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-amber-400 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 sm:gap-8 px-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`text-sm sm:text-base font-serif tracking-wider transition-all duration-300 relative py-1.5 ${
                  currentIndex === idx
                    ? 'text-amber-300 font-bold scale-105'
                    : 'text-stone-400 hover:text-white font-normal'
                }`}
              >
                {slide.name}
                {currentIndex === idx && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full animate-fadeIn" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-amber-400 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Far Right Circular Media Controls */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-stone-950 border border-white/20 flex items-center justify-center text-white transition-all duration-300 shadow-lg"
            title={isPlaying ? 'Pause Slider' : 'Play Slider'}
            aria-label={isPlaying ? 'Pause Slider' : 'Play Slider'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-stone-950 border border-white/20 flex items-center justify-center text-white transition-all duration-300 shadow-lg"
            title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
            aria-label={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-bounce" />}
          </button>
        </div>
      </div>
    </section>
  );
}
