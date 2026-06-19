import { useRef } from 'react';
import { useGsap } from '@/hooks/useGsap';

/**
 * The Signal (האות) — the site's unifying motif: one thread of light, a lead
 * traveling through the funnel. An SVG path spanning the whole page, drawn by
 * scroll progress (ScrollTrigger scrub on stroke-dashoffset), weaving across
 * section boundaries and terminating at the contact section.
 *
 * Render once inside a `position: relative` wrapper around <main>.
 * Replaces the old `.section-divider` elements.
 */

// Normalized space: x 0-100, y 0-1000 across the full page height (RTL: high x = right edge).
const SIGNAL_PATH = [
  'M 50 2',
  'C 60 40, 94 60, 94 110',
  'C 94 150, 70 165, 50 175',
  'C 20 190, 6 210, 6 260',
  'C 6 310, 94 325, 94 380',
  'C 94 440, 80 470, 50 490',
  'C 16 515, 6 545, 6 600',
  'C 6 660, 94 680, 94 740',
  'C 94 800, 60 830, 50 870',
  'C 45 920, 50 950, 50 990',
].join(' ');

const SignalThread = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const reducedMotion = useGsap(({ gsap }) => {
    const svg = svgRef.current;
    const path = svg?.querySelector<SVGPathElement>('[data-signal-draw]');
    const comet = svg?.querySelector<SVGCircleElement>('[data-signal-comet]');
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          if (!comet) return;
          const tip = path.getPointAtLength(self.progress * length);
          comet.setAttribute('cx', String(tip.x));
          comet.setAttribute('cy', String(tip.y));
          comet.setAttribute('opacity', self.progress > 0.005 ? '1' : '0');
        },
      },
    });
  }, undefined);

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="signal-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1000">
            <stop offset="0" stopColor="#00F6FF" />
            <stop offset="0.45" stopColor="#00A7FF" />
            <stop offset="0.75" stopColor="#643CDC" />
            <stop offset="1" stopColor="#B08D57" />
          </linearGradient>
        </defs>

        {/* Faint full track — where the signal will travel */}
        <path
          d={SIGNAL_PATH}
          stroke="rgba(0, 246, 255, 0.08)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {!reducedMotion && (
          <>
            {/* The drawn signal, scrubbed by scroll */}
            <path
              data-signal-draw
              className="signal-path"
              d={SIGNAL_PATH}
              stroke="url(#signal-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* The comet at the signal's tip */}
            <circle data-signal-comet className="signal-path" r="0.6" fill="#00F6FF" opacity="0" />
          </>
        )}
      </svg>
    </div>
  );
};

export default SignalThread;
