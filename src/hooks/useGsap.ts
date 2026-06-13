import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Web-font swap (Heebo/Suez One) reflows every section AFTER ScrollTrigger's
// load-time measurement, leaving pinned-scrub start/end stale — the Process
// snap points then miss their card centers. `fonts.ready` alone is not
// enough (it resolves immediately if no font has STARTED loading yet), so
// also re-measure after every completed font-load batch.
if (typeof document !== 'undefined' && document.fonts) {
  void document.fonts.ready.then(() => ScrollTrigger.refresh());
  document.fonts.addEventListener('loadingdone', () => ScrollTrigger.refresh());
}

// Dev-only: lets browser-automation checks introspect trigger state
if (import.meta.env.DEV && typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__ScrollTrigger = ScrollTrigger;
  (window as unknown as Record<string, unknown>).__gsap = gsap;
}

export { gsap, ScrollTrigger };

type GsapSetup = (tools: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void | (() => void);

/**
 * Runs GSAP animations inside a gsap.context scoped to `scope`, with full
 * cleanup on unmount (kills tweens + ScrollTriggers created in the setup).
 * The setup may return a cleanup function for anything gsap.context can't
 * revert itself (event listeners, timers). No-ops under reduced motion.
 */
export function useGsap(
  setup: GsapSetup,
  scope?: RefObject<HTMLElement>,
  deps: unknown[] = []
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = setup({ gsap, ScrollTrigger });
    }, scope?.current ?? undefined);
    return () => {
      cleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ...deps]);

  return reducedMotion;
}
