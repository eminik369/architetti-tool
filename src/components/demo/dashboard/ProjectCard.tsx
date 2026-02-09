'use client';

import { useTranslations } from 'next-intl';
import { MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DemoProject } from '@/types/demo';

interface ProjectCardProps {
  project: DemoProject;
  onClick: () => void;
}

const statusColors = {
  attivo: 'bg-ts-green/10 text-ts-green border-ts-green/20',
  completato: 'bg-apple-gray-100 text-apple-gray-500 border-apple-gray-200',
  'in pianificazione': 'bg-amber-50 text-amber-600 border-amber-200',
};

const urgencyColors = {
  alto: 'bg-red-50 text-red-600',
  medio: 'bg-amber-50 text-amber-600',
  basso: 'bg-apple-gray-50 text-apple-gray-500',
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const t = useTranslations('demo');

  const statusLabel =
    project.status === 'attivo'
      ? t('statusActive')
      : project.status === 'completato'
      ? t('statusCompleted')
      : t('statusPlanning');

  const urgencyLabel =
    project.urgency === 'alto'
      ? t('urgencyHigh')
      : project.urgency === 'medio'
      ? t('urgencyMedium')
      : t('urgencyLow');

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
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-apple-gray-200'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-apple-gray-800 truncate group-hover:text-ee-navy transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-xs text-apple-gray-400">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            {project.location}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-apple-gray-300 group-hover:text-ee-navy group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold', statusColors[project.status])}>
          {statusLabel}
        </span>
        <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium', urgencyColors[project.urgency])}>
          {urgencyLabel}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-apple-gray-50 pt-3">
        <span className="text-lg font-bold text-apple-gray-800">{project.volume}</span>
        <span className="text-[10px] text-apple-gray-400 uppercase tracking-wide">
          {project.billing === 'aperto' ? t('billingOpen') : project.billing === 'parz. fatturato' ? t('billingPartial') : t('billingInvoiced')}
        </span>
      </div>
    </div>
  );
}
