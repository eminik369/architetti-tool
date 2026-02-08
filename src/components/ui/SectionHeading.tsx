'use client';

import { cn } from '@/lib/utils';
import { Badge } from './Badge';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  accentWord?: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  accentWord,
  subtitle,
  className,
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!accentWord) {
      return title;
    }

    const parts = title.split(accentWord);
    if (parts.length === 1) {
      return (
        <>
          {title}{' '}
          <span className="font-bold text-ee-navy">{accentWord}</span>
        </>
      );
    }

    return (
      <>
        {parts[0]}
        <span className="font-bold text-ee-navy">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn('text-center', className)}>
      {badge && (
        <div className="mb-4">
          <Badge showDot>{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-apple-gray-800 sm:text-4xl lg:text-5xl">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-apple-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
