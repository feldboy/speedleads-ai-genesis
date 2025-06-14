
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { heroVariants } from './heroAnimationVariants';
import AnimatedCode from '@/components/effects/AnimatedCode';
import FloatingDecoration from './FloatingDecoration';

const HeroCodeSection: React.FC<{ controls: any }> = ({ controls }) => {
  const [showCode, setShowCode] = useState(false);

  // Show code after the code section animates in (coordinated timing)
  useEffect(() => {
    const timeout = setTimeout(() => setShowCode(true), 1400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className="lg:w-1/2"
      variants={heroVariants.code}
      initial="hidden"
      animate={controls}
      custom={{ delayIdx: 0 }}
    >
      <div className="relative">
        {showCode && (
          <motion.div
            className="relative z-10"
            animate={{
              y: [0, -10, 0],
              rotateY: [0, 5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5 
            }}
          >
            <AnimatedCode />
          </motion.div>
        )}
        
        <FloatingDecoration
          className="absolute -top-4 -right-4 w-20 h-20 bg-gold/30 rounded-full blur-xl"
          styleOpacity={0.3}
          delayIdx={3}
          useControls={controls}
        />
        <FloatingDecoration
          className="absolute -bottom-4 -left-4 w-16 h-16 bg-tech-blue/20 rounded-full blur-xl"
          styleOpacity={0.2}
          delayIdx={4}
          useControls={controls}
        />
        <FloatingDecoration
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-r from-gold to-tech-blue rounded-full"
          styleOpacity={1}
          delayIdx={5}
          useControls={controls}
        />
      </div>
    </motion.div>
  );
};

export default HeroCodeSection;
