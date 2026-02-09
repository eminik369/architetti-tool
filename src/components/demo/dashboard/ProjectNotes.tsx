'use client';

import { useTranslations, useLocale } from 'next-intl';
import { StickyNote, CheckCircle2, Circle } from 'lucide-react';
import type { ProjectNote } from '@/types/demo';
import { cn } from '@/lib/utils';

interface ProjectNotesProps {
  notes: ProjectNote[];
}

export default function ProjectNotes({ notes }: ProjectNotesProps) {
  const t = useTranslations('demo');
  const locale = useLocale();

  return (
    <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
      <h2 className="text-sm font-semibold text-apple-gray-800 mb-3 flex items-center gap-2">
        <StickyNote className="h-4 w-4 text-apple-gray-400" />
        {t('projectNotes')}
      </h2>
      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="flex items-start gap-2.5">
            {note.done ? (
              <CheckCircle2 className="h-4 w-4 text-ts-green flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="h-4 w-4 text-apple-gray-300 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm', note.done ? 'text-apple-gray-400 line-through' : 'text-apple-gray-700')}>
                {locale === 'it' ? note.text : note.textEn}
              </p>
              <div className="mt-0.5 text-xs text-apple-gray-400">
                {note.author} &middot; {note.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
