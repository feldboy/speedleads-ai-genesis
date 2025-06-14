
import React from 'react';
import { motion } from 'framer-motion';
import { heroVariants } from './heroAnimationVariants';
import FluidBackground from '@/components/effects/FluidBackground';
import EnhancedParticles from '@/components/effects/EnhancedParticles';
import FloatingDecoration from './FloatingDecoration';

const HeroBackground = ({ controls }: { controls: any }) => (
  <>
    {/* Phase 1: Animated background with coordinated entrance */}
    <motion.div
      className="absolute inset-0"
      variants={heroVariants.background}
      initial="hidden"
      animate={controls}
      custom={{ delayIdx: 0 }}
    >
      <FluidBackground />
      <EnhancedParticles />
    </motion.div>
    
    {/* Phase 6: Floating decorations as part of the assembly sequence */}
    <FloatingDecoration
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-blue rounded-full filter blur-3xl"
      styleOpacity={0.1}
      delayIdx={0}
      useControls={controls}
    />
    <FloatingDecoration
      className="absolute top-3/4 left-3/4 w-96 h-96 bg-gold rounded-full filter blur-3xl"
      styleOpacity={0.05}
      delayIdx={1}
      useControls={controls}
    />
    <FloatingDecoration
      className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-tech-blue/20 rounded-lg"
      delayIdx={2}
      useControls={controls}
    />
  </>
);

export default HeroBackground;
