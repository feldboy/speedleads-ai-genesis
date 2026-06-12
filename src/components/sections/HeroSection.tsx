import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import HeroContent from '../hero/HeroContent';
import AutomationFeed from '../hero/AutomationFeed';
import HeroScrollIndicator from '../hero/HeroScrollIndicator';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HeroSection = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // mouse parallax — content drifts slightly, the feed panel drifts opposite
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const contentX = useTransform(smx, (v) => v * -6);
  const contentY = useTransform(smy, (v) => v * -4);
  const panelX = useTransform(smx, (v) => v * 14);
  const panelY = useTransform(smy, (v) => v * 10);

  const onMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* aurora glows */}
      <div
        className="aurora-blob -top-40 right-[8%] w-[34rem] h-[34rem]"
        style={{ background: 'radial-gradient(circle, rgba(0, 246, 255, 0.09) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="aurora-blob aurora-blob-slow -bottom-32 left-[4%] w-[42rem] h-[42rem]"
        style={{ background: 'radial-gradient(circle, rgba(212, 175, 122, 0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container mx-auto pt-32 pb-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-10">
          <motion.div style={reducedMotion ? undefined : { x: contentX, y: contentY }} className="w-full lg:w-7/12">
            <HeroContent />
          </motion.div>

          <motion.div
            style={reducedMotion ? undefined : { x: panelX, y: panelY }}
            className="w-full lg:w-5/12 flex justify-center lg:justify-start"
            initial={reducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <AutomationFeed />
          </motion.div>
        </div>
      </div>

      <HeroScrollIndicator />
    </section>
  );
};

export default HeroSection;
