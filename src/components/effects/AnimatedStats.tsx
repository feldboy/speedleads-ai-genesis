import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface StatProps {
  number: number;
  label: string;
  suffix?: string;
  duration?: number;
  index: number;
}

const AnimatedStat: React.FC<StatProps> = ({ number, label, suffix = '', duration = 2, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useSpring(0, { duration: duration * 1000 });
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(number);
    }
  }, [isInView, motionValue, number]);

  return (
    <motion.div
      ref={ref}
      className="relative pt-6 pb-2 border-t border-ivory/10"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-index text-champagne absolute -top-px right-0 bg-transparent pl-2">
        0{index + 1}
      </span>
      <div
        className="font-tech flex items-baseline gap-1 mb-3 gradient-text"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}
        dir="ltr"
      >
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-ivory/55 text-sm leading-snug max-w-[180px]">{label}</p>
    </motion.div>
  );
};

const stats = [
  { number: 5, label: 'פרויקטים שהושלמו', suffix: '+' },
  { number: 100, label: 'שביעות רצון לקוחות', suffix: '%' },
  { number: 50, label: 'שעות שנחסכו לכל לקוח', suffix: '+' },
  { number: 25, label: 'עלייה ממוצעת בלידים', suffix: '%' },
];

const AnimatedStats = () => {
  return (
    <section className="py-20 relative overflow-hidden" aria-label="נתונים ומספרים">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="eyebrow text-champagne">By the numbers</span>
          <span className="h-px flex-1 hairline-gold" />
          <span className="live-dot" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
