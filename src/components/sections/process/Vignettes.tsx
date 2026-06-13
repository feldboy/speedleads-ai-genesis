import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Live vignettes — each process station contains a tiny working demo of
 * itself (the section sells motion design by *being* motion design).
 * Every vignette loops while mounted and renders its final frame statically
 * under reduced motion. All cyan, all CSS/SVG/framer — no WebGL here.
 */

const LOOP = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  repeatDelay: 1.2,
});

/** 1 — שיחת אפיון: chat bubbles typing in */
const DiscoveryChat = () => {
  const reduced = useReducedMotion();
  const bubbles = [
    { text: 'מה המטרה המרכזית של האתר?', side: 'right' as const },
    { text: 'יותר לידים, פחות עבודה ידנית', side: 'left' as const },
    { text: 'מצוין. יש לנו תכנית בשבילכם', side: 'right' as const },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-5" dir="rtl">
      {bubbles.map((b, i) => (
        <motion.div
          key={b.text}
          className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-snug ${
            b.side === 'right'
              ? 'self-start rounded-tr-sm bg-tech-blue/15 border border-tech-blue/30 text-cyan-100'
              : 'self-end rounded-tl-sm bg-white/10 border border-white/15 text-white/85'
          }`}
          initial={reduced ? false : { opacity: 0, y: 10, scale: 0.92 }}
          animate={reduced ? undefined : { opacity: [0, 1, 1, 0], y: [10, 0, 0, -4], scale: [0.92, 1, 1, 1] }}
          transition={reduced ? undefined : { ...LOOP(7), delay: i * 1.1, times: [0, 0.08, 0.85, 1] }}
        >
          {b.text}
        </motion.div>
      ))}
    </div>
  );
};

/** 2 — אסטרטגיה ומסרים: message hierarchy linking up */
const StrategyMap = () => {
  const reduced = useReducedMotion();
  const lines = [
    'M 50 14 L 18 46',
    'M 50 14 L 50 46',
    'M 50 14 L 82 46',
  ];
  const nodes = [
    { cx: 50, cy: 14, r: 5 },
    { cx: 18, cy: 46, r: 3.5 },
    { cx: 50, cy: 46, r: 3.5 },
    { cx: 82, cy: 46, r: 3.5 },
  ];
  return (
    <div className="flex h-full items-center justify-center">
      <svg viewBox="0 0 100 60" className="h-[80%] w-auto" fill="none">
        {lines.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="rgba(0, 246, 255, 0.55)"
            strokeWidth="1"
            initial={reduced ? false : { pathLength: 0 }}
            animate={reduced ? undefined : { pathLength: [0, 1, 1, 0] }}
            transition={reduced ? undefined : { ...LOOP(6), delay: 0.6 + i * 0.35, times: [0, 0.2, 0.85, 1] }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={`${n.cx}-${n.cy}`}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={i === 0 ? '#00F6FF' : 'rgba(0, 167, 255, 0.85)'}
            style={{ filter: 'drop-shadow(0 0 4px rgba(0,246,255,0.7))' }}
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={reduced ? undefined : { scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={reduced ? undefined : { ...LOOP(6), delay: i * 0.4, times: [0, 0.12, 0.88, 1] }}
          />
        ))}
      </svg>
    </div>
  );
};

/** 3 — עיצוב: a wireframe that draws itself, then blooms */
const WireframeDraw = () => {
  const reduced = useReducedMotion();
  const strokes = [
    { el: 'rect', props: { x: 6, y: 6, width: 88, height: 48, rx: 3 } },
    { el: 'line', props: { x1: 6, y1: 18, x2: 94, y2: 18 } },
    { el: 'rect', props: { x: 58, y: 25, width: 28, height: 8, rx: 2 } },
    { el: 'line', props: { x1: 58, y1: 40, x2: 86, y2: 40 } },
    { el: 'line', props: { x1: 64, y1: 46, x2: 86, y2: 46 } },
  ];
  return (
    <div className="flex h-full items-center justify-center">
      <svg viewBox="0 0 100 60" className="h-[80%] w-auto" fill="none">
        {strokes.map((s, i) => {
          const shared = {
            stroke: 'rgba(0, 246, 255, 0.6)',
            strokeWidth: 1,
            initial: reduced ? (false as const) : { pathLength: 0 },
            animate: reduced ? undefined : { pathLength: [0, 1, 1, 0] },
            transition: reduced ? undefined : { ...LOOP(6.5), delay: i * 0.45, times: [0, 0.18, 0.88, 1] },
          };
          return s.el === 'rect' ? (
            <motion.rect key={i} {...(s.props as React.SVGProps<SVGRectElement>)} {...shared} />
          ) : (
            <motion.line key={i} {...(s.props as React.SVGProps<SVGLineElement>)} {...shared} />
          );
        })}
        {/* The hero block blooms with color once the frame is drawn */}
        <motion.rect
          x={10}
          y={25}
          width={42}
          height={24}
          rx={2}
          fill="rgba(0, 167, 255, 0.30)"
          initial={reduced ? { opacity: 0.5 } : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: [0, 0, 0.9, 0.9, 0] }}
          transition={reduced ? undefined : { ...LOOP(6.5), times: [0, 0.4, 0.55, 0.88, 1] }}
        />
      </svg>
    </div>
  );
};

/** 4 — אינטראקציות ותנועה: a ghost cursor demos a magnetic button */
const InteractionDemo = () => {
  const reduced = useReducedMotion();
  return (
    <div className="relative flex h-full items-center justify-center">
      <motion.div
        className="relative rounded-full border border-tech-blue/50 bg-tech-blue/10 px-6 py-2 text-sm text-cyan-100"
        animate={reduced ? undefined : { scale: [1, 1, 1.12, 1.12, 1], x: [0, 0, -4, -4, 0] }}
        transition={reduced ? undefined : { ...LOOP(5), times: [0, 0.42, 0.5, 0.8, 1] }}
      >
        לחצו כאן
        {/* ripple on "press" */}
        {!reduced && (
          <motion.span
            className="absolute inset-0 rounded-full border border-cyan-300/70"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: [0, 0.8, 0], scale: [1, 1.7, 2.1] }}
            transition={{ ...LOOP(5), delay: 2.6, times: [0, 0.25, 1], duration: 1.2 }}
          />
        )}
      </motion.div>
      {/* ghost cursor */}
      {!reduced && (
        <motion.div
          className="absolute h-3.5 w-3.5 rounded-full bg-cyan-300"
          style={{ boxShadow: '0 0 10px rgba(0,246,255,0.9)' }}
          initial={{ x: 90, y: 45, opacity: 0 }}
          animate={{
            x: [90, 14, 8, 8, 90],
            y: [45, 8, 4, 4, 45],
            opacity: [0, 1, 1, 1, 0],
            scale: [1, 1, 0.7, 1, 1],
          }}
          transition={{ ...LOOP(5), times: [0, 0.4, 0.5, 0.8, 1] }}
        />
      )}
    </div>
  );
};

/** 5 — פיתוח: code typing itself */
const CodeTyping = () => {
  const reduced = useReducedMotion();
  const lines = [
    { text: 'const site = await build({', color: 'text-cyan-300' },
    { text: '  speed: "blazing",', color: 'text-white/70' },
    { text: '  leads: Infinity,', color: 'text-white/70' },
    { text: '});  // ✓ deployed', color: 'text-emerald-300/90' },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-6 font-mono text-[13px]" dir="ltr">
      {lines.map((l, i) => (
        <div key={l.text} className="overflow-hidden whitespace-nowrap">
          <motion.span
            className={`inline-block ${l.color}`}
            initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
            animate={reduced ? undefined : { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)', 'inset(0 100% 0 0)'] }}
            transition={reduced ? undefined : { ...LOOP(7), delay: i * 0.9, times: [0, 0.15, 0.85, 1], ease: 'linear' }}
          >
            {l.text}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

/** 6 — בדיקות והשקה: checks tick, then the launch pulse */
const LaunchPulse = () => {
  const reduced = useReducedMotion();
  const checks = ['מהירות', 'מובייל', 'SEO'];
  return (
    <div className="flex h-full items-center justify-around px-5" dir="rtl">
      <div className="flex flex-col gap-2">
        {checks.map((c, i) => (
          <motion.div
            key={c}
            className="flex items-center gap-2 text-sm text-white/80"
            initial={reduced ? false : { opacity: 0, x: 8 }}
            animate={reduced ? undefined : { opacity: [0, 1, 1, 0], x: [8, 0, 0, 0] }}
            transition={reduced ? undefined : { ...LOOP(6), delay: i * 0.5, times: [0, 0.1, 0.88, 1] }}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-tech-blue/20 text-[10px] text-cyan-300">✓</span>
            {c}
          </motion.div>
        ))}
      </div>
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="h-3 w-3 rounded-full bg-cyan-300" style={{ boxShadow: '0 0 12px rgba(0,246,255,0.9)' }} />
        {!reduced &&
          [0, 1, 2].map((ring) => (
            <motion.span
              key={ring}
              className="absolute inset-0 rounded-full border border-cyan-300/50"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 0.7, 0], scale: [0.3, 1.4, 1.9] }}
              transition={{ duration: 2.4, delay: 1.6 + ring * 0.55, repeat: Infinity, repeatDelay: 1.2, ease: 'easeOut' }}
            />
          ))}
      </div>
    </div>
  );
};

export const VIGNETTES = [DiscoveryChat, StrategyMap, WireframeDraw, InteractionDemo, CodeTyping, LaunchPulse];
