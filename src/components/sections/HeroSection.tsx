import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EnhancedParticles from '@/components/effects/EnhancedParticles';
import FluidBackground from '@/components/effects/FluidBackground';
import TypewriterText from '@/components/effects/TypewriterText';
import AnimatedCode from '@/components/effects/AnimatedCode';
import MagneticButton from '@/components/effects/MagneticButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const aiTexts = [
  "בינה מלאכותית מתקדמת",
  "אוטומציות חכמות",
  "פתרונות דיגיטליים",
  "חדשנות טכנולוגית"
];

// Animation Variants (with delay magic numbers for sequencing)
const variants = {
  hero: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren" } }
  },
  background: {
    hidden: { opacity: 0 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      transition: { duration: 0.4, delay: 0.10 * (custom?.delayIdx ?? 0), ease: "easeOut" as const }
    })
  },
  headline: {
    hidden: { opacity: 0, x: -70, scale: 0.92 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, delay: 0.13 * (custom?.delayIdx ?? 0), ease: [0.22, 1, 0.36, 1] as any }
    })
  },
  subHeadline: {
    hidden: { opacity: 0, x: 70 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.13 * (custom?.delayIdx ?? 0), ease: "easeOut" as const }
    })
  },
  cta: {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, bounce: 0.32, duration: 0.57, delay: 0.13 * (custom?.delayIdx ?? 0) }
    })
  },
  code: {
    hidden: { opacity: 0, y: 80, scale: 0.93 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, type: "spring" as const, bounce: 0.25, delay: 0.18 * (custom?.delayIdx ?? 0) }
    })
  },
  decor: {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (custom?: { delayIdx?: number; styleOpacity?: number }) => ({
      opacity: custom?.styleOpacity ?? 0.7,
      scale: 1,
      transition: { duration: 0.6, type: "spring" as const, bounce: 0.1, delay: 0.25 + 0.12 * (custom?.delayIdx ?? 0) }
    })
  },
  scrollIndicator: {
    hidden: { opacity: 0, y: 22 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: 0.45 + 0.12 * (custom?.delayIdx ?? 0) }
    })
  }
};

const HeroSection = () => {
  const reducedMotion = useReducedMotion();
  const controls = useAnimation();

  // States to trigger TypewriterText and AnimatedCode
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // Animation sequencing (coordinated manually)
  useEffect(() => {
    if (reducedMotion) {
      controls.set("visible");
      setShowTypewriter(true);
      setShowCode(true);
      return;
    }
    controls.set("hidden");
    controls.start("visible");
    // Trigger typewriter about 850ms (headline full duration) after mount
    const typewriterTimeout = setTimeout(() => setShowTypewriter(true), 850);
    // Trigger code area animation a bit later for "assemble" feel,
    // and then inner code animation after that
    const codeTimeout = setTimeout(() => setShowCode(true), 1200); // after buttons
  
    return () => {
      clearTimeout(typewriterTimeout);
      clearTimeout(codeTimeout);
    };
  }, [controls, reducedMotion]);

  return (
    <motion.section
      initial={reducedMotion ? false : "hidden"}
      animate={controls}
      variants={variants.hero}
      className="relative min-h-screen flex items-center bg-gradient-to-br from-dark via-gray-900 to-dark overflow-hidden"
    >
      {/* Animated Fluid Background */}
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        custom={{ delayIdx: 0 }}
        variants={variants.background}
      >
        <FluidBackground />
        <EnhancedParticles />
      </motion.div>

      {/* Additional Animated Background Elements (coordinated by variants for entrance) */}
      <motion.div className="absolute inset-0 z-0">
        <motion.div
          variants={variants.decor}
          custom={{ delayIdx: 0, styleOpacity: 0.10 }}
          initial="hidden"
          animate="visible"
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-blue rounded-full filter blur-3xl"
          transition={{
            duration: 12, // still animated permanently after reveal
            repeat: Infinity,
            ease: "easeInOut"
          }}
          // Floating effect (after in)
          whileInView={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
        />
        <motion.div
          variants={variants.decor}
          custom={{ delayIdx: 1, styleOpacity: 0.05 }}
          initial="hidden"
          animate="visible"
          className="absolute top-3/4 left-3/4 w-96 h-96 bg-gold rounded-full filter blur-3xl"
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileInView={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
        />
        <motion.div
          variants={variants.decor}
          custom={{ delayIdx: 2 }}
          initial="hidden"
          animate="visible"
          className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-tech-blue/20"
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileInView={{
            borderRadius: ["0%", "50%", "0%"],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
        />
      </motion.div>

      <div className="container mx-auto py-20 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column: Headline, Subheadline, CTAs */}
          <div className="lg:w-1/2 text-center lg:text-right mb-10 lg:mb-0">
            <motion.h1
              variants={variants.headline}
              initial="hidden"
              animate="visible"
              custom={{ delayIdx: 0 }}
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
              {/* Typewriter appears after H1 assembled */}
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
              variants={variants.subHeadline}
              initial="hidden"
              animate="visible"
              custom={{ delayIdx: 1 }}
              className="text-xl text-gray-300 mb-8"
            >
              פתרונות AI מתקדמים לבניית אתרים, אוטומציות עסקיות ואינטגרציות חכמות –
              שנועדו להזניק את העסק שלך קדימה.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={variants.cta}
              initial="hidden"
              animate="visible"
              custom={{ delayIdx: 2 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse rtl:space-x-reverse"
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

          {/* Right Column: Animated Code Box (appears after a slight delay) */}
          <motion.div
            className="lg:w-1/2"
            variants={variants.code}
            initial="hidden"
            animate="visible"
            custom={{ delayIdx: 3 }}
          >
            <div className="relative">
              {/* The code animation is only triggered after code block animates in */}
              {showCode && (
                <motion.div
                  className="relative z-10"
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AnimatedCode />
                </motion.div>
              )}

              {/* Enhanced floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gold/30 rounded-full blur-xl"
                variants={variants.decor}
                custom={{ delayIdx: 3, styleOpacity: 0.3 }}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 3, repeat: Infinity
                }}
                whileInView={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360]
                }}
              />

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-tech-blue/20 rounded-full blur-xl"
                variants={variants.decor}
                custom={{ delayIdx: 4, styleOpacity: 0.2 }}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 2.5, repeat: Infinity, delay: 0.5
                }}
                whileInView={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [360, 180, 0]
                }}
              />

              <motion.div
                className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-r from-gold to-tech-blue rounded-full"
                variants={variants.decor}
                custom={{ delayIdx: 5, styleOpacity: 1 }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 4, repeat: Infinity }}
                whileInView={{
                  rotate: 360,
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 20px rgba(0,246,255,0.5)",
                    "0 0 40px rgba(176,141,87,0.8)",
                    "0 0 20px rgba(0,246,255,0.5)"
                  ]
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator (shows last) */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={variants.scrollIndicator}
        initial="hidden"
        animate="visible"
        custom={{ delayIdx: 6 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-tech-blue to-gold rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
