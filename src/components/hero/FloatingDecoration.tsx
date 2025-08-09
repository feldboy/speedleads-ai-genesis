
import React from 'react';
import { motion } from 'framer-motion';
import { heroVariants } from './heroAnimationVariants';

export interface FloatingDecorationProps {
  className?: string;
  styleOpacity?: number;
  delayIdx?: number;
  children?: React.ReactNode;
  transition?: any;
  whileInView?: any;
  initial?: "hidden" | "visible";
  animate?: "hidden" | "visible";
}

const FloatingDecoration: React.FC<FloatingDecorationProps> = ({
  className = "",
  styleOpacity,
  delayIdx,
  children,
  transition,
  whileInView,
  initial = "hidden",
  animate = "visible",
}) => (
  <motion.div
    className={className}
    variants={heroVariants.decor}
    custom={{ delayIdx, styleOpacity }}
    initial={initial}
    animate={animate}
    transition={transition}
    whileInView={whileInView}
  >
    {children}
  </motion.div>
);

export default FloatingDecoration;
