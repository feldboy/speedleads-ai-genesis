import React from 'react';
import { motion } from 'framer-motion';

const HeroScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1.8 }}
  >
    <span className="eyebrow text-ivory/35">Scroll</span>
    <div className="w-px h-12 relative overflow-hidden bg-ivory/10">
      <motion.div
        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-champagne to-transparent"
        animate={{ y: ['-100%', '220%'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </motion.div>
);

export default HeroScrollIndicator;
