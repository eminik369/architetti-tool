'use client';

import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function StepCard({
  number,
  title,
  description,
  icon: Icon,
  className,
}: StepCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-apple-gray-100 bg-white p-6',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-md hover:border-apple-gray-200',
        className
      )}
    >
      <div className="mb-5 flex items-start justify-between">
        <span className="text-sm font-semibold tracking-wider text-apple-gray-200">
          {number}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-apple-gray-50">
          <Icon className="h-5 w-5 text-ee-navy" />
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-apple-gray-800">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-apple-gray-400">
        {description}
      </p>
    </div>
  );
}
