import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhatsNewSection from './components/WhatsNewSection';
import PopularSection from './components/PopularSection';
import MemoriesSection from './components/MemoriesSection';
import WondersSection from './components/WondersSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 antialiased selection:bg-amber-400 selection:text-stone-950">
      {/* Sticky Glassmorphism Header */}
      <Navbar />

      {/* Main Sections (In exact required order) */}
      <main>
        {/* 1. Hero Section (Immersive Slider) */}
        <HeroSection />

        {/* 2. "What's New" Section (Featured Event) */}
        <WhatsNewSection />

        {/* 3. "Popular Destinations" Section (4-Column Grid) */}
        <PopularSection />

        {/* 4. "Memories for a Lifetime" Section (Split Layout & Carousel) */}
        <MemoriesSection />

        {/* 5. "Stunning Wonders" Section (3-Column Grid) */}
        <WondersSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
