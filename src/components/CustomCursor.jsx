import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [trails, setTrails] = useState([]);
  const [ripples, setRipples] = useState([]);
  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      // Hide cursor on touch devices or screens smaller than 768px (mobile view)
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const deltaX = x - prevPos.current.x;
      const deltaY = y - prevPos.current.y;
      prevPos.current = { x, y };

      setMousePosition({ x, y });

      // Particles spawn EXACTLY from pointer center (x, y) & move opposite to velocity vector (-deltaX, -deltaY)
      const size = Math.random() * 5 + 3;
      const halfSize = size / 2;
      const oppositeX = -deltaX * 1.5;
      const oppositeY = -deltaY * 1.5;

      const newTrail = {
        id: Date.now() + Math.random(),
        startX: x - halfSize,
        startY: y - halfSize,
        targetX: x + oppositeX - halfSize,
        targetY: y + oppositeY - halfSize,
        size,
        color: Math.random() > 0.4 ? 'rgba(251, 191, 36, 0.85)' : 'rgba(255, 255, 255, 0.95)',
      };

      setTrails((prev) => [...prev.slice(-14), newTrail]);

      // Detect hover over interactive elements (buttons, links, inputs, cards)
      const target = e.target;
      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button';

      setIsHovered(!!isInteractive);
    };

    const handleClick = (e) => {
      // Golden ripple radial gradient expansion at exact click coordinates
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-5), newRipple]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [isMobile]);

  // Clean up trail particles
  useEffect(() => {
    if (isMobile) return;
    const timer = setInterval(() => {
      setTrails((prev) => (prev.length > 0 ? prev.slice(1) : []));
    }, 50);
    return () => clearInterval(timer);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Particles Starting Centered at Mouse Pointer Position (x, y) */}
      {trails.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.9, scale: 1, x: t.startX, y: t.startY }}
          animate={{ opacity: 0, scale: 0.15, x: t.targetX, y: t.targetY }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: t.size,
            height: t.size,
            backgroundColor: t.color,
            borderRadius: '50%',
            boxShadow: `0 0 8px ${t.color}`,
          }}
        />
      ))}

      {/* Golden Click Ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{ width: 90, height: 90, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((item) => item.id !== r.id));
            }}
            style={{
              position: 'fixed',
              left: r.x,
              top: r.y,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0) 70%)',
              border: '1.5px solid rgba(251, 191, 36, 0.9)',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Instant Ultra-Responsive Outer Ring (Centered at x, y) */}
      <motion.div
        animate={{
          x: mousePosition.x - (isHovered ? 22 : 12),
          y: mousePosition.y - (isHovered ? 22 : 12),
          width: isHovered ? 44 : 24,
          height: isHovered ? 44 : 24,
          backgroundColor: isHovered ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          borderColor: isHovered ? 'rgba(251, 191, 36, 0.9)' : 'rgba(255, 255, 255, 0.4)',
          boxShadow: isHovered
            ? '0 0 25px rgba(251, 191, 36, 0.7), inset 0 0 12px rgba(251, 191, 36, 0.3)'
            : '0 0 10px rgba(255, 255, 255, 0.15)',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 850, mass: 0.08 }}
        className="fixed rounded-full border transition-colors duration-150"
      />

      {/* Instant Core Dot (Centered at x, y) */}
      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 1.3 : 1,
          backgroundColor: isHovered ? '#fbbf24' : '#ffffff',
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 950, mass: 0.05 }}
        className="fixed w-2 h-2 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.9)]"
      />
    </div>
  );
}
