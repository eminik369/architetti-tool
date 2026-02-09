'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Building2 } from 'lucide-react';
import { demoTenders } from '@/data/demo-tenders';
import { computeWeightedScore } from '@/data/demo-criteria';
import type { CriteriaWeights } from '@/types/demo';
import { cn } from '@/lib/utils';
import TenderRequirements from './TenderRequirements';
import TenderRisks from './TenderRisks';
import TenderRecommendation from './TenderRecommendation';
import TenderGeneratedContent from './TenderGeneratedContent';

interface TenderDetailViewProps {
  tenderId: string;
  generatedContent: Set<string>;
  onBack: () => void;
  onGenerate: (contentId: string) => void;
  weights: CriteriaWeights;
}

export default function TenderDetailView({
  tenderId,
  generatedContent,
  onBack,
  onGenerate,
  weights,
}: TenderDetailViewProps) {
  const t = useTranslations('demo');
  const locale = useLocale();
  const tender = demoTenders.find((td) => td.id === tenderId);

  if (!tender) return null;

  const score = computeWeightedScore(tender.scores, weights);
  const scoreColor =
    score >= 80 ? 'text-ts-green' : score >= 65 ? 'text-amber-500' : 'text-red-500';
  const scoreBg =
    score >= 80 ? 'bg-ts-green/10' : score >= 65 ? 'bg-amber-50' : 'bg-red-50';

  const recColors = {
    GO: 'bg-ts-green/10 text-ts-green border-ts-green/20',
    'NO-GO': 'bg-red-50 text-red-500 border-red-200',
    VALUTARE: 'bg-amber-50 text-amber-600 border-amber-200',
  };

  const criteriaDisplay = [
    { label: 'Capability Fit', value: tender.scores.capabilityFit },
    { label: 'Timeline Fit', value: tender.scores.timelineFit },
    { label: 'Fee Potential', value: tender.scores.feePotential },
    { label: 'Strategic Fit', value: tender.scores.strategicFit },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-apple-gray-500 hover:text-apple-gray-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('backToTenders')}
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className={cn('flex flex-col items-center justify-center rounded-2xl p-4 min-w-[80px]', scoreBg)}>
            <span className={cn('text-3xl font-bold leading-none', scoreColor)}>{score}</span>
            <span className="text-[10px] uppercase tracking-wider text-apple-gray-400 mt-1">score</span>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h1 className="text-xl font-bold text-apple-gray-800">
                  {locale === 'it' ? tender.title : tender.titleEn}
                </h1>
                <p className="text-sm text-apple-gray-400 mt-0.5">
                  {locale === 'it' ? tender.entity : tender.entityEn}
                </p>
              </div>
              <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold', recColors[tender.recommendation])}>
                {tender.recommendation}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1 text-apple-gray-500">
                <MapPin className="h-3.5 w-3.5" /> {tender.location}
              </span>
              <span className="flex items-center gap-1 text-apple-gray-500">
                <Building2 className="h-3.5 w-3.5" /> {locale === 'it' ? tender.sector : tender.sectorEn}
              </span>
              <span className="font-semibold text-apple-gray-700">{tender.volume}</span>
              <span className="flex items-center gap-1 text-apple-gray-500">
                <Calendar className="h-3.5 w-3.5" /> {tender.deadline}
              </span>
            </div>

            {/* Criteria bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {criteriaDisplay.map((c) => (
                <div key={c.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-apple-gray-400">{c.label}</span>
                    <span className="text-[10px] font-bold text-apple-gray-700">{c.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-apple-gray-100 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        c.value >= 80 ? 'bg-ts-green' : c.value >= 65 ? 'bg-amber-400' : 'bg-red-400'
                      )}
                      style={{ width: `${c.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TenderRequirements requirements={tender.requirements} />
          <TenderGeneratedContent
            contents={tender.generatableContent}
            generatedIds={generatedContent}
            onGenerate={onGenerate}
          />
        </div>

        <div className="space-y-6">
          <TenderRecommendation tender={tender} score={score} />
          <TenderRisks risks={tender.risks} />
        </div>
      </div>
    </motion.div>
  );
}
