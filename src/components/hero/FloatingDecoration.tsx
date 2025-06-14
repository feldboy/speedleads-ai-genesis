
import React from 'react';
import { motion } from 'framer-motion';
import { heroVariants } from './heroAnimationVariants';

export interface FloatingDecorationProps {
  className?: string;
  styleOpacity?: number;
  delayIdx?: number;
  children?: React.ReactNode;
  useControls?: any;
}

const FloatingDecoration: React.FC<FloatingDecorationProps> = ({
  className = "",
  styleOpacity,
  delayIdx,
  children,
  useControls,
}) => (
  <motion.div
    className={className}
    variants={heroVariants.decor}
    initial="hidden"
    animate={useControls}
    custom={{ delayIdx, styleOpacity }}
  >
    {children}
  </motion.div>
);

export default FloatingDecoration;
