import React from 'react';
import { motion } from 'framer-motion';
import { heroVariants } from './heroAnimationVariants';
import ParticleVortex from '@/components/effects/ParticleVortex';
import FloatingDecoration from './FloatingDecoration';

const HeroBackground = () => (
  <>
    {/* Particle Vortex Background */}
    <motion.div
      className="absolute inset-0"
      initial="hidden"
      animate="visible"
      custom={{ delayIdx: 0 }}
      variants={heroVariants.background}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A] via-[#0a1628] to-[#0D1B2A]" />
      <ParticleVortex />
    </motion.div>
    {/* Floating blurred tech-blue/gold backgrounds */}
    <FloatingDecoration
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-blue rounded-full filter blur-3xl"
      styleOpacity={0.08}
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
      styleOpacity={0.04}
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
  </>
);

export default HeroBackground;
