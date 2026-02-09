'use client';

import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import type { GeneratableContent } from '@/types/demo';
import AiGenerationOverlay from '../AiGenerationOverlay';

interface TenderGeneratedContentProps {
  contents: GeneratableContent[];
  generatedIds: Set<string>;
  onGenerate: (contentId: string) => void;
}

const labelKeys: Record<string, string> = {
  genRequirementsSummary: 'genRequirementsSummary',
  genConceptApproach: 'genConceptApproach',
  genResourcePlan: 'genResourcePlan',
  genClientQuestions: 'genClientQuestions',
  genDraftResponse: 'genDraftResponse',
};

export default function TenderGeneratedContent({
  contents,
  generatedIds,
  onGenerate,
}: TenderGeneratedContentProps) {
  const t = useTranslations('demo');

  return (
    <div className="rounded-2xl border border-apple-gray-100 bg-white p-6">
      <h2 className="text-sm font-semibold text-apple-gray-800 mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-ts-green" />
        {t('tenderGenerate')}
      </h2>

      <div className="space-y-3">
        {contents.map((item) => (
          <AiGenerationOverlay
            key={item.id}
            content={item.content}
            contentEn={item.contentEn}
            isGenerated={generatedIds.has(item.id)}
            onGenerate={() => onGenerate(item.id)}
            label={t(labelKeys[item.labelKey] ?? item.labelKey)}
          />
        ))}
      </div>
    </div>
  );
}
