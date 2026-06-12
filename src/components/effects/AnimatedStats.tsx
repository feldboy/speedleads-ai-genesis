import React from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface StatProps {
  number: number;
  label: string;
  suffix?: string;
  duration?: number;
  index: number;
}

const AnimatedStat: React.FC<StatProps> = ({ number, label, suffix = "", duration = 2, index }) => {
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
      className="relative pt-6 pb-2 border-t border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <span className="section-index text-tech-blue absolute -top-px right-0 bg-white pl-2">
        0{index + 1}
      </span>
      <div className="font-display flex items-baseline gap-1 mb-3" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>
        <motion.span className="gradient-text">{rounded}</motion.span>
        <span className="gradient-text">{suffix}</span>
      </div>
      <p className="text-gray-600 text-sm leading-snug max-w-[180px]">{label}</p>
    </motion.div>
  );
};

const AnimatedStats = () => {
  const stats = [
    { number: 5, label: "פרויקטים שהושלמו", suffix: "+" },
    { number: 100, label: "שביעות רצון לקוחות", suffix: "%" },
    { number: 50, label: "שעות שנחסכו לכל לקוח", suffix: "+" },
    { number: 25, label: "עלייה ממוצעת בלידים", suffix: "%" }
  ];

  return (
    <div className="px-4">
      <div className="flex items-center gap-4 mb-12">
        <span className="eyebrow text-tech-blue">By the numbers</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {stats.map((stat, index) => (
          <AnimatedStat key={index} {...stat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AnimatedStats;
