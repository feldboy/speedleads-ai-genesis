
import React, { useState } from 'react';
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

const subHeadlineText = "פתרונות AI מתקדמים לבניית אתרים, אוטומציות עסקיות ואינטגרציות חכמות – שנועדו להזניק את העסק שלך קדימה.";

const HeroContent: React.FC<{ controls: any }> = ({ controls }) => {
  const [showTypewriter, setShowTypewriter] = useState(false);

  // The typewriter effect is now triggered by the headline animation completing,
  // removing the need for a separate, uncoordinated timer.
  // useEffect(() => {
  //   const timeout = setTimeout(() => setShowTypewriter(true), 1000);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <div className="lg:w-1/2 text-center lg:text-right mb-10 lg:mb-0">
      <motion.h1
        variants={heroVariants.headline}
        initial="hidden"
        animate={controls}
        custom={{ delayIdx: 3 }} // Phase 2: Headline animation
        onAnimationComplete={() => setShowTypewriter(true)}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 20px rgba(0,246,255,0.5)",
              "0 0 40px rgba(0,246,255,0.8)",
              "0 0 20px rgba(0,246,255,0.5)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          SpeedLeads.AI:
        </motion.span>
        <br />
        <span className="gradient-text">העתיד של</span>
        <br />
        {showTypewriter && (
          <TypewriterText
            texts={aiTexts}
            className="gradient-text"
          />
        )}
        <br />
        <motion.span
          className="text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          כבר כאן
        </motion.span>
      </motion.h1>
      <motion.p
        variants={heroVariants.subHeadline}
        initial="hidden"
        animate={controls}
        custom={{ delayIdx: 4 }} // Phase 3: Sub-headline animation
        className="text-xl text-gray-300 mb-8"
      >
        {subHeadlineText.split(' ').map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={heroVariants.word}
            className="inline-block mr-1.5"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
      <div
        className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse rtl:space-x-reverse"
      >
        <motion.div
          variants={heroVariants.cta}
          initial="hidden"
          animate={controls}
          custom={{ delayIdx: 5 }} // Phase 4: First CTA button
        >
          <MagneticButton>
            <Button
              id="hero_cta_button"
              size="lg"
              className="bg-gradient-to-r from-tech-blue to-blue-600 hover:from-tech-blue/80 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-tech-blue/25 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              בואו נדבר על הפרויקט שלכם
            </Button>
          </MagneticButton>
        </motion.div>
        <motion.div
          variants={heroVariants.cta}
          initial="hidden"
          animate={controls}
          custom={{ delayIdx: 6 }} // Phase 4: Second CTA button (staggered)
        >
          <MagneticButton>
            <Button
              id="hero_services_button"
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white/30 font-semibold text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-lg hover:shadow-gold/25 transition-all duration-300"
            >
              גלו את השירותים שלנו
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContent;
