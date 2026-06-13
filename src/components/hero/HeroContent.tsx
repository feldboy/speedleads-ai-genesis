import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/effects/MagneticButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { scrollToSection } from '@/lib/scroll';

const ROTATING_WORDS = ['בוטים חכמים', 'אוטומציות', 'מערכות CRM', 'אתרים חיים'];
const ROTATE_MS = 2800;

/** word-by-word mask reveal */
const RevealWords = ({
  text,
  delay = 0,
  className = '',
}: {
  text: string;
  delay?: number;
  className?: string;
}) => {
  const reducedMotion = useReducedMotion();
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={reducedMotion ? false : { y: '115%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < text.split(' ').length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

const HeroContent: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [reducedMotion]);

  const fadeUp = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="w-full text-center lg:text-right">
      {/* Eyebrow */}
      <motion.div
        {...fadeUp(0.3)}
        className="flex items-center gap-4 justify-center lg:justify-start mb-8"
      >
        <span className="live-dot" />
        <span className="eyebrow text-champagne">AI Systems Studio</span>
        <span className="h-px w-14 hairline-gold" />
        <span className="eyebrow text-ivory/40">TLV</span>
      </motion.div>

      {/* Headline */}
      <h1 className="heading-he text-ivory mb-8" style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)', lineHeight: 1.04 }}>
        <span className="block">
          <RevealWords text="אנחנו בונים" delay={0.45} />
        </span>
        <span className="block relative mt-1" style={{ minHeight: '1.15em' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={ROTATING_WORDS[wordIndex]}
              className="gradient-text inline-block font-black"
              style={{ letterSpacing: '-0.03em' }}
              initial={reducedMotion ? false : { opacity: 0, y: 26, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -26, filter: 'blur(6px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="block mt-1">
          <RevealWords text="שעובדים בשבילך." delay={0.7} />
          {' '}
          <motion.span
            {...fadeUp(1.0)}
            className="font-tech text-tech-blue inline-block"
            style={{ fontSize: '0.55em', verticalAlign: 'baseline', textShadow: '0 0 24px rgba(0,246,255,0.45)' }}
            dir="ltr"
          >
            24/7
          </motion.span>
        </span>
      </h1>

      {/* Subline */}
      <motion.p
        {...fadeUp(1.05)}
        className="text-base sm:text-lg text-ivory/60 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 lg:ml-auto"
      >
        סטודיו לבוטים, אוטומציות ומערכות CRM מבוססות AI.
        אנחנו מתכננים, בונים ומטמיעים מערכות שהופכות לידים ללקוחות —
        גם כשאתם ישנים.
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...fadeUp(1.2)}
        className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
      >
        <MagneticButton onClick={() => scrollToSection('contact')}>
          <button
            id="hero_cta_button"
            className="btn-lux px-9 py-4 text-sm tracking-wide min-h-[48px] w-full sm:w-auto"
          >
            קבעו שיחת ייעוץ ←
          </button>
        </MagneticButton>
        <MagneticButton onClick={() => scrollToSection('success-stories')}>
          <button
            id="hero_services_button"
            className="btn-ghost-lux px-9 py-4 text-sm tracking-wide min-h-[48px] w-full sm:w-auto"
          >
            צפו בעבודות
          </button>
        </MagneticButton>
      </motion.div>
    </div>
  );
};

export default HeroContent;
