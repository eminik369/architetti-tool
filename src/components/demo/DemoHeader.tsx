'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { ChevronRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DemoState, DemoAction, DemoView } from '@/types/demo';
import { demoProjects } from '@/data/demo-projects';
import { demoTenders } from '@/data/demo-tenders';

interface DemoHeaderProps {
  view: DemoView;
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
}

export default function DemoHeader({ view, state, dispatch }: DemoHeaderProps) {
  const t = useTranslations('demo');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const next = locale === 'it' ? 'en' : 'it';
    router.replace(pathname, { locale: next });
  };

  const breadcrumbs: { label: string; onClick?: () => void }[] = [
    { label: t('title') },
  ];

  if (view === 'dashboard' || view === 'project_detail') {
    breadcrumbs.push({
      label: t('breadcrumbDashboard'),
      onClick: view === 'project_detail' ? () => dispatch({ type: 'NAVIGATE_DASHBOARD' }) : undefined,
    });
  }

  if (view === 'tenders' || view === 'tender_detail') {
    breadcrumbs.push({
      label: t('breadcrumbTenders'),
      onClick: view === 'tender_detail' ? () => dispatch({ type: 'NAVIGATE_TENDERS' }) : undefined,
    });
  }

  if (view === 'project_detail' && state.selectedProjectId) {
    const project = demoProjects.find((p) => p.id === state.selectedProjectId);
    if (project) {
      breadcrumbs.push({ label: project.name });
    }
  }

  if (view === 'tender_detail' && state.selectedTenderId) {
    const tender = demoTenders.find((t) => t.id === state.selectedTenderId);
    if (tender) {
      breadcrumbs.push({ label: locale === 'it' ? tender.title : tender.titleEn });
    }
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-apple-gray-100 bg-white/80 backdrop-blur-xl px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Image src="/logos/ee-partners.svg" alt="ee partners" width={100} height={40} className="h-7 w-auto" />
          <div className="h-5 w-px bg-apple-gray-200" />
          <Image src="/logos/tstudio.png" alt="TStudio" width={80} height={32} className="h-5 w-auto" />
        </div>

        <div className="hidden sm:flex items-center gap-1 ml-4 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-apple-gray-300" />}
              {crumb.onClick ? (
                <button
                  onClick={crumb.onClick}
                  className="text-apple-gray-400 hover:text-apple-gray-700 transition-colors"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className={cn(
                  i === breadcrumbs.length - 1 ? 'text-apple-gray-800 font-medium' : 'text-apple-gray-400'
                )}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={toggleLocale}
        className="flex items-center gap-1.5 rounded-full border border-apple-gray-200 px-3 py-1.5 text-xs font-medium text-apple-gray-600 hover:bg-apple-gray-50 transition-colors"
      >
        <Globe className="h-3.5 w-3.5" />
        {locale.toUpperCase()}
      </button>
    </header>
  );
}
