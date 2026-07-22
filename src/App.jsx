import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhatsNewSection from './components/WhatsNewSection';
import PopularSection from './components/PopularSection';
import SeasonGuideSection from './components/SeasonGuideSection';
import MemoriesSection from './components/MemoriesSection';
import WondersSection from './components/WondersSection';
import TravelersSection from './components/TravelersSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ScrollToTopProgress from './components/ScrollToTopProgress';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleOpenBooking = (item = null) => {
    if (item) setSelectedDestination(item);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 antialiased selection:bg-amber-400 selection:text-stone-950 overflow-x-hidden">
      {/* Sticky Glassmorphism Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section (Smooth Crossfade Slider & Dual Layer BG) */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* 2. "What's New" Section (Featured Event with Parallax) */}
        <WhatsNewSection onOpenBooking={() => handleOpenBooking()} />

        {/* 3. "Popular Destinations" Section (Grid with Category Filters & Corner Glitch Fix) */}
        <PopularSection onSelectDestination={(dest) => handleOpenBooking(dest)} />

        {/* 4. Seasonal Travel Guide Section (Interactive Season Tabs) */}
        <SeasonGuideSection />

        {/* 5. "Memories for a Lifetime" Section (Horizontal Carousel & Experiences) */}
        <MemoriesSection onSelectExperience={(exp) => handleOpenBooking(exp)} />

        {/* 6. "Stunning Wonders" Section (Heritage & Wellness Cards) */}
        <WondersSection onSelectWonder={(wonder) => handleOpenBooking(wonder)} />

        {/* 7. Traveler Testimonials & Trust Metrics */}
        <TravelersSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking / Itinerary Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedDestination={selectedDestination}
      />

      {/* Circular Scroll-to-Top Floating Ring */}
      <ScrollToTopProgress />
    </div>
  );
}
