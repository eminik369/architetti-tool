'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Target, ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react';
import type { DemoTender } from '@/types/demo';
import { cn } from '@/lib/utils';

interface TenderRecommendationProps {
  tender: DemoTender;
  score: number;
}

export default function TenderRecommendation({ tender, score }: TenderRecommendationProps) {
  const t = useTranslations('demo');
  const locale = useLocale();

  const config = {
    GO: {
      icon: ThumbsUp,
      bg: 'bg-ts-green/5 border-ts-green/20',
      iconBg: 'bg-ts-green/10',
      iconColor: 'text-ts-green',
      badge: 'bg-ts-green/10 text-ts-green',
    },
    'NO-GO': {
      icon: ThumbsDown,
      bg: 'bg-red-50 border-red-200',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      badge: 'bg-red-50 text-red-500',
    },
    VALUTARE: {
      icon: HelpCircle,
      bg: 'bg-amber-50 border-amber-200',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      badge: 'bg-amber-50 text-amber-600',
    },
  };

  const c = config[tender.recommendation];
  const Icon = c.icon;

  return (
    <div className={cn('rounded-2xl border p-6', c.bg)}>
      <div className="flex items-center gap-3 mb-3">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', c.iconBg)}>
          <Icon className={cn('h-5 w-5', c.iconColor)} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-apple-gray-800">{t('tenderRecommendation')}</h2>
          <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold mt-0.5', c.badge)}>
            {tender.recommendation}
          </span>
        </div>
      </div>

      <p className="text-sm text-apple-gray-600 leading-relaxed">
        {locale === 'it' ? tender.recommendationReason : tender.recommendationReasonEn}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-apple-gray-400">
        <Target className="h-3.5 w-3.5" />
        <span>
          {t('tenderScore')}: <span className="font-bold text-apple-gray-700">{score}/100</span>
        </span>
      </div>
    </div>
  );
}
