import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Thin gold→cyan beam across the very top, charting scroll progress. */
const ScrollProgress = () => {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  if (reducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[55] origin-right"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #00f6ff 0%, #D4AF7A 50%, #E8CB9E 100%)',
        boxShadow: '0 0 12px rgba(212, 175, 122, 0.5)',
      }}
    />
  );
};

export default ScrollProgress;
