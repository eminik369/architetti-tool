'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, CheckCircle2, Loader2, FolderOpen } from 'lucide-react';
import { demoProjects } from '@/data/demo-projects';

interface ImportOverlayProps {
  onComplete: () => void;
}

type ImportStage = 'scanning' | 'extracting' | 'importing' | 'complete';

export default function ImportOverlay({ onComplete }: ImportOverlayProps) {
  const t = useTranslations('demo');
  const [stage, setStage] = useState<ImportStage>('scanning');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Stage 1: Scanning (1.5s)
    timers.push(
      setTimeout(() => setStage('extracting'), 1500)
    );

    // Stage 2: Extracting (1s)
    timers.push(
      setTimeout(() => setStage('importing'), 2500)
    );

    // Stage 3: Import projects one by one (250ms each)
    demoProjects.forEach((_, i) => {
      timers.push(
        setTimeout(() => setCurrentProjectIndex(i), 2500 + i * 250)
      );
    });

    // Stage 4: Complete
    timers.push(
      setTimeout(() => setStage('complete'), 2500 + demoProjects.length * 250 + 300)
    );

    // Auto-close
    timers.push(
      setTimeout(onComplete, 2500 + demoProjects.length * 250 + 1200)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ee-navy/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ts-green/10">
            {stage === 'complete' ? (
              <CheckCircle2 className="h-7 w-7 text-ts-green" />
            ) : stage === 'scanning' ? (
              <Globe className="h-7 w-7 text-ts-green animate-pulse" />
            ) : (
              <FolderOpen className="h-7 w-7 text-ts-green" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-apple-gray-800">
            {stage === 'scanning' && t('importScanning')}
            {stage === 'extracting' && t('importExtracting')}
            {stage === 'importing' && t('importProject', { name: demoProjects[currentProjectIndex].name })}
            {stage === 'complete' && t('importComplete')}
          </h3>
          {stage === 'complete' && (
            <p className="mt-1 text-sm text-apple-gray-500">
              {t('importProjectsFound', { count: demoProjects.length })}
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-apple-gray-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-ts-green"
            initial={{ width: '0%' }}
            animate={{
              width:
                stage === 'scanning'
                  ? '20%'
                  : stage === 'extracting'
                  ? '35%'
                  : stage === 'importing'
                  ? `${35 + ((currentProjectIndex + 1) / demoProjects.length) * 55}%`
                  : '100%',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Project list during import */}
        <AnimatePresence mode="popLayout">
          {(stage === 'importing' || stage === 'complete') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 max-h-48 overflow-y-auto space-y-1"
            >
              {demoProjects.slice(0, stage === 'complete' ? demoProjects.length : currentProjectIndex + 1).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-ts-green flex-shrink-0" />
                  <span className="text-apple-gray-700">{project.name}</span>
                  <span className="text-apple-gray-400 ml-auto text-xs">{project.location}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {(stage === 'scanning' || stage === 'extracting') && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-apple-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>tstudio.net</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
