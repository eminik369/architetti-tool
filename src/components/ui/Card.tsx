'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({
  children,
  className,
  onClick,
  hoverable = true,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-apple-gray-100 bg-white p-6 shadow-sm',
        'transition-all duration-300 ease-out',
        hoverable && [
          'hover:-translate-y-1 hover:shadow-md',
          'hover:border-apple-gray-200',
        ],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
