"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Target, Clock, Briefcase, Shield } from "lucide-react";

// ── Go / No-Go Scoring Demo ─────────────────────────────────────────
// Simulates a multi-dimensional AI scoring dashboard that evaluates
// whether TStudio should bid on a tender opportunity.

interface ScoreDimension {
  label: string;
  value: number;
  color: string;
  barColor: string;
  icon: React.ElementType;
}

const DIMENSIONS: ScoreDimension[] = [
  {
    label: "Capability Fit",
    value: 92,
    color: "text-emerald-600",
    barColor: "bg-gradient-to-r from-emerald-400 to-emerald-500",
    icon: Shield,
  },
  {
    label: "Timeline Fit",
    value: 78,
    color: "text-amber-600",
    barColor: "bg-gradient-to-r from-amber-400 to-amber-500",
    icon: Clock,
  },
  {
    label: "Fee Potential",
    value: 85,
    color: "text-blue-600",
    barColor: "bg-gradient-to-r from-blue-400 to-blue-500",
    icon: Briefcase,
  },
  {
    label: "Strategic Fit",
    value: 95,
    color: "text-violet-600",
    barColor: "bg-gradient-to-r from-violet-400 to-violet-500",
    icon: Target,
  },
];

export default function DemoA2() {
  const [activeBars, setActiveBars] = useState<number>(0);
  const [showRecommendation, setShowRecommendation] = useState(false);

  useEffect(() => {
    const INITIAL_DELAY = 500;
    const BAR_DELAY = 500;

    // Reveal bars one by one
    const barTimers = DIMENSIONS.map((_, i) =>
      setTimeout(() => {
        setActiveBars(i + 1);
      }, INITIAL_DELAY + BAR_DELAY * i)
    );

    // Show GO recommendation
    const recTimer = setTimeout(
      () => setShowRecommendation(true),
      INITIAL_DELAY + BAR_DELAY * DIMENSIONS.length + 400
    );

    return () => {
      barTimers.forEach(clearTimeout);
      clearTimeout(recTimer);
    };
  }, []);

  const overallScore = Math.round(
    DIMENSIONS.reduce((s, d) => s + d.value, 0) / DIMENSIONS.length
  );

  return (
    <div className="min-h-[280px] rounded-2xl border border-apple-gray-100 bg-apple-gray-50 p-4 font-sans overflow-hidden select-none">
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-ee-navy flex items-center justify-center">
            <Target className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-semibold text-ee-navy tracking-tight">
            Go/No-Go Analysis
          </span>
        </div>
        <span className="text-[10px] text-apple-gray-400 font-medium">
          Waterfront di Messina
        </span>
      </div>

      {/* ── Content Grid ────────────────────────────── */}
      <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
        {/* Left: Score Bars */}
        <div className="bg-white rounded-xl border border-apple-gray-100 p-3 shadow-sm space-y-3">
          {DIMENSIONS.map((dim, i) => {
            const isActive = i < activeBars;
            const Icon = dim.icon;
            return (
              <div key={dim.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon
                      className={cn(
                        "w-3 h-3 transition-colors duration-300",
                        isActive ? dim.color : "text-apple-gray-200"
                      )}
                    />
                    <span
                      className={cn(
                        "text-[10px] font-medium transition-colors duration-300",
                        isActive ? "text-apple-gray-700" : "text-apple-gray-300"
                      )}
                    >
                      {dim.label}
                    </span>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn("text-[10px] font-bold tabular-nums", dim.color)}
                      >
                        {dim.value}%
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="w-full h-1.5 rounded-full bg-apple-gray-100 overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", dim.barColor)}
                    initial={{ width: "0%" }}
                    animate={{
                      width: isActive ? `${dim.value}%` : "0%",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Recommendation Badge */}
        <div className="flex flex-col items-center gap-2 min-w-[90px]">
          <AnimatePresence>
            {showRecommendation ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className="flex flex-col items-center"
              >
                {/* GO Badge */}
                <div className="relative">
                  <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-200 flex flex-col items-center justify-center">
                    <Check className="w-5 h-5 text-white mb-0.5" />
                    <span className="text-lg font-black text-white tracking-tight leading-none">
                      GO
                    </span>
                  </div>
                  {/* Glow ring */}
                  <motion.div
                    className="absolute -inset-1 rounded-2xl border-2 border-emerald-300"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: [0.8, 0.2, 0.8] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Overall score */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 text-center"
                >
                  <span className="text-[10px] font-semibold text-apple-gray-600 block">
                    Score {overallScore}/100
                  </span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="w-[72px] h-[72px] rounded-2xl bg-apple-gray-100 border border-apple-gray-200 flex items-center justify-center"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-[10px] text-apple-gray-300 font-medium">
                  Analisi...
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────── */}
      <AnimatePresence>
        {showRecommendation && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-3 flex items-center justify-center gap-1.5"
          >
            <span className="text-[10px] text-apple-gray-400">
              Priorit\u00E0:{" "}
              <span className="font-semibold text-emerald-600">Alta</span>
            </span>
            <span className="text-apple-gray-200">\u00B7</span>
            <span className="text-[10px] text-apple-gray-400">
              Crypta Balbi come referenza
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
