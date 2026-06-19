import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/hooks/useGsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Brand spotlight that trails the pointer — a soft cyan/gold glow that lifts
 * whatever it passes over out of the dark. Deliberately NOT a distortion or
 * replacement cursor: the native cursor stays, this is just light.
 * Auto-disabled on touch devices and under reduced motion.
 */
const SpotlightCursor = () => {
  const reducedMotion = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Fine pointer only — no spotlight on touch devices
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion || !glowRef.current) return;

    const el = glowRef.current;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      el.style.opacity = '1';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[3] pointer-events-none opacity-0 transition-opacity duration-500"
      style={{
        width: 480,
        height: 480,
        marginTop: -240,
        marginLeft: -240,
        borderRadius: '50%',
        mixBlendMode: 'screen',
        background:
          'radial-gradient(circle, rgba(0, 246, 255, 0.07) 0%, rgba(176, 141, 87, 0.04) 35%, transparent 70%)',
      }}
    />
  );
};

export default SpotlightCursor;
