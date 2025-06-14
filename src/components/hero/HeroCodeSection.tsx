
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { heroVariants } from './heroAnimationVariants';
import AnimatedCode from '@/components/effects/AnimatedCode';
import FloatingDecoration from './FloatingDecoration';

const HeroCodeSection: React.FC<{ controls: any }> = ({ controls }) => {
  const [showCode, setShowCode] = useState(false);

  // The code animation is now triggered by the section container animation completing,
  // removing the need for an uncoordinated timer.
  // useEffect(() => {
  //   const timeout = setTimeout(() => setShowCode(true), 1300);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <motion.div
      className="lg:w-1/2"
      variants={heroVariants.code}
      initial="hidden"
      animate={controls}
      custom={{ delayIdx: 7 }} // Phase 5: Code section
      onAnimationComplete={() => setShowCode(true)}
    >
      <div className="relative">
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
        {/* Decorative elements - orchestrated in entrance with controls */}
        <FloatingDecoration
          className="absolute -top-4 -right-4 w-20 h-20 bg-gold/30 rounded-full blur-xl"
          styleOpacity={0.3}
          delayIdx={8} // Phase 6: Code decoration 1
          useControls={controls}
        />
        <FloatingDecoration
          className="absolute -bottom-4 -left-4 w-16 h-16 bg-tech-blue/20 rounded-full blur-xl"
          styleOpacity={0.2}
          delayIdx={9} // Phase 6: Code decoration 2
          useControls={controls}
        />
        <FloatingDecoration
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-r from-gold to-tech-blue rounded-full"
          styleOpacity={1}
          delayIdx={10} // Phase 6: Code decoration 3
          useControls={controls}
        />
      </div>
    </motion.div>
  );
};

export default HeroCodeSection;
