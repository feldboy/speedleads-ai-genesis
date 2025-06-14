
import React, { useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
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

// Animation Variants
const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, when: "beforeChildren" } }
};

const bgVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const headlineVariants = {
  hidden: { opacity: 0, x: -70, scale: 0.92 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const subHeadlineVariants = {
  hidden: { opacity: 0, x: 70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

const ctaVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.32, duration: 0.57 } }
};

const codeVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.93 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, type: "spring", bounce: 0.25 } }
};

const decorVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 0.7, scale: 1, transition: { duration: 0.6, type: "spring", bounce: 0.1 } }
};

const scrollIndicatorVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } }
};

const HeroSection = () => {
  const reducedMotion = useReducedMotion();

  // Framer Motion animation controls for sequencing
  const controls = useAnimation();

  useEffect(() => {
    if (reducedMotion) {
      controls.set("visible");
      return;
    }
    // Replay assemble animation on mount
    controls.set("hidden");
    controls.start("visible");
  }, [controls, reducedMotion]);

  return (
    <motion.section
      initial={reducedMotion ? false : "hidden"}
      animate={controls}
      variants={heroVariants}
      className="relative min-h-screen flex items-center bg-gradient-to-br from-dark via-gray-900 to-dark overflow-hidden"
    >
      {/* Animated Gradient/Particles Background */}
      <motion.div variants={bgVariants}>
        <FluidBackground />
        <EnhancedParticles />
      </motion.div>

      {/* Additional Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          variants={decorVariants}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-blue rounded-full opacity-10 filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          variants={decorVariants}
          className="absolute top-3/4 left-3/4 w-96 h-96 bg-gold rounded-full opacity-5 filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Morphing Shapes */}
        <motion.div
          variants={decorVariants}
          className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-tech-blue/20"
          animate={{
            borderRadius: ["0%", "50%", "0%"],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto py-20 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column: Headline, Subheadline, CTAs */}
          <div className="lg:w-1/2 text-center lg:text-right mb-10 lg:mb-0">
            <motion.h1
              variants={headlineVariants}
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
              <TypewriterText
                texts={aiTexts}
                className="gradient-text"
              />
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
              variants={subHeadlineVariants}
              className="text-xl text-gray-300 mb-8"
            >
              פתרונות AI מתקדמים לבניית אתרים, אוטומציות עסקיות ואינטגרציות חכמות –
              שנועדו להזניק את העסק שלך קדימה.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={ctaVariants}
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

          {/* Right Column: Animated Code Box */}
          <motion.div
            className="lg:w-1/2"
            variants={codeVariants}
          >
            <div className="relative">
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

              {/* Enhanced floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gold/30 rounded-full blur-xl"
                variants={decorVariants}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-tech-blue/20 rounded-full blur-xl"
                variants={decorVariants}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />

              <motion.div
                className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-r from-gold to-tech-blue rounded-full"
                variants={decorVariants}
                animate={{
                  rotate: 360,
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 20px rgba(0,246,255,0.5)",
                    "0 0 40px rgba(176,141,87,0.8)",
                    "0 0 20px rgba(0,246,255,0.5)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={scrollIndicatorVariants}
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
