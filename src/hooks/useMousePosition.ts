import { useEffect, useRef } from 'react';

export interface MousePoint {
  x: number;
  y: number;
  /** normalized -1..1, x positive to the right */
  nx: number;
  /** normalized -1..1, y positive downward */
  ny: number;
  active: boolean;
}

/**
 * Shared rAF-throttled mouse tracker. Returns a mutable ref (no re-renders) —
 * consumers read it inside their own animation loops.
 */
export function useMousePosition() {
  const point = useRef<MousePoint>({ x: 0, y: 0, nx: 0, ny: 0, active: false });

  useEffect(() => {
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const p = point.current;
        p.x = e.clientX;
        p.y = e.clientY;
        p.nx = (e.clientX / window.innerWidth) * 2 - 1;
        p.ny = (e.clientY / window.innerHeight) * 2 - 1;
        p.active = true;
      });
    };

    const onLeave = () => {
      point.current.active = false;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return point;
}
