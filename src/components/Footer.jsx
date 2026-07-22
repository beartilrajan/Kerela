import React from 'react';
import { Compass, ArrowUp, Mail, Phone, MapPin, Globe, Share2, Camera, Video } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Camera, label: 'Instagram' },
    { icon: Share2, label: 'Facebook' },
    { icon: Video, label: 'YouTube' },
    { icon: Globe, label: 'Website' },
  ];

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-white/10 pt-20 pb-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Newsletter & Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-gradient-to-r from-stone-900 via-stone-900/80 to-amber-950/40 p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Stay Inspired
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Subscribe to Luxury Travel Stories
            </h3>
            <p className="text-stone-400 text-sm font-light">
              Receive curated seasonal guides, exclusive resort offers, and cultural event updates from God's Own Country.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-5 py-3.5 rounded-full bg-black/60 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shrink-0 shadow-lg shadow-amber-400/20"
              >
                Join Circle
              </button>
            </form>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pt-6">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-white">
                  KERALA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-medium">
                  God's Own Country
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Department of Tourism, Government of Kerala. Welcome to a sanctuary of misty highlands, serene lagoons, pristine shores, and ancient holistic healing.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={i}
                    href="#"
                    aria-label={item.label}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-400 hover:text-stone-950 border border-white/10 flex items-center justify-center text-stone-400 transition-all duration-300"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

          </div>

          {/* Col 2: Destinations */}
          <div className="space-y-3">
            <h4 className="font-serif text-white text-base font-semibold tracking-wide">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Munnar Hills</a></li>
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Alleppey Canals</a></li>
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Wayanad Forests</a></li>
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Varkala Cliffs</a></li>
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Bekal Fort</a></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div className="space-y-3">
            <h4 className="font-serif text-white text-base font-semibold tracking-wide">
              Experiences
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li><a href="#memories" className="hover:text-amber-400 transition-colors">Ayurvedic Rejuvenation</a></li>
              <li><a href="#memories" className="hover:text-amber-400 transition-colors">Houseboat Cruises</a></li>
              <li><a href="#memories" className="hover:text-amber-400 transition-colors">Theyyam & Kathakali</a></li>
              <li><a href="#memories" className="hover:text-amber-400 transition-colors">Wildlife Safaris</a></li>
              <li><a href="#memories" className="hover:text-amber-400 transition-colors">Village Tourism</a></li>
            </ul>
          </div>

          {/* Col 4: Official Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-white text-base font-semibold tracking-wide">
              Tourism Office
            </h4>
            <div className="space-y-2 text-xs text-stone-400 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Park View, Thiruvananthapuram, Kerala 695033</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>1-800-425-4747 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@keralatourism.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <p>© {new Date().getFullYear()} Kerala Tourism. Built with React, Tailwind CSS & GSAP. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-amber-400 hover:text-stone-950 text-stone-300 border border-white/10 transition-all duration-300 group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
