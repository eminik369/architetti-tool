'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  showDot?: boolean;
}

export function Badge({ children, className, showDot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-apple-gray-50 px-4 py-1.5',
        'text-xs font-medium uppercase tracking-wider text-apple-gray-500',
        className
      )}
    >
      {showDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-ts-green" />
      )}
      {children}
    </span>
  );
}
