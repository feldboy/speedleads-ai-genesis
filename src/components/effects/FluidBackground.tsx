
import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Animated Gradient Blobs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(0,246,255,0.4) 0%, rgba(176,141,87,0.2) 50%, transparent 100%)'
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(176,141,87,0.4) 0%, rgba(0,246,255,0.2) 50%, transparent 100%)'
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(13,27,42,0.8) 0%, rgba(0,246,255,0.1) 70%, transparent 100%)'
        }}
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-20 h-20 border border-tech-blue/30 rotate-45"
        animate={{
          y: [0, -20, 0],
          rotate: [45, 135, 45],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-16 h-16 border border-gold/40 rounded-full"
        animate={{
          y: [0, 25, 0],
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated Lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            linear-gradient(45deg, transparent 30%, rgba(0,246,255,0.05) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(176,141,87,0.05) 50%, transparent 70%)
          `
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default FluidBackground;
