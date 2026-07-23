import React, { useState } from 'react';
import { Compass, Mail, Send, MapPin, Phone, Heart, CheckCircle2, Globe, Share2, Award, Sparkles } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await fetch('https://formspree.io/f/xqerdwqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email,
          type: 'Kerala Travel Journal Newsletter Subscription',
          _subject: `New Newsletter Subscription: ${email}`,
        }),
      });
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-stone-950 text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-wider text-white">
                  KERALA
                </h3>
                <p className="text-[10px] tracking-[0.25em] text-amber-400 font-medium uppercase">
                  God's Own Country
                </p>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Official Tourism Portal dedicated to preserving the pristine natural heritage, rich cultural tapestry, and eco-sustainable sanctuaries of Kerala.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Official Website" className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-400 hover:text-stone-950 border border-white/10 flex items-center justify-center text-stone-300 transition-all duration-300">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Share Destination" className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-400 hover:text-stone-950 border border-white/10 flex items-center justify-center text-stone-300 transition-all duration-300">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Eco Certified" className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-400 hover:text-stone-950 border border-white/10 flex items-center justify-center text-stone-300 transition-all duration-300">
                <Award className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Culture Highlights" className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-400 hover:text-stone-950 border border-white/10 flex items-center justify-center text-stone-300 transition-all duration-300">
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Munnar Tea Hills</a></li>
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Alleppey Canals</a></li>
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Wayanad Rainforest</a></li>
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Varkala Beach</a></li>
              <li><a href="#popular" className="hover:text-amber-400 transition-colors">Thekkady Sanctuary</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#memories" className="hover:text-amber-400 transition-colors">Ayurvedic Healing</a></li>
              <li><a href="#memories" className="hover:text-amber-400 transition-colors">Houseboat Cruises</a></li>
              <li><a href="#memories" className="hover:text-amber-400 transition-colors">Village Tourism</a></li>
              <li><a href="#memories" className="hover:text-amber-400 transition-colors">Kathakali Arts</a></li>
              <li><a href="#seasons" className="hover:text-amber-400 transition-colors">Monsoon Magic</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Kerala Travel Journal
            </h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Subscribe to receive seasonal travel guides, festival calendars, and exclusive wellness retreat offers.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold bg-amber-400/10 p-3 rounded-xl border border-amber-400/30">
                <CheckCircle2 className="w-4 h-4" />
                Thank you for subscribing to Kerala Tourism!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center bg-stone-900 border border-white/15 focus-within:border-amber-400 rounded-full p-1.5 pl-4 transition-colors">
                  <Mail className="w-4 h-4 text-stone-500 shrink-0 mr-3" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105 shadow-md ml-2"
                    title="Subscribe"
                  >
                    <Send className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Department of Tourism, Government of Kerala. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mx-0.5" /> for God's Own Country
          </div>
        </div>
      </div>
    </footer>
  );
}
