import React, { useCallback, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radius of the cursor spotlight in px */
  spotlightSize?: number;
  /** Spotlight tint — defaults to brand cyan */
  spotlightColor?: string;
  /** Enable the subtle 3D tilt toward the cursor */
  tilt?: boolean;
}

/**
 * Glass 2.0 card: liquid glass surface + rotating conic glow border
 * (.glow-border, css-driven) + cursor spotlight + optional tilt.
 * The kinetic successor to MagicCard for all homepage cards.
 */
const GlowCard = ({
  children,
  className,
  spotlightSize = 320,
  spotlightColor = 'rgba(0, 246, 255, 0.10)',
  tilt = false,
  ...props
}: GlowCardProps) => {
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-spotlightSize);
  const mouseY = useMotionValue(-spotlightSize);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      if (tilt) {
        rotateY.set(((x - rect.width / 2) / rect.width) * 6);
        rotateX.set(((rect.height / 2 - y) / rect.height) * 6);
      }
    },
    [reducedMotion, tilt, mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-spotlightSize);
    mouseY.set(-spotlightSize);
    rotateX.set(0);
    rotateY.set(0);
  }, [spotlightSize, mouseX, mouseY, rotateX, rotateY]);

  const spotlight = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt && !reducedMotion ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={cn(
        'group relative overflow-hidden rounded-2xl glass-liquid glow-border',
        className
      )}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default GlowCard;
