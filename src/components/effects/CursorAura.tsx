import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]';

/**
 * CursorAura — additive custom cursor: a cyan dot that sticks to the pointer
 * and a lagging ring that expands and turns gold over interactive elements.
 * Renders nothing on touch devices or under reduced motion; the native
 * cursor is never hidden.
 */
const CursorAura = () => {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      ring.classList.toggle('is-hovering', !!target.closest?.(INTERACTIVE));
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      const half = ring.offsetWidth / 2;
      ring.style.transform = `translate3d(${rx - half}px, ${ry - half}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-aura-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="cursor-aura-ring" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
};

export default CursorAura;
