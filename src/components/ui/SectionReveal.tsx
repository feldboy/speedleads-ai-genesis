import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each direct child's reveal */
  stagger?: number;
  /** Seconds before the first child reveals */
  delay?: number;
  /** Wrap each direct child for staggering (true) or reveal as one block (false) */
  staggerChildren?: boolean;
}

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Consistent scroll-triggered reveal for homepage sections: children rise in
 * with a soft stagger the first time they enter the viewport.
 */
const SectionReveal = ({
  children,
  className,
  stagger = 0.12,
  delay = 0,
  staggerChildren = true,
}: SectionRevealProps) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (!staggerChildren) {
    return (
      <motion.div
        className={className}
        variants={blockVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={blockVariants} className={cn('will-change-transform')}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SectionReveal;
