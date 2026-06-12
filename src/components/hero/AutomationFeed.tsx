import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FeedLine {
  text: string;
  time: string;
}

const FEED: FeedLine[] = [
  { text: 'ליד חדש נקלט מהאתר', time: '0.4s' },
  { text: 'הבוט פתח שיחה בוואטסאפ', time: '1.2s' },
  { text: 'הליד סווג אוטומטית: חם', time: '0.2s' },
  { text: 'נוצר כרטיס לקוח ב-CRM', time: '0.3s' },
  { text: 'נקבעה פגישה ביומן', time: '2.1s' },
  { text: 'סיכום נשלח למנהל המכירות', time: '0.5s' },
];

const STEP_MS = 1400;
const HOLD_MS = 3500;

/**
 * AutomationFeed — a live ops terminal that *shows* what SpeedLeads builds:
 * a lead arrives, the bot answers, the CRM updates, a meeting lands.
 */
const AutomationFeed = () => {
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(reducedMotion ? FEED.length : 0);

  useEffect(() => {
    if (reducedMotion) {
      setCount(FEED.length);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    if (count < FEED.length) {
      timer = setTimeout(() => setCount((c) => c + 1), STEP_MS);
    } else {
      timer = setTimeout(() => setCount(0), HOLD_MS);
    }
    return () => clearTimeout(timer);
  }, [count, reducedMotion]);

  return (
    <div className="card-obsidian hud-corners relative w-full max-w-md p-0 overflow-hidden">
      <span className="hud-bracket" aria-hidden="true" />
      <span className="hud-bracket" aria-hidden="true" />
      <span className="hud-bracket" aria-hidden="true" />
      <span className="hud-bracket" aria-hidden="true" />

      {/* Title bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-ivory/10" dir="ltr">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-ivory/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-ivory/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-champagne/50" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-tech text-[0.65rem] tracking-[0.2em] text-ivory/50">
            SPEEDLEADS · LIVE OPS
          </span>
          <span className="live-dot" />
        </div>
      </div>

      {/* Feed */}
      <div className="px-5 py-5 min-h-[252px] flex flex-col gap-3" aria-hidden="true">
        <AnimatePresence>
          {FEED.slice(0, count).map((line) => (
            <motion.div
              key={line.text}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="flex items-center gap-2.5 text-ivory/85">
                <span className="text-champagne font-tech">&lsaquo;</span>
                {line.text}
              </span>
              <span className="flex items-center gap-1.5 shrink-0 font-tech text-xs text-tech-blue/80" dir="ltr">
                <Check className="w-3.5 h-3.5 text-champagne" />
                {line.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {!reducedMotion && count < FEED.length && (
          <div className="flex items-center gap-2 text-ivory/40 text-sm">
            <span className="text-champagne font-tech">&lsaquo;</span>
            <span className="terminal-caret" />
          </div>
        )}
      </div>

      {/* Bottom summary */}
      <div className="px-5 py-3 border-t border-ivory/10 flex items-center justify-between">
        <span className="font-tech text-[0.65rem] tracking-[0.18em] text-ivory/40">
          AUTOMATION PIPELINE
        </span>
        <span className="font-tech text-[0.65rem] text-champagne" dir="ltr">
          {count}/{FEED.length} DONE
        </span>
      </div>
    </div>
  );
};

export default AutomationFeed;
