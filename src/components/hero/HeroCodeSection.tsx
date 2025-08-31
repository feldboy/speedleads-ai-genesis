
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { heroVariants } from './heroAnimationVariants';
import AnimatedCode from '@/components/effects/AnimatedCode';
import FloatingDecoration from './FloatingDecoration';

const HeroCodeSection: React.FC = () => {
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowCode(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className="lg:w-1/2"
      variants={heroVariants.code}
      initial="hidden"
      animate="visible"
      custom={{ delayIdx: 3 }}
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
        {/* Enhanced floating decorative elements */}
        <FloatingDecoration
          className="absolute -top-4 -right-4 w-20 h-20 bg-gold/30 rounded-full blur-xl"
          styleOpacity={0.3}
          delayIdx={3}
          transition={{
            duration: 3, repeat: Infinity
          }}
          whileInView={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
        />
        <FloatingDecoration
          className="absolute -bottom-4 -left-4 w-16 h-16 bg-tech-blue/20 rounded-full blur-xl"
          styleOpacity={0.2}
          delayIdx={4}
          transition={{
            duration: 2.5, repeat: Infinity, delay: 0.5
          }}
          whileInView={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [360, 180, 0]
          }}
        />
        <FloatingDecoration
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] rounded-full"
          styleOpacity={1}
          delayIdx={5}
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
  );
};

export default HeroCodeSection;
