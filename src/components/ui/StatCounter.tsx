'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface StatCounterProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCounter({ value, label, className }: StatCounterProps) {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="block text-4xl font-bold tracking-tight text-apple-gray-800 sm:text-5xl">
          {value}
        </span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.15,
        }}
        className="mt-2 text-xs font-medium uppercase tracking-wider text-apple-gray-400"
      >
        {label}
      </motion.p>
    </div>
  );
}
