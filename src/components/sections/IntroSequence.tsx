import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SpeedLeadsLogo from '@/components/ui/SpeedLeadsLogo';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TOTAL_MS = 4200;
const SPARK_COUNT = 12;

/**
 * Cinematic curtain-raiser, on EVERY entry (owner directive): a single point
 * of light (the Signal's birth) streaks into a line, ignites the logo with a
 * shockwave and a burst of sparks, the tagline assembles, then the intro
 * dissolves into the liquid-ink background (a `speedleads:ink-burst` event
 * stirs the ink as the curtain lifts). Skippable at any moment (button,
 * Escape or Enter). Never shown under reduced motion.
 */
const IntroSequence = () => {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const dismissedRef = useRef(false);

  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setVisible(false);
    // hand the energy to the liquid ink — the intro dissolves into the page
    window.dispatchEvent(new CustomEvent('speedleads:ink-burst'));
  };

  useEffect(() => {
    if (!visible || reducedMotion) return;

    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(dismiss, TOTAL_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reducedMotion]);

  if (reducedMotion || !visible) return null;

  // Tagline plays on the double meaning of אות: signal / letter
  const tagline = 'כל עסק גדול מתחיל באות אחד';
  const words = tagline.split(' ');

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        dir="rtl"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-abyss"
        exit={{ opacity: 0 }}
        animate={{ opacity: [1, 1, 1, 0] }}
        transition={{ duration: TOTAL_MS / 1000, times: [0, 0.85, 0.93, 1] }}
        onAnimationComplete={dismiss}
      >
        {/* The Signal is born: a point of light becomes a line */}
        <motion.div
          aria-hidden="true"
          className="absolute h-[2px] rounded-full bg-tech-blue"
          style={{ boxShadow: '0 0 12px rgba(0,246,255,0.9), 0 0 48px rgba(0,246,255,0.4)' }}
          initial={{ width: 4, opacity: 0 }}
          animate={{
            width: [4, 4, 220, 220],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 1.6, times: [0, 0.25, 0.8, 1], ease: 'easeInOut' }}
        />

        {/* Ignition shockwave — a ring of light racing outward */}
        <motion.div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 120,
            height: 120,
            border: '1.5px solid rgba(0,246,255,0.8)',
            boxShadow: '0 0 24px rgba(0,246,255,0.5), 0 0 24px rgba(0,246,255,0.4) inset',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 0.2, 9], opacity: [0, 1, 0] }}
          transition={{ delay: 1.25, duration: 1.4, times: [0, 0.12, 1], ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Sparks thrown off by the ignition */}
        {Array.from({ length: SPARK_COUNT }, (_, i) => {
          const angle = (i / SPARK_COUNT) * Math.PI * 2;
          const radius = 150 + (i % 3) * 70;
          return (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 3,
                height: 3,
                background: '#00F6FF',
                boxShadow: '0 0 8px rgba(0,246,255,0.9)',
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
              animate={{
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                opacity: [0, 1, 0],
                scale: [1, 1, 0.3],
              }}
              transition={{ delay: 1.3, duration: 1.1, ease: 'easeOut' }}
            />
          );
        })}

        {/* The light ignites the logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpeedLeadsLogo size="xl" />
        </motion.div>

        {/* Tagline assembles word by word (RTL stagger = DOM order) */}
        <p className="mt-6 font-display text-xl sm:text-2xl text-white/85" aria-label={tagline}>
          {words.map((word, i) => (
            <span key={i}>
              <motion.span
                aria-hidden="true"
                className="inline-block"
                initial={{ opacity: 0, y: '0.5em', filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 2.1 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && ' '}
            </span>
          ))}
        </p>

        <button
          type="button"
          onClick={dismiss}
          id="intro_skip_button"
          className="absolute bottom-8 left-8 text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
        >
          דלגו ←
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroSequence;
