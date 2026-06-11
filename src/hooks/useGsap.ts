import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

type GsapSetup = (tools: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void;

/**
 * Runs GSAP animations inside a gsap.context scoped to `scope`, with full
 * cleanup on unmount (kills tweens + ScrollTriggers created in the setup).
 * No-ops entirely when the user prefers reduced motion.
 */
export function useGsap(
  setup: GsapSetup,
  scope?: RefObject<HTMLElement>,
  deps: unknown[] = []
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => setup({ gsap, ScrollTrigger }), scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ...deps]);

  return reducedMotion;
}
