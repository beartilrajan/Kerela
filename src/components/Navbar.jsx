import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, ChevronRight, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Destinations', href: '#popular' },
    { name: "What's New", href: '#whats-new' },
    { name: 'Memories', href: '#memories' },
    { name: 'Wonders', href: '#wonders' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-stone-950/85 backdrop-blur-md py-4 shadow-xl border-b border-white/10'
          : 'bg-gradient-to-b from-black/70 via-black/20 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors">
              KERALA
            </span>
            <span className="text-[10px] tracking-[0.25em] text-amber-400/90 font-medium uppercase">
              God's Own Country
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-300 hover:text-amber-400 text-sm font-medium tracking-wide transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#whats-new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-400/60 bg-amber-500/10 text-amber-300 hover:bg-amber-400 hover:text-stone-950 font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-amber-500/10 hover:shadow-amber-400/30"
          >
            Plan Your Journey
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:text-amber-400 hover:bg-white/10 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-200 hover:text-amber-400 text-lg font-serif tracking-wide py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#whats-new"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-full bg-amber-400 text-stone-950 font-semibold text-sm uppercase tracking-wider shadow-lg"
            >
              Plan Your Journey
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
