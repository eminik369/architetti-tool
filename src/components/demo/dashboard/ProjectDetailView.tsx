'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, Clock } from 'lucide-react';
import { demoProjects } from '@/data/demo-projects';
import { cn } from '@/lib/utils';
import ProjectDocuments from './ProjectDocuments';
import ProjectNotes from './ProjectNotes';

interface ProjectDetailViewProps {
  projectId: string;
  onBack: () => void;
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

export default function ProjectDetailView({ projectId, onBack }: ProjectDetailViewProps) {
  const t = useTranslations('demo');
  const locale = useLocale();
  const project = demoProjects.find((p) => p.id === projectId);

  if (!project) return null;

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

  const description = locale === 'it' ? project.description : project.descriptionEn;
  const nextSteps = locale === 'it' ? project.nextSteps : project.nextStepsEn;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-apple-gray-500 hover:text-apple-gray-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('backToDashboard')}
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-apple-gray-800">{project.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-sm text-apple-gray-400">
              <MapPin className="h-4 w-4" />
              {project.location}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold', statusColors[project.status])}>
              {statusLabel}
            </span>
            <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', urgencyColors[project.urgency])}>
              {urgencyLabel}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-apple-gray-400">{t('projectVolume')}: </span>
            <span className="font-semibold text-apple-gray-800">{project.volume}</span>
          </div>
          <div>
            <span className="text-apple-gray-400">{t('projectBilling')}: </span>
            <span className="font-medium text-apple-gray-700">
              {project.billing === 'aperto' ? t('billingOpen') : project.billing === 'parz. fatturato' ? t('billingPartial') : t('billingInvoiced')}
            </span>
          </div>
          <div>
            <span className="text-apple-gray-400">ID: </span>
            <span className="font-mono text-apple-gray-500 text-xs">{project.id}</span>
          </div>
        </div>
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-apple-gray-800 mb-3">{t('projectDescription')}</h2>
            <p className="text-sm text-apple-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Team */}
          <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-apple-gray-800 mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-apple-gray-400" />
              {t('projectTeam')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.team.map((member) => (
                <div key={member.name} className="flex items-center gap-3 rounded-xl bg-apple-gray-50 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ee-navy text-white text-xs font-bold">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-apple-gray-800">{member.name}</div>
                    <div className="text-xs text-apple-gray-400">{locale === 'it' ? member.role : member.roleEn}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <ProjectDocuments documents={project.documents} />
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* Notes */}
          <ProjectNotes notes={project.notes} />

          {/* Next Steps */}
          <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-apple-gray-800 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-apple-gray-400" />
              {t('projectNextSteps')}
            </h2>
            <ol className="space-y-2">
              {nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-apple-gray-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ee-navy/10 text-[10px] font-bold text-ee-navy flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
