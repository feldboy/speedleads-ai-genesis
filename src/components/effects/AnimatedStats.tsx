
import React from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import GlowCard from '@/components/ui/GlowCard';
import { cn } from '@/lib/utils';

interface StatProps {
  number: number;
  label: string;
  suffix?: string;
  duration?: number;
  /** Featured stat gets the giant numeral treatment */
  featured?: boolean;
}

const AnimatedStat: React.FC<StatProps> = ({ number, label, suffix = "", duration = 2, featured = false }) => {
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
      className={cn('text-center flex flex-col justify-center h-full', featured && 'gap-2')}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        dir="ltr"
        className={cn(
          'font-display text-brand-gradient mb-2 leading-none',
          featured ? 'text-7xl md:text-8xl lg:text-9xl' : 'text-4xl md:text-5xl'
        )}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <motion.span>{rounded}</motion.span>
        {suffix}
      </motion.div>
      <p className={cn('text-gray-300', featured ? 'text-xl' : 'text-lg')}>{label}</p>
    </motion.div>
  );
};

const AnimatedStats = () => {
  const stats = [
    { number: 25, label: "עלייה ממוצעת בלידים", suffix: "%", featured: true },
    { number: 5, label: "פרויקטים שהושלמו", suffix: "+" },
    { number: 100, label: "שביעות רצון לקוחות", suffix: "%" },
    { number: 50, label: "שעות שנחסכו לכל לקוח", suffix: "+" },
  ];

  // Asymmetric bento: the featured stat anchors the grid at double size
  const cells = [
    'lg:col-span-2 lg:row-span-2',
    '',
    '',
    'lg:col-span-2',
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-6 py-16">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={cn('min-h-[140px]', cells[index], index === 0 && 'col-span-2')}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlowCard className="h-full p-6">
            <AnimatedStat {...stat} />
          </GlowCard>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStats;
