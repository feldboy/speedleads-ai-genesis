import React, { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface KineticHeadingProps {
  children: string;
  /** Heading element to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  /**
   * 'word' (default) keeps Hebrew letterforms intact; 'char' is for
   * numerals/Latin only — never split Hebrew by character.
   */
  splitBy?: 'word' | 'char';
  /** Apply the animated brand gradient to the text */
  gradient?: boolean;
  /** Seconds before the stagger starts */
  delay?: number;
  /** Animate only the first time it enters the viewport */
  once?: boolean;
}

const containerVariants = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
});

const pieceVariants: Variants = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Kinetic headline: staggered word/char reveal. In RTL the DOM order is the
 * visual right-to-left order, so a plain index stagger reads correctly for
 * Hebrew (first revealed word is the rightmost).
 */
const KineticHeading = ({
  children,
  as: Tag = 'h2',
  className,
  splitBy = 'word',
  gradient = false,
  delay = 0,
  once = true,
}: KineticHeadingProps) => {
  const reducedMotion = useReducedMotion();

  const pieces = useMemo(
    () => (splitBy === 'word' ? children.split(' ') : Array.from(children)),
    [children, splitBy]
  );

  if (reducedMotion) {
    return (
      <Tag className={cn('font-display', gradient && 'text-brand-gradient', className)}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={cn('font-display', className)}
      variants={containerVariants(delay, splitBy === 'word' ? 0.08 : 0.03)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
      aria-label={children}
    >
      {pieces.map((piece, i) => (
        <React.Fragment key={`${piece}-${i}`}>
          <motion.span
            variants={pieceVariants}
            aria-hidden="true"
            className={cn('inline-block will-change-transform', gradient && 'text-brand-gradient')}
          >
            {piece}
          </motion.span>
          {/* Word gap must live outside the inline-block span or it collapses */}
          {splitBy === 'word' && i < pieces.length - 1 && ' '}
        </React.Fragment>
      ))}
    </MotionTag>
  );
};

export default KineticHeading;
