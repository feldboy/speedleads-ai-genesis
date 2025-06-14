
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StatProps {
  number: number;
  label: string;
  suffix?: string;
  duration?: number;
}

const AnimatedStat: React.FC<StatProps> = ({ number, label, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold gradient-text mb-2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration }}
        >
          {isInView && (
            <motion.span
              initial={{ value: 0 }}
              animate={{ value: number }}
              transition={{ duration, ease: "easeOut" }}
            >
              {({ value }) => Math.round(value)}
            </motion.span>
          )}
        </motion.span>
        {suffix}
      </motion.div>
      <p className="text-gray-600 text-lg">{label}</p>
    </motion.div>
  );
};

const AnimatedStats = () => {
  const stats = [
    { number: 150, label: "פרויקטים שהושלמו", suffix: "+" },
    { number: 98, label: "שביעות רצון לקוחות", suffix: "%" },
    { number: 300, label: "שעות עבודה שנחסכו", suffix: "K+" },
    { number: 45, label: "עלייה ממוצעת בלידים", suffix: "%" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <AnimatedStat {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStats;
