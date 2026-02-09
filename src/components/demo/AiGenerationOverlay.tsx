'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AiGenerationOverlayProps {
  content: string;
  contentEn: string;
  isGenerated: boolean;
  onGenerate: () => void;
  label: string;
}

export default function AiGenerationOverlay({
  content,
  contentEn,
  isGenerated,
  onGenerate,
  label,
}: AiGenerationOverlayProps) {
  const t = useTranslations('demo');
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const text = locale === 'it' ? content : contentEn;

  const handleGenerate = () => {
    if (isGenerated || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsTyping(true);
      onGenerate();
    }, 2000 + Math.random() * 1000);
  };

  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 8);

    return () => clearInterval(interval);
  }, [isTyping, text]);

  // If already generated (e.g., returning to view), show full content immediately
  useEffect(() => {
    if (isGenerated && !isTyping && !displayedText) {
      setDisplayedText(text);
    }
  }, [isGenerated, isTyping, displayedText, text]);

  if (!isGenerated && !isLoading && !isTyping) {
    return (
      <button
        onClick={handleGenerate}
        className={cn(
          'flex items-center gap-2 rounded-xl border border-dashed border-apple-gray-200 px-4 py-3',
          'text-sm font-medium text-apple-gray-500 transition-all',
          'hover:border-ts-green hover:text-ts-green hover:bg-ts-green/5'
        )}
      >
        <Sparkles className="h-4 w-4" />
        {t('genGenerate')} — {label}
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-apple-gray-100 bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-ts-green" />
        <span className="text-sm font-semibold text-apple-gray-800">{label}</span>
        {isLoading && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-apple-gray-400">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {t('genGenerating')}
          </span>
        )}
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-4 rounded bg-apple-gray-100 animate-pulse"
                style={{ width: `${80 - i * 15}%` }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {(isTyping || (isGenerated && displayedText)) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-apple-gray-600 leading-relaxed whitespace-pre-line"
        >
          {displayedText}
          {isTyping && (
            <span className="inline-block w-0.5 h-4 bg-ts-green ml-0.5 animate-pulse" />
          )}
        </motion.div>
      )}
    </div>
  );
}
