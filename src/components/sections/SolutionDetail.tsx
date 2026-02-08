"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  FileSearch,
  BookOpen,
  LayoutDashboard,
  TrendingUp,
  Play,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { demoMap } from "@/components/demos";

const solutionMeta: Record<
  string,
  { icon: typeof FileSearch; color: string; colorBg: string; subCount: number }
> = {
  a: { icon: FileSearch, color: "text-blue-600", colorBg: "bg-blue-50", subCount: 3 },
  b: { icon: BookOpen, color: "text-emerald-600", colorBg: "bg-emerald-50", subCount: 3 },
  c: { icon: LayoutDashboard, color: "text-violet-600", colorBg: "bg-violet-50", subCount: 3 },
};

interface Props {
  solutionId: string;
  onClose: () => void;
}

export default function SolutionDetail({ solutionId, onClose }: Props) {
  const t = useTranslations("solutions");
  const [currentSub, setCurrentSub] = useState(0);
  const [demoStarted, setDemoStarted] = useState(false);
  const meta = solutionMeta[solutionId];
  const Icon = meta.icon;
  const subKey = `sub${currentSub + 1}`;

  const bullets = [
    t(`${solutionId}.${subKey}.bullet1`),
    t(`${solutionId}.${subKey}.bullet2`),
    t(`${solutionId}.${subKey}.bullet3`),
  ];

  const results = [
    {
      label: t(`${solutionId}.${subKey}.result1label`),
      value: t(`${solutionId}.${subKey}.result1value`),
    },
    {
      label: t(`${solutionId}.${subKey}.result2label`),
      value: t(`${solutionId}.${subKey}.result2value`),
    },
    {
      label: t(`${solutionId}.${subKey}.result3label`),
      value: t(`${solutionId}.${subKey}.result3value`),
    },
  ];

  const goNext = () => {
    if (currentSub < meta.subCount - 1) {
      setCurrentSub((s) => s + 1);
      setDemoStarted(false);
    }
  };
  const goPrev = () => {
    if (currentSub > 0) {
      setCurrentSub((s) => s - 1);
      setDemoStarted(false);
    }
  };
  const handleDotClick = useCallback((i: number) => {
    setCurrentSub(i);
    setDemoStarted(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-apple-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Image
              src="/logos/ee-partners-horizontal.svg"
              alt="ee partners"
              width={180}
              height={50}
              className="h-10 w-auto"
            />
            <div className="hidden sm:block h-8 w-px bg-apple-gray-200" />
            <Image
              src="/logos/tstudio.png"
              alt="TStudio"
              width={100}
              height={40}
              className="hidden sm:block h-8 w-auto"
            />
            <div className="hidden lg:flex items-center gap-3">
              <div className="h-6 w-px bg-apple-gray-200" />
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", meta.colorBg)}>
                <Icon className={cn("w-4 h-4", meta.color)} />
              </div>
              <span className="text-sm font-semibold text-apple-gray-700">
                {t(`${solutionId}.title`)}
              </span>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {Array.from({ length: meta.subCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    i === currentSub
                      ? "bg-ee-navy w-8"
                      : "bg-apple-gray-200 hover:bg-apple-gray-300 w-2.5"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={`${solutionId}-${currentSub}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-6 py-10"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-apple-gray-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-ts-green" />
          <span className="font-medium">
            {t(`${solutionId}.title`)} — {t(`${solutionId}.${subKey}.title`)}
          </span>
        </div>

        {/* Top section: Big stat + Title + Demo side by side */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Left: Headline content */}
          <div>
            {/* Giant stat value */}
            <div className="mb-6">
              <div className="text-8xl sm:text-9xl font-black text-gradient-navy leading-none">
                {t(`${solutionId}.${subKey}.statValue`)}
              </div>
              <div className="text-base text-apple-gray-400 mt-3 font-medium">
                {t(`${solutionId}.${subKey}.statLabel`)}
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apple-gray-800 mb-6 leading-tight">
              {t(`${solutionId}.${subKey}.title`)}
            </h2>

            <p className="text-lg text-apple-gray-500 leading-relaxed mb-8">
              {t(`${solutionId}.${subKey}.description`)}
            </p>

            {/* Highlight quote */}
            <div className="p-5 rounded-2xl bg-ee-navy/[0.03] border-l-4 border-ee-navy mb-8">
              <p className="text-lg font-semibold text-ee-navy italic">
                {t(`${solutionId}.${subKey}.highlight`)}
              </p>
            </div>
          </div>

          {/* Right: DEMO - click to start */}
          <div className="flex flex-col relative">
            {(() => {
              const DemoComponent = demoMap[solutionId]?.[currentSub];
              if (!DemoComponent) return null;

              return (
                <div className="flex-1 min-h-[420px] relative">
                  <AnimatePresence mode="wait">
                    {!demoStarted ? (
                      <motion.button
                        key="play-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setDemoStarted(true)}
                        className="absolute inset-0 z-10 rounded-2xl bg-apple-gray-50 border-2 border-dashed border-apple-gray-200 hover:border-ee-navy/30 flex flex-col items-center justify-center cursor-pointer group transition-all duration-300 hover:bg-apple-gray-50/80"
                      >
                        <div className="w-20 h-20 rounded-full gradient-navy flex items-center justify-center shadow-lg shadow-ee-navy/20 group-hover:shadow-xl group-hover:shadow-ee-navy/30 group-hover:scale-110 transition-all duration-300">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <p className="text-sm font-semibold text-apple-gray-500 mt-4 group-hover:text-ee-navy transition-colors">
                          Avvia Demo Interattiva
                        </p>
                        <p className="text-xs text-apple-gray-300 mt-1">
                          Clicca per vedere lo strumento in azione
                        </p>
                      </motion.button>
                    ) : (
                      <motion.div
                        key="demo-running"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" as const }}
                        className="h-full [&>div]:min-h-[420px] [&>div]:h-full"
                      >
                        <DemoComponent key={`demo-${solutionId}-${currentSub}`} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Bottom section: Bullets + Scenario + Results in a prominent grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Bullets card */}
          <div className="p-8 rounded-3xl bg-white border border-apple-gray-100 shadow-sm">
            <h4 className="text-xs font-bold tracking-widest text-apple-gray-400 uppercase mb-6">
              Funzionalit&agrave; Chiave
            </h4>
            <ul className="space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ts-green flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-apple-gray-600 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scenario card */}
          <div className="p-8 rounded-3xl gradient-card border border-apple-gray-100 shadow-sm">
            <h4 className="text-xs font-bold tracking-widest text-apple-gray-400 uppercase mb-6">
              {t("scenarioTitle")}
            </h4>
            <p className="text-sm text-apple-gray-600 italic leading-relaxed">
              &ldquo;{t(`${solutionId}.${subKey}.scenario`)}&rdquo;
            </p>
          </div>

          {/* Results card - highlighted with gradient */}
          <div className="p-8 rounded-3xl gradient-navy text-white shadow-lg glow-navy">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-white/60" />
              <h4 className="text-xs font-bold tracking-widest text-white/60 uppercase">
                {t("resultsTitle")}
              </h4>
            </div>
            <div className="space-y-5">
              {results.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-white/70">
                    {r.label}
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-apple-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={currentSub === 0 ? onClose : goPrev}
            className="flex items-center gap-2 text-sm font-medium text-apple-gray-500 hover:text-apple-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentSub === 0 ? t("backToAll") : t("back")}
          </button>

          {currentSub < meta.subCount - 1 ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-8 py-3 gradient-navy text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-ee-navy/20"
            >
              {t("continue")}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-8 py-3 gradient-navy text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-ee-navy/20"
            >
              {t("backToTop")}
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
