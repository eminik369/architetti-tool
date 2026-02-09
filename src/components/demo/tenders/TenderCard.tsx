'use client';

import { useLocale } from 'next-intl';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { computeWeightedScore } from '@/data/demo-criteria';
import type { DemoTender, CriteriaWeights } from '@/types/demo';

interface TenderCardProps {
  tender: DemoTender;
  weights: CriteriaWeights;
  rank?: number;
  onClick: () => void;
}

const recColors = {
  GO: 'bg-ts-green/10 text-ts-green border-ts-green/20',
  'NO-GO': 'bg-red-50 text-red-500 border-red-200',
  VALUTARE: 'bg-amber-50 text-amber-600 border-amber-200',
};

export default function TenderCard({ tender, weights, onClick }: TenderCardProps) {
  const locale = useLocale();
  const score = computeWeightedScore(tender.scores, weights);

  const scoreColor =
    score >= 80 ? 'text-ts-green' : score >= 65 ? 'text-amber-500' : 'text-red-500';

  const scoreBg =
    score >= 80 ? 'bg-ts-green/10' : score >= 65 ? 'bg-amber-50' : 'bg-red-50';

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
      }}
      className={cn(
        'group cursor-pointer rounded-2xl border border-apple-gray-100 bg-white p-5 shadow-sm',
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-apple-gray-200'
      )}
    >
      <div className="flex items-center gap-4">
        {/* Rank & Score */}
        <div className={cn('flex flex-col items-center justify-center rounded-xl p-3 min-w-[60px]', scoreBg)}>
          <span className={cn('text-2xl font-bold leading-none', scoreColor)}>{score}</span>
          <span className="text-[9px] uppercase tracking-wider text-apple-gray-400 mt-0.5">score</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-apple-gray-800 truncate group-hover:text-ee-navy transition-colors">
                {locale === 'it' ? tender.title : tender.titleEn}
              </h3>
              <p className="text-xs text-apple-gray-400 mt-0.5">
                {locale === 'it' ? tender.entity : tender.entityEn}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-apple-gray-300 group-hover:text-ee-navy group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
          </div>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold', recColors[tender.recommendation])}>
              {tender.recommendation}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-apple-gray-400">
              <MapPin className="h-3 w-3" />
              {tender.location}
            </span>
            <span className="text-xs font-medium text-apple-gray-600">{tender.volume}</span>
            <span className="inline-flex items-center gap-1 text-xs text-apple-gray-400">
              <Calendar className="h-3 w-3" />
              {tender.deadline}
            </span>
            <span className="rounded-full bg-apple-gray-50 px-2 py-0.5 text-[10px] text-apple-gray-500">
              {locale === 'it' ? tender.sector : tender.sectorEn}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
