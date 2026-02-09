'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ClipboardList, CheckCircle2, Circle } from 'lucide-react';
import type { TenderRequirement } from '@/types/demo';
import { cn } from '@/lib/utils';

interface TenderRequirementsProps {
  requirements: TenderRequirement[];
}

const categoryColors = {
  eligibilità: 'bg-blue-50 text-blue-600',
  tecnico: 'bg-purple-50 text-purple-600',
  deliverable: 'bg-amber-50 text-amber-600',
  tempistica: 'bg-green-50 text-green-600',
};

const categoryLabels: Record<string, { it: string; en: string }> = {
  eligibilità: { it: 'Eligibilità', en: 'Eligibility' },
  tecnico: { it: 'Tecnico', en: 'Technical' },
  deliverable: { it: 'Deliverable', en: 'Deliverable' },
  tempistica: { it: 'Tempistica', en: 'Timeline' },
};

export default function TenderRequirements({ requirements }: TenderRequirementsProps) {
  const t = useTranslations('demo');
  const locale = useLocale();

  const grouped = requirements.reduce<Record<string, TenderRequirement[]>>((acc, req) => {
    const cat = req.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(req);
    return acc;
  }, {});

  return (
    <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
      <h2 className="text-sm font-semibold text-apple-gray-800 mb-4 flex items-center gap-2">
        <ClipboardList className="h-4 w-4 text-apple-gray-400" />
        {t('tenderRequirements')}
      </h2>

      <div className="space-y-4">
        {Object.entries(grouped).map(([category, reqs]) => (
          <div key={category}>
            <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold mb-2', categoryColors[category as keyof typeof categoryColors])}>
              {categoryLabels[category]?.[locale === 'it' ? 'it' : 'en'] ?? category}
            </span>
            <div className="space-y-1.5">
              {reqs.map((req) => (
                <div key={req.id} className="flex items-start gap-2.5 text-sm">
                  {req.mandatory ? (
                    <CheckCircle2 className="h-4 w-4 text-ee-navy flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-4 w-4 text-apple-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={cn('flex-1', req.mandatory ? 'text-apple-gray-700' : 'text-apple-gray-500')}>
                    {locale === 'it' ? req.text : req.textEn}
                  </span>
                  <span className={cn('text-[10px] font-medium flex-shrink-0', req.mandatory ? 'text-ee-navy' : 'text-apple-gray-400')}>
                    {req.mandatory ? t('tenderMandatory') : t('tenderOptional')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
