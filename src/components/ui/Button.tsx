'use client';

import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  className,
}: ButtonProps) {
  const baseStyles = cn(
    'group inline-flex items-center gap-2 rounded-full px-6 py-3',
    'text-sm font-medium transition-all duration-300 ease-out',
    'hover:scale-[1.02] active:scale-[0.98]',
    variant === 'primary' && [
      'bg-apple-gray-800 text-white',
      'hover:bg-apple-gray-700 hover:shadow-lg',
    ],
    variant === 'secondary' && [
      'border border-apple-gray-200 bg-transparent text-apple-gray-800',
      'hover:border-apple-gray-300 hover:bg-apple-gray-50',
    ],
    className
  );

  const content = (
    <>
      {children}
      <ArrowRight
        className={cn(
          'h-4 w-4 transition-transform duration-300',
          'group-hover:translate-x-0.5'
        )}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={baseStyles} onClick={onClick}>
      {content}
    </button>
  );
}
