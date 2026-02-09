'use client';

import { useTranslations } from 'next-intl';
import { LayoutDashboard, FileSearch, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DemoView } from '@/types/demo';

interface DemoSidebarProps {
  view: DemoView;
  imported: boolean;
  onNavigate: (view: 'dashboard' | 'tenders') => void;
  onImport: () => void;
}

export default function DemoSidebar({ view, imported, onNavigate, onImport }: DemoSidebarProps) {
  const t = useTranslations('demo');

  const navItems = [
    {
      id: 'dashboard' as const,
      label: t('navDashboard'),
      icon: LayoutDashboard,
      active: view === 'dashboard' || view === 'project_detail',
    },
    {
      id: 'tenders' as const,
      label: t('navTenders'),
      icon: FileSearch,
      active: view === 'tenders' || view === 'tender_detail',
    },
  ];

  return (
    <aside className="hidden md:flex w-56 flex-col border-r border-apple-gray-100 bg-white">
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
              item.active
                ? 'bg-ee-navy text-white shadow-sm'
                : 'text-apple-gray-600 hover:bg-apple-gray-50 hover:text-apple-gray-800'
            )}
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </button>
        ))}
      </nav>

      {!imported && (
        <div className="p-3 border-t border-apple-gray-100">
          <button
            onClick={onImport}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-ts-green px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-ts-green/90 hover:shadow-md active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            {t('importButton')}
          </button>
        </div>
      )}
    </aside>
  );
}
