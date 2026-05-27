import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from '@/components/effects/TypewriterText';
import MagneticButton from '@/components/effects/MagneticButton';
import { Button } from '@/components/ui/button';
import { heroVariants } from './heroAnimationVariants';

const aiTexts = [
  "בינה מלאכותית מתקדמת",
  "אוטומציות חכמות",
  "פתרונות דיגיטליים",
  "חדשנות טכנולוגית"
];

const HeroContent: React.FC = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowTypewriter(true), 850);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="lg:w-1/2 text-center lg:text-right mb-10 lg:mb-0">
      {/* Eyebrow + section index */}
      <motion.div
        variants={heroVariants.subHeadline}
        initial="hidden"
        animate="visible"
        custom={{ delayIdx: 0 }}
        className="flex items-center gap-4 justify-center lg:justify-start mb-6"
      >
        <span className="section-index text-tech-blue">01 / 04</span>
        <span className="h-px w-12 bg-tech-blue/40" />
        <span className="eyebrow text-white/70">AI · Automation · Web</span>
      </motion.div>

      <motion.h1
        variants={heroVariants.headline}
        initial="hidden"
        animate="visible"
        custom={{ delayIdx: 0 }}
        className="heading-he text-white mb-6"
      >
        <motion.span
          className="font-display text-white"
          animate={{
            textShadow: [
              "0 0 20px rgba(0,246,255,0.4)",
              "0 0 40px rgba(0,246,255,0.7)",
              "0 0 20px rgba(0,246,255,0.4)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em' }}
        >
          SpeedLeads.AI
        </motion.span>
        <br />
        <span
          className="block mt-3"
          style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)', lineHeight: 1.02 }}
        >
          <span className="gradient-text">העתיד של</span>
        </span>
        <span
          className="block mt-2"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)', lineHeight: 1.1 }}
        >
          {showTypewriter && (
            <TypewriterText
              texts={aiTexts}
              className="gradient-text"
            />
          )}
        </span>
        <motion.span
          className="block mt-2 text-white"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          כבר כאן
        </motion.span>
      </motion.h1>

      {/* Hairline divider */}
      <motion.div
        variants={heroVariants.subHeadline}
        initial="hidden"
        animate="visible"
        custom={{ delayIdx: 1 }}
        className="h-px w-24 bg-white/30 mb-8 mx-auto lg:mx-0 lg:mr-0"
      />

      <motion.p
        variants={heroVariants.subHeadline}
        initial="hidden"
        animate="visible"
        custom={{ delayIdx: 1 }}
        className="text-base sm:text-lg text-gray-300 mb-10 leading-relaxed px-4 sm:px-0 max-w-lg mx-auto lg:mx-0 lg:mr-0"
      >
        פתרונות AI מתקדמים לבניית אתרים, אוטומציות עסקיות ואינטגרציות חכמות —
        שנועדו להזניק את העסק שלך קדימה.
      </motion.p>

      <motion.div
        variants={heroVariants.cta}
        initial="hidden"
        animate="visible"
        custom={{ delayIdx: 2 }}
        className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 px-4 sm:px-0"
      >
        <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          <Button
            id="hero_cta_button"
            size="lg"
            className="btn-brand text-white px-8 py-4 text-sm uppercase tracking-wider min-h-[48px]"
          >
            בואו נדבר →
          </Button>
        </MagneticButton>
        <MagneticButton onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
          <Button
            id="hero_services_button"
            size="lg"
            variant="outline"
            className="btn-ghost-brand border-white/40 text-white hover:bg-white/10 hover:border-white px-8 py-4 text-sm uppercase tracking-wider min-h-[48px]"
          >
            השירותים שלנו
          </Button>
        </MagneticButton>
      </motion.div>
    </div>
  );
};

export default HeroContent;
