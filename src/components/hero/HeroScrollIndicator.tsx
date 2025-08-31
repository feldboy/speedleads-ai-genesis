
import React from 'react';
import { motion } from 'framer-motion';
import { heroVariants } from './heroAnimationVariants';

const HeroScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    variants={heroVariants.scrollIndicator}
    initial="hidden"
    animate="visible"
    custom={{ delayIdx: 6 }}
  >
    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
      <motion.div
        className="w-1 h-3 bg-gradient-to-b from-[#00f6ff] to-[#00a7ff] rounded-full mt-2"
        animate={{
          y: [0, 12, 0],
          opacity: [1, 0.3, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  </motion.div>
);

export default HeroScrollIndicator;
