'use client';

import { useTranslations } from 'next-intl';
import { FileText, FileSpreadsheet, FileType, Presentation } from 'lucide-react';
import type { ProjectDocument } from '@/types/demo';
import { cn } from '@/lib/utils';

interface ProjectDocumentsProps {
  documents: ProjectDocument[];
}

const typeIcon = {
  pdf: FileText,
  dwg: FileType,
  xlsx: FileSpreadsheet,
  docx: FileText,
  pptx: Presentation,
};

const typeColor = {
  pdf: 'bg-red-50 text-red-500',
  dwg: 'bg-blue-50 text-blue-500',
  xlsx: 'bg-green-50 text-green-600',
  docx: 'bg-blue-50 text-blue-600',
  pptx: 'bg-orange-50 text-orange-500',
};

export default function ProjectDocuments({ documents }: ProjectDocumentsProps) {
  const t = useTranslations('demo');

  return (
    <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
      <h2 className="text-sm font-semibold text-apple-gray-800 mb-3 flex items-center gap-2">
        <FileText className="h-4 w-4 text-apple-gray-400" />
        {t('projectDocuments')}
      </h2>
      <div className="space-y-2">
        {documents.map((doc) => {
          const Icon = typeIcon[doc.type] ?? FileText;
          return (
            <div
              key={doc.id}
              className="flex items-center gap-3 rounded-xl border border-apple-gray-50 p-3 hover:bg-apple-gray-50 transition-colors"
            >
              <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', typeColor[doc.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-apple-gray-700 truncate">{doc.name}</div>
                <div className="text-xs text-apple-gray-400">
                  {doc.type.toUpperCase()} &middot; {doc.size}
                </div>
              </div>
              <span className="text-xs text-apple-gray-400 flex-shrink-0">{doc.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
