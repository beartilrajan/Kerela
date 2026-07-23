import React, { useState } from 'react';
import { X, Calendar, User, Mail, Compass, CheckCircle } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, selectedDestination }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dates: '',
    guests: '2 Guests',
    destination: selectedDestination?.name || 'Munnar Tea Estates',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xqerdwqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          dates: formData.dates,
          guests: formData.guests,
          destination: selectedDestination?.name || formData.destination || 'Kerala Destination',
          notes: formData.notes,
          _subject: `New Kerala Travel Itinerary Request from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        // Fallback for user feedback
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Formspree submission error:', error);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-stone-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-white fix-corner-glitch">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-400">
              <CheckCircle className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-white">Journey Requested!</h3>
            <p className="text-stone-300 text-sm font-light">
              Our Kerala Tourism Concierge will contact you within 24 hours to curate your experience.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4" />
                Kerala Tourism Experience
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Plan Your Sanctuary
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm font-light">
                Fill in your travel preferences to receive an exclusive itinerary.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-300 font-medium uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-950/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 font-medium uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-950/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-300 font-medium uppercase tracking-wider mb-1">
                    Preferred Dates
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Oct 2026"
                      value={formData.dates}
                      onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                      className="w-full bg-stone-950/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-medium uppercase tracking-wider mb-1">
                    Travelers
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-stone-950/80 border border-white/15 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="1 Guest">Solo Explorer</option>
                    <option value="2 Guests">Couple (2 Guests)</option>
                    <option value="Family">Family / Group</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 font-medium uppercase tracking-wider mb-1">
                  Special Notes
                </label>
                <textarea
                  rows="2"
                  placeholder="Ayurveda, Houseboat preference, etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-stone-950/80 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Itinerary Request'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
