'use client';

import { useTranslations, useLocale } from 'next-intl';
import { AlertTriangle, Shield } from 'lucide-react';
import type { TenderRisk } from '@/types/demo';
import { cn } from '@/lib/utils';

interface TenderRisksProps {
  risks: TenderRisk[];
}

const severityColors = {
  alta: 'bg-red-50 text-red-600 border-red-200',
  media: 'bg-amber-50 text-amber-600 border-amber-200',
  bassa: 'bg-green-50 text-green-600 border-green-200',
};

export default function TenderRisks({ risks }: TenderRisksProps) {
  const t = useTranslations('demo');
  const locale = useLocale();

  return (
    <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
      <h2 className="text-sm font-semibold text-apple-gray-800 mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-apple-gray-400" />
        {t('tenderRisks')}
      </h2>

      <div className="space-y-3">
        {risks.map((risk) => {
          const severityLabel = locale === 'it' ? risk.severity : risk.severityEn;
          return (
            <div
              key={risk.id}
              className="rounded-xl border border-apple-gray-50 p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-medium text-apple-gray-800">
                  {locale === 'it' ? risk.title : risk.titleEn}
                </h3>
                <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold flex-shrink-0', severityColors[risk.severity])}>
                  {severityLabel}
                </span>
              </div>
              <p className="text-xs text-apple-gray-500 mb-2">
                {locale === 'it' ? risk.description : risk.descriptionEn}
              </p>
              <div className="flex items-start gap-1.5 text-xs text-apple-gray-600">
                <Shield className="h-3.5 w-3.5 text-ts-green flex-shrink-0 mt-0.5" />
                <span>{locale === 'it' ? risk.mitigation : risk.mitigationEn}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
