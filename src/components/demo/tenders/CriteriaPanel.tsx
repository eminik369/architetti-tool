'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { criteriaLabels } from '@/data/demo-criteria';
import type { CriteriaWeights } from '@/types/demo';
interface CriteriaPanelProps {
  weights: CriteriaWeights;
  onUpdateWeights: (weights: CriteriaWeights) => void;
}

const criteriaKeys = ['capabilityFit', 'timelineFit', 'feePotential', 'strategicFit'] as const;

export default function CriteriaPanel({ weights, onUpdateWeights }: CriteriaPanelProps) {
  const t = useTranslations('demo');
  const locale = useLocale();

  const handleChange = (key: keyof CriteriaWeights, value: number) => {
    onUpdateWeights({ ...weights, [key]: value / 100 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="sticky top-20 rounded-2xl border border-apple-gray-100 bg-white p-5"
    >
      <h3 className="text-sm font-semibold text-apple-gray-800 mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-apple-gray-400" />
        {t('tenderCriteria')}
      </h3>

      <div className="space-y-5">
        {criteriaKeys.map((key) => {
          const label = locale === 'it' ? criteriaLabels[key].it : criteriaLabels[key].en;
          const desc = locale === 'it' ? criteriaLabels[key].descIt : criteriaLabels[key].descEn;
          const value = Math.round(weights[key] * 100);

          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-apple-gray-700">{label}</span>
                <span className="text-xs font-bold text-ee-navy">{value}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                value={value}
                onChange={(e) => handleChange(key, parseInt(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-apple-gray-100 accent-ee-navy cursor-pointer [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ee-navy [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-sm"
              />
              <p className="text-[10px] text-apple-gray-400 mt-0.5">{desc}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
