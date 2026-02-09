'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Activity, DollarSign, AlertTriangle, Search } from 'lucide-react';
import { demoProjects } from '@/data/demo-projects';
import type { ProjectStatus, ProjectUrgency } from '@/types/demo';
import ProjectCard from './ProjectCard';
import { cn } from '@/lib/utils';

interface DashboardViewProps {
  imported: boolean;
  onSelectProject: (id: string) => void;
}

export default function DashboardView({ imported, onSelectProject }: DashboardViewProps) {
  const t = useTranslations('demo');
  const locale = useLocale();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<ProjectUrgency | 'all'>('all');
  const [search, setSearch] = useState('');

  const projects = useMemo(() => imported ? demoProjects : [], [imported]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (urgencyFilter !== 'all' && p.urgency !== urgencyFilter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [projects, statusFilter, urgencyFilter, search]);

  const stats = useMemo(() => {
    const active = projects.filter((p) => p.status === 'attivo').length;
    const totalVolume = projects.reduce((sum, p) => sum + p.volumeNum, 0);
    const urgencyMap = { alto: 3, medio: 2, basso: 1 };
    const avgUrgency = projects.length
      ? projects.reduce((sum, p) => sum + urgencyMap[p.urgency], 0) / projects.length
      : 0;
    const urgencyLabel =
      avgUrgency > 2.3
        ? locale === 'it' ? 'Alto' : 'High'
        : avgUrgency > 1.6
        ? locale === 'it' ? 'Medio' : 'Medium'
        : locale === 'it' ? 'Basso' : 'Low';
    return { total: projects.length, active, totalVolume, urgencyLabel };
  }, [projects, locale]);

  const formatVolume = (v: number) =>
    v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(1)}M` : `€${(v / 1_000).toFixed(0)}K`;

  if (!imported) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-32 text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-apple-gray-100">
          <FolderOpen className="h-10 w-10 text-apple-gray-300" />
        </div>
        <h2 className="text-xl font-semibold text-apple-gray-700 mb-2">{t('emptyDashboard')}</h2>
        <p className="text-apple-gray-400 max-w-sm">{t('noProjectsYet')}</p>
      </motion.div>
    );
  }

  const statCards = [
    { label: t('statsTotal'), value: String(stats.total), icon: FolderOpen, color: 'bg-ee-navy/10 text-ee-navy' },
    { label: t('statsActive'), value: String(stats.active), icon: Activity, color: 'bg-ts-green/10 text-ts-green' },
    { label: t('statsVolume'), value: formatVolume(stats.totalVolume), icon: DollarSign, color: 'bg-amber-50 text-amber-600' },
    { label: t('statsUrgency'), value: stats.urgencyLabel, icon: AlertTriangle, color: 'bg-red-50 text-red-500' },
  ];

  const statusOptions: { value: ProjectStatus | 'all'; label: string }[] = [
    { value: 'all', label: t('filterAll') },
    { value: 'attivo', label: t('filterActive') },
    { value: 'completato', label: t('filterCompleted') },
    { value: 'in pianificazione', label: t('filterPlanning') },
  ];

  const urgencyOptions: { value: ProjectUrgency | 'all'; label: string }[] = [
    { value: 'all', label: t('filterUrgencyAll') },
    { value: 'alto', label: t('filterUrgencyHigh') },
    { value: 'medio', label: t('filterUrgencyMedium') },
    { value: 'basso', label: t('filterUrgencyLow') },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-apple-gray-100 bg-white p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', stat.color)}>
                <stat.icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-apple-gray-800">{stat.value}</div>
            <div className="text-xs text-apple-gray-400 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center gap-3"
      >
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-apple-gray-300" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-apple-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-apple-gray-800 placeholder:text-apple-gray-300 focus:border-ee-navy focus:outline-none focus:ring-1 focus:ring-ee-navy/20"
          />
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-apple-gray-200 bg-white p-1">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                statusFilter === opt.value
                  ? 'bg-ee-navy text-white'
                  : 'text-apple-gray-500 hover:text-apple-gray-700'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-apple-gray-200 bg-white p-1">
          {urgencyOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setUrgencyFilter(opt.value)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                urgencyFilter === opt.value
                  ? 'bg-ee-navy text-white'
                  : 'text-apple-gray-500 hover:text-apple-gray-700'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProjectCard project={project} onClick={() => onSelectProject(project.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
