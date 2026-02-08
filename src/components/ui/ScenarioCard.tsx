'use client';

import { cn } from '@/lib/utils';

interface ScenarioCardProps {
  title: string;
  quote: string;
  className?: string;
}

export function ScenarioCard({ title, quote, className }: ScenarioCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-apple-gray-100 bg-apple-gray-50 p-6',
        className
      )}
    >
      <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-apple-gray-400">
        {title}
      </span>
      <blockquote className="text-sm italic leading-relaxed text-apple-gray-600">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </div>
  );
}
