import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/hooks/useGsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fx, hexToRgba, subscribeFx } from '@/lib/effectsConfig';

/**
 * The site's pointer language, one system, three layers:
 *  - core: a 6px cyan dot glued to the pointer
 *  - ring: a lagging halo that breathes over interactive elements —
 *    expands + brightens on links/buttons, collapses to a beam on text fields
 *  - light: a wide soft spotlight that lifts content out of the dark
 * The native cursor is hidden on fine pointers only; touch devices and
 * reduced-motion users keep the OS cursor and skip all of this.
 */

const INTERACTIVE = 'a, button, [role="button"], [data-cursor="pull"]';
const TEXTUAL = 'input, textarea, select, [contenteditable="true"]';

const CursorCore = () => {
  const reducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const light = lightRef.current;
    if (!enabled || reducedMotion || !dot || !ring || !light) return;

    document.documentElement.classList.add('cursor-core-active');

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    const lightX = gsap.quickTo(light, 'x', { duration: 0.6, ease: 'power3.out' });
    const lightY = gsap.quickTo(light, 'y', { duration: 0.6, ease: 'power3.out' });

    let visible = false;
    let mode: 'idle' | 'pull' | 'beam' = 'idle';

    const applyMode = (next: typeof mode) => {
      const halo = fx.cursorHalo;
      const size = fx.cursorSize; // scales the core dot
      if (next === 'pull') {
        gsap.to(ring, { scale: 1.8 * halo, opacity: 1, borderColor: hexToRgba(fx.cursorColor, 0.9), duration: 0.35, ease: 'back.out(2)' });
        gsap.to(dot, { scale: 0.5 * size, duration: 0.35, ease: 'power2.out' });
      } else if (next === 'beam') {
        gsap.to(ring, { scale: 0.5 * halo, opacity: 0.9, borderColor: hexToRgba(fx.cursorColor, 0.6), duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 1.6 * size, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(ring, { scale: halo, opacity: 0.65, borderColor: hexToRgba(fx.cursorColor, 0.45), duration: 0.35, ease: 'power2.out' });
        gsap.to(dot, { scale: size, duration: 0.35, ease: 'power2.out' });
      }
    };

    // Panel tuning (color, sizes, spotlight) applies live
    const applyTheme = () => {
      const c = fx.cursorColor;
      dot.style.background = c;
      dot.style.boxShadow = `0 0 8px ${hexToRgba(c, 0.9)}`;
      ring.style.boxShadow = `0 0 12px ${hexToRgba(c, 0.25)} inset, 0 0 12px ${hexToRgba(c, 0.15)}`;
      light.style.background = `radial-gradient(circle, ${hexToRgba(c, 0.08 * fx.cursorSpotlight)} 0%, ${hexToRgba(c, 0.04 * fx.cursorSpotlight)} 35%, transparent 70%)`;
      gsap.set(light, { scale: fx.cursorSpotlightSize }); // spotlight radius
      applyMode(mode);
    };
    applyTheme();
    const unsubscribeFx = subscribeFx(applyTheme);

    const setMode = (next: typeof mode) => {
      if (next === mode) return;
      mode = next;
      applyMode(next);
    };

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      lightX(e.clientX);
      lightY(e.clientY);
      if (!visible) {
        visible = true;
        gsap.to([dot, ring, light], { opacity: (i: number) => [1, 0.65, 1][i], duration: 0.3 });
      }
      const el = e.target instanceof Element ? e.target : null;
      if (el?.closest(TEXTUAL)) setMode('beam');
      else if (el?.closest(INTERACTIVE)) setMode('pull');
      else setMode('idle');
    };

    const onDown = () => gsap.to(ring, { scale: (mode === 'pull' ? 1.4 : 0.8) * fx.cursorHalo, duration: 0.15, ease: 'power2.out' });
    const onUp = () => applyMode(mode);
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring, light], { opacity: 0, duration: 0.4 });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.documentElement.classList.remove('cursor-core-active');
      unsubscribeFx();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf([dot, ring, light]);
    };
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return (
    <>
      {/* Wide spotlight — lifts whatever the pointer passes over out of the dark */}
      <div
        ref={lightRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[3] pointer-events-none opacity-0"
        style={{
          width: 480,
          height: 480,
          marginTop: -240,
          marginLeft: -240,
          borderRadius: '50%',
          mixBlendMode: 'screen',
          background: 'radial-gradient(circle, rgba(0, 246, 255, 0.08) 0%, rgba(0, 167, 255, 0.04) 35%, transparent 70%)',
        }}
      />
      {/* Lagging halo */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[60] pointer-events-none opacity-0"
        style={{
          width: 36,
          height: 36,
          marginTop: -18,
          marginLeft: -18,
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 246, 255, 0.45)',
          boxShadow: '0 0 12px rgba(0, 246, 255, 0.25) inset, 0 0 12px rgba(0, 246, 255, 0.15)',
        }}
      />
      {/* Core dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[60] pointer-events-none opacity-0"
        style={{
          width: 6,
          height: 6,
          marginTop: -3,
          marginLeft: -3,
          borderRadius: '50%',
          background: '#00F6FF',
          boxShadow: '0 0 8px rgba(0, 246, 255, 0.9)',
        }}
      />
    </>
  );
};

export default CursorCore;
