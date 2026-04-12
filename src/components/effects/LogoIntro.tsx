import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  3D Logo Intro — CSS 3D transforms + framer-motion                 */
/*  Full-screen overlay that plays once per session, then fades out.  */
/* ------------------------------------------------------------------ */

const INTRO_DURATION_MS = 2500;

/** SVG infinity + lightning logo rendered with CSS 3D perspective */
const Logo3D: React.FC = () => (
  <div
    className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
    style={{
      perspective: '800px',
    }}
  >
    {/* Rotating container with 3D transform */}
    <motion.div
      className="w-full h-full"
      style={{ transformStyle: 'preserve-3d' }}
      animate={{
        rotateY: [0, 360],
        rotateX: [0, 10, -10, 0],
      }}
      transition={{
        rotateY: { duration: 6, ease: 'linear', repeat: Infinity },
        rotateX: { duration: 3, ease: 'easeInOut', repeat: Infinity },
      }}
    >
      {/* Glow layer behind the logo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,246,255,0.4) 0%, rgba(0,167,255,0.15) 40%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'translateZ(-20px)',
        }}
      />

      {/* Main SVG logo */}
      <svg
        viewBox="0 0 200 120"
        className="w-full h-full drop-shadow-[0_0_30px_rgba(0,246,255,0.6)]"
        style={{ transform: 'translateZ(0px)' }}
      >
        <defs>
          <linearGradient id="intro-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f6ff" />
            <stop offset="50%" stopColor="#00a7ff" />
            <stop offset="100%" stopColor="#643cdc" />
          </linearGradient>
          <filter id="intro-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Infinity symbol */}
        <path
          d="M60 60 C60 35, 95 25, 100 60 C105 25, 140 35, 140 60 C140 85, 105 95, 100 60 C95 95, 60 85, 60 60 Z"
          fill="none"
          stroke="url(#intro-logo-grad)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#intro-glow)"
        />

        {/* Lightning bolt in center */}
        <path
          d="M96 38 L90 56 L98 56 L92 82 L110 52 L101 52 L108 38 Z"
          fill="url(#intro-logo-grad)"
          filter="url(#intro-glow)"
        />
      </svg>

      {/* Second glow pass (front) for depth effect */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,246,255,0.12) 0%, transparent 60%)',
          transform: 'translateZ(20px)',
        }}
      />
    </motion.div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main LogoIntro overlay                                            */
/* ------------------------------------------------------------------ */

interface ILogoIntroProps {
  onComplete: () => void;
}

const LogoIntro: React.FC<ILogoIntroProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const handleComplete = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();

      return;
    }

    const timer = setTimeout(handleComplete, INTRO_DURATION_MS);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion, onComplete, handleComplete]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="logo-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0D1B2A]"
        >
          {/* Ambient background glow */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0,246,255,0.12) 0%, rgba(100,60,220,0.06) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* 3D rotating logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Logo3D />
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <span dir="ltr" className="inline-flex items-baseline text-2xl md:text-3xl">
              <span className="font-bold text-white">Speed</span>
              <span className="italic bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] bg-clip-text text-transparent">Leads</span>
              <span className="text-white font-bold">.AI</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoIntro;
