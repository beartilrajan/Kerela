import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Compass, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDrawerMounted, setIsDrawerMounted] = useState(false);

  const drawerRef = useRef(null);
  const linksContainerRef = useRef(null);
  const actionBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation flow for both opening AND closing mobile drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      setIsDrawerMounted(true);
    } else if (isDrawerMounted && drawerRef.current) {
      // GSAP Exit Animation when closing menu
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setIsDrawerMounted(false),
        });

        // Animate button fade & scale down cleanly in place
        if (actionBtnRef.current) {
          tl.to(actionBtnRef.current, {
            opacity: 0,
            scale: 0.96,
            y: 5,
            duration: 0.15,
            ease: 'power2.in',
          });
        }

        // Animate links fade out
        if (linksContainerRef.current) {
          const links = Array.from(linksContainerRef.current.children).filter((el) => el.tagName === 'A');
          tl.to(
            links,
            {
              opacity: 0,
              x: -10,
              duration: 0.15,
              stagger: 0.02,
              ease: 'power2.in',
            },
            '-=0.1'
          );
        }

        // Drawer container fade & slide up
        tl.to(
          drawerRef.current,
          {
            opacity: 0,
            y: -12,
            duration: 0.2,
            ease: 'power2.in',
          },
          '-=0.1'
        );
      }, drawerRef);

      return () => ctx.revert();
    }
  }, [mobileMenuOpen]);

  // GSAP Entrance Animation when drawer mounts
  useEffect(() => {
    if (mobileMenuOpen && isDrawerMounted && drawerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          drawerRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );

        if (linksContainerRef.current) {
          const links = Array.from(linksContainerRef.current.children).filter((el) => el.tagName === 'A');
          gsap.fromTo(
            links,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: 0.28, stagger: 0.04, ease: 'power2.out' }
          );
        }

        if (actionBtnRef.current) {
          gsap.fromTo(
            actionBtnRef.current,
            { opacity: 0, scale: 0.96, y: 8 },
            { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)', delay: 0.15 }
          );
        }
      }, drawerRef);

      return () => ctx.revert();
    }
  }, [isDrawerMounted, mobileMenuOpen]);

  const navLinks = [
    { name: 'Destinations', href: '#popular' },
    { name: "What's New", href: '#whats-new' },
    { name: 'Experiences', href: '#memories' },
    { name: 'Wonders', href: '#wonders' },
    { name: 'Seasons', href: '#seasons' },
    { name: 'Reviews', href: '#travelers' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-stone-950/90 backdrop-blur-xl py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-stone-950/80 via-stone-950/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-lg shadow-amber-400/10">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors">
              KERALA
            </span>
            <span className="text-[10px] tracking-[0.25em] text-amber-400 font-medium uppercase">
              God's Own Country
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-300 hover:text-amber-400 text-xs uppercase tracking-widest font-semibold transition-colors duration-200 relative group py-2.5 px-1.5 focus:outline-none"
            >
              {link.name}
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-400/60 bg-amber-500/10 text-amber-300 hover:bg-amber-400 hover:text-stone-950 font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-amber-500/10 hover:shadow-amber-400/30 hover:scale-105"
          >
            Plan Your Journey
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Morphing Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex flex-col items-center justify-center gap-1.5 transition-all duration-300 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`w-5 h-0.5 bg-amber-400 rounded-full transition-all duration-300 transform origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-amber-400 rounded-full transition-all duration-300 transform origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer with GSAP Staggered Entrance & Exit Animations */}
      {isDrawerMounted && (
        <div
          ref={drawerRef}
          className="lg:hidden bg-stone-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all"
        >
          <div ref={linksContainerRef} className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-200 hover:text-amber-400 text-lg font-serif tracking-wide py-2 border-b border-white/5 flex items-center justify-between group transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
            <button
              ref={actionBtnRef}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="mt-2 text-center py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02]"
            >
              Plan Your Journey
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
