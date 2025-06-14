
import React from 'react';
import { motion } from 'framer-motion';
import { heroVariants } from './heroAnimationVariants';
import FluidBackground from '@/components/effects/FluidBackground';
import EnhancedParticles from '@/components/effects/EnhancedParticles';
import FloatingDecoration from './FloatingDecoration';

const HeroBackground = () => (
  <>
    {/* Main Fluid + Particles Animated BG */}
    <motion.div
      className="absolute inset-0"
      initial="hidden"
      animate="visible"
      custom={{ delayIdx: 0 }}
      variants={heroVariants.background}
    >
      <FluidBackground />
      <EnhancedParticles />
    </motion.div>
    {/* Floating blurred tech-blue/gold backgrounds */}
    <FloatingDecoration
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-blue rounded-full filter blur-3xl"
      styleOpacity={0.1}
      delayIdx={0}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileInView={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        x: [0, 50, 0],
        y: [0, -30, 0]
      }}
    />
    <FloatingDecoration
      className="absolute top-3/4 left-3/4 w-96 h-96 bg-gold rounded-full filter blur-3xl"
      styleOpacity={0.05}
      delayIdx={1}
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
    <FloatingDecoration
      className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-tech-blue/20"
      delayIdx={2}
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
  </>
);

export default HeroBackground;
