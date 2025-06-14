
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import HeroBackground from '../hero/HeroBackground';
import HeroContent from '../hero/HeroContent';
import HeroCodeSection from '../hero/HeroCodeSection';
import HeroScrollIndicator from '../hero/HeroScrollIndicator';
import { heroVariants } from '../hero/heroAnimationVariants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HeroSection = () => {
  const reducedMotion = useReducedMotion();
  const controls = useAnimation();

  React.useEffect(() => {
    if (reducedMotion) {
      controls.set("visible");
      return;
    }
    controls.set("hidden");
    controls.start("visible");
  }, [controls, reducedMotion]);

  return (
    <motion.section
      initial={reducedMotion ? false : "hidden"}
      animate={controls}
      variants={heroVariants.hero}
      className="relative min-h-screen flex items-center bg-gradient-to-br from-dark via-gray-900 to-dark overflow-hidden"
    >
      <HeroBackground />

      <div className="container mx-auto py-20 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <HeroContent />
          <HeroCodeSection />
        </div>
      </div>

      <HeroScrollIndicator />
    </motion.section>
  );
};

export default HeroSection;
