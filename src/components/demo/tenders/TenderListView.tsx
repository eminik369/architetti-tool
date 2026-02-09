'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { demoTenders } from '@/data/demo-tenders';
import { computeWeightedScore } from '@/data/demo-criteria';
import type { CriteriaWeights } from '@/types/demo';
import TenderCard from './TenderCard';
import CriteriaPanel from './CriteriaPanel';

interface TenderListViewProps {
  weights: CriteriaWeights;
  onUpdateWeights: (weights: CriteriaWeights) => void;
  onSelectTender: (id: string) => void;
}

export default function TenderListView({ weights, onUpdateWeights, onSelectTender }: TenderListViewProps) {
  const t = useTranslations('demo');

  const sortedTenders = useMemo(() => {
    return [...demoTenders].sort((a, b) => {
      const scoreA = computeWeightedScore(a.scores, weights);
      const scoreB = computeWeightedScore(b.scores, weights);
      return scoreB - scoreA;
    });
  }, [weights]);

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-apple-gray-800"
      >
        {t('tenderListTitle')}
      </motion.h1>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Criteria panel */}
        <div className="xl:col-span-1">
          <CriteriaPanel weights={weights} onUpdateWeights={onUpdateWeights} />
        </div>

        {/* Tender list */}
        <div className="xl:col-span-3 space-y-3">
          {sortedTenders.map((tender, i) => (
            <motion.div
              key={tender.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              layout
            >
              <TenderCard
                tender={tender}
                weights={weights}
                rank={i + 1}
                onClick={() => onSelectTender(tender.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
