import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO_SLIDES } from '../data/tourismData';
import { Play, Pause, Volume2, VolumeX, ChevronRight, ChevronLeft, MapPin, Thermometer, Sparkles, Compass } from 'lucide-react';

export default function HeroSection({ onOpenBooking }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  const heroRef = useRef(null);
  const glassBoxRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const badgeRef = useRef(null);
  const audioRef = useRef(null);
  const pillsBarRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const activeSlide = HERO_SLIDES[currentIndex];
  const DURATION = 7000; // 7 seconds per slide

  // Scroll Parallax Effect for Background Image
  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.3);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio playback handler for Kerala theme music (on by default with interaction fallback)
  useEffect(() => {
    if (!audioRef.current) return;

    if (!isMuted) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts unmuted autoplay, trigger playback on first user gesture
          const startOnInteraction = () => {
            if (audioRef.current && !isMuted) {
              audioRef.current.play();
            }
            window.removeEventListener('click', startOnInteraction);
            window.removeEventListener('touchstart', startOnInteraction);
            window.removeEventListener('scroll', startOnInteraction);
            window.removeEventListener('keydown', startOnInteraction);
          };
          window.addEventListener('click', startOnInteraction);
          window.addEventListener('touchstart', startOnInteraction);
          window.addEventListener('scroll', startOnInteraction);
          window.addEventListener('keydown', startOnInteraction);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isMuted]);

  // Handle slide change with dual layer tracking for smooth crossfade
  const changeSlide = (newIndex) => {
    if (newIndex === currentIndex) return;
    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);
    setProgress(0);
  };

  const handleNext = () => {
    if (nextBtnRef.current) {
      gsap.fromTo(nextBtnRef.current, { x: 0 }, { x: 5, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.out' });
    }
    changeSlide((currentIndex + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    if (prevBtnRef.current) {
      gsap.fromTo(prevBtnRef.current, { x: 0 }, { x: -5, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.out' });
    }
    changeSlide((currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // GSAP Entrance & Text Reveal Animation on Slide Switch
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text & Badge stagger reveal - crisp timing
      gsap.fromTo(
        [badgeRef.current, titleRef.current, descRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      );

      // Glass box floating pop
      gsap.fromTo(
        glassBoxRef.current,
        { scale: 0.97, opacity: 0.85 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }
      );

      // Slide Switcher Pills entrance & active pill pop
      if (pillsBarRef.current) {
        const activePill = pillsBarRef.current.children[currentIndex];
        if (activePill) {
          gsap.fromTo(
            activePill,
            { scale: 0.92 },
            { scale: 1.06, duration: 0.35, ease: 'back.out(2)' }
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, [currentIndex]);

  // Autoplay Timer & Smooth Progress Bar Animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = 50; // update progress every 50ms
    const step = (interval / DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  // 3D Parallax Tilt Effect on Glass Box on Mouse Move
  const handleMouseMove = (e) => {
    if (!glassBoxRef.current) return;
    const rect = glassBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(glassBoxRef.current, {
      rotateY: x * 0.03,
      rotateX: -y * 0.03,
      duration: 0.5,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    if (!glassBoxRef.current) return;
    gsap.to(glassBoxRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-8 md:pb-12 px-4 sm:px-8 md:px-16 text-white select-none fix-corner-glitch"
    >
      {/* Dual Layer Crossfade Background Images with Scroll Parallax */}
      <div
        className="absolute inset-0 z-0 bg-stone-950 will-change-transform"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out fix-corner-glitch ${
                currentIndex === idx ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Layered Luxury Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/80" />
          </div>
        ))}

        {/* Ambient Floating Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      </div>

      {/* Top Ambient Badges & Weather Bar */}
      <div className="relative z-20 max-w-7xl w-full mx-auto flex items-center justify-between pt-4 sm:pt-6">
        <div
          ref={badgeRef}
          className="flex items-center gap-3 bg-stone-900/70 backdrop-blur-xl px-4 py-2 rounded-full border border-amber-400/30 shadow-xl"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-amber-300 font-semibold text-xs tracking-widest uppercase">
            {activeSlide.tagline}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-xs text-stone-300 bg-stone-900/60 backdrop-blur-xl px-5 py-2 rounded-full border border-white/10 shadow-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="font-medium text-white">{activeSlide.location}</span>
          </div>
          {activeSlide.temp && (
            <div className="flex items-center gap-2 border-l border-white/20 pl-4">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span className="font-medium text-white">{activeSlide.temp}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-10 lg:py-16">
        {/* Left Side Headline */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            God's Own Country
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] text-shadow-lg">
            Where Nature <br />
            <span className="italic font-normal text-amber-300 text-glow">Finds Its Voice</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-light max-w-lg leading-relaxed">
            Experience timeless lagoons, mist-crowned mountain peaks, and ancient wellness traditions crafted for mindful soul seekers.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/25 hover:scale-105 group"
            >
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              Explore Destinations
            </button>
          </div>
        </div>

        {/* Right Side Glassmorphism Detail Card with 3D Parallax Effect */}
        <div className="lg:col-span-6 flex justify-end perspective-1000">
          <div
            ref={glassBoxRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-[#141414]/75 backdrop-blur-md p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl relative border border-white/20 fix-corner-glitch transition-all duration-300"
          >
            {/* Ambient Shimmer */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                0{currentIndex + 1} / 0{HERO_SLIDES.length}
              </span>
              <span className="text-xs text-stone-200 bg-white/10 px-3.5 py-1 rounded-full border border-white/15 font-medium backdrop-blur-md">
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
              className="text-stone-300 text-sm leading-relaxed font-light"
            >
              {activeSlide.description}
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-stone-400">Location: <strong className="text-white font-medium">{activeSlide.location}</strong></span>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-400 text-xs font-semibold uppercase tracking-wider group"
              >
                Next Experience
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-20 max-w-7xl w-full mx-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Horizontal Slide Switcher Pills */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar w-full md:w-auto">
          <button
            ref={prevBtnRef}
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-stone-900/60 hover:bg-amber-400 text-stone-300 border border-white/10 transition-colors shadow-md group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 group-hover:text-stone-950 transition-colors" />
          </button>

          <div ref={pillsBarRef} className="flex items-center gap-3 sm:gap-6 px-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => changeSlide(idx)}
                className={`text-sm sm:text-base font-serif tracking-wider transition-all duration-300 relative py-1.5 px-4 rounded-full ${
                  currentIndex === idx
                    ? 'text-amber-300 font-bold bg-amber-500/20 border border-amber-400/40 shadow-lg shadow-amber-400/10'
                    : 'text-stone-400 hover:text-white font-normal hover:bg-white/5'
                }`}
              >
                {slide.name}
              </button>
            ))}
          </div>

          <button
            ref={nextBtnRef}
            onClick={handleNext}
            className="p-2.5 rounded-full bg-stone-900/60 hover:bg-amber-400 text-stone-300 border border-white/10 transition-colors shadow-md group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 group-hover:text-stone-950 transition-colors" />
          </button>
        </div>

        {/* Far Right Circular Media Controls */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-stone-900/70 hover:bg-amber-400 border border-white/20 flex items-center justify-center text-white transition-all duration-300 shadow-xl group"
            title={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
            aria-label={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current group-hover:text-stone-950" /> : <Play className="w-4 h-4 fill-current ml-0.5 group-hover:text-stone-950" />}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-stone-900/70 hover:bg-amber-400 border border-white/20 flex items-center justify-center text-white transition-all duration-300 shadow-xl group"
            title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
            aria-label={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 group-hover:text-stone-950" /> : <Volume2 className="w-4 h-4 text-amber-400 group-hover:text-stone-950 animate-bounce" />}
          </button>
        </div>
      </div>

      {/* Ambient Audio Stream */}
      <audio ref={audioRef} src="/kerala_theme.mp3" loop />
    </section>
  );
}
