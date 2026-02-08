"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Shield,
  Clock,
  CircleDot,
  Calendar,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DemoC3 — "Weekly Report Generation"                                */
/*  AI automatically compiles a client-ready weekly report for the     */
/*  "Waterfront di Messina" project. Sections appear progressively     */
/*  with real project management content in Italian.                    */
/* ------------------------------------------------------------------ */

interface ProgressItem {
  label: string;
  delay: number;
}

interface RiskItem {
  label: string;
  severity: "Alta" | "Media";
  color: string;
  barColor: string;
  barWidth: string;
}

const progressItems: ProgressItem[] = [
  { label: "Planimetria definitiva approvata dal committente", delay: 0 },
  { label: "Revisione strutturale rampe completata", delay: 300 },
  { label: "Consegna documentazione BIM LOD 300", delay: 600 },
];

const nextSteps = [
  "Invio progetto definitivo al cliente (scad. 14 Feb)",
  "Riunione con Autorit\u00e0 Portuale (12 Feb)",
];

const risks: RiskItem[] = [
  {
    label: "Ritardo approvazione materiali",
    severity: "Alta",
    color: "text-red-600",
    barColor: "bg-red-400",
    barWidth: "w-4/5",
  },
  {
    label: "Disponibilit\u00e0 team strutturale",
    severity: "Media",
    color: "text-amber-600",
    barColor: "bg-amber-400",
    barWidth: "w-3/5",
  },
];

export default function DemoC3() {
  /* Visibility stages driven by timers */
  const [showProgress, setShowProgress] = useState(false);
  const [progressRevealed, setProgressRevealed] = useState(0);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [showRisks, setShowRisks] = useState(false);
  const [showDecisions, setShowDecisions] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [statusProgress, setStatusProgress] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    /* Stage 1 — Progress section header (0.5s) */
    timers.push(setTimeout(() => setShowProgress(true), 500));

    /* Stage 1 items — appear one by one */
    progressItems.forEach((item) => {
      timers.push(
        setTimeout(() => {
          setProgressRevealed((prev) => prev + 1);
        }, 800 + item.delay),
      );
    });

    /* Stage 2 — Next steps (2s) */
    timers.push(setTimeout(() => setShowNextSteps(true), 2000));

    /* Stage 3 — Risks (3s) */
    timers.push(setTimeout(() => setShowRisks(true), 3000));

    /* Stage 4 — Decisions (4s) */
    timers.push(setTimeout(() => setShowDecisions(true), 4000));

    /* Stage 5 — Status bar (5s) */
    timers.push(setTimeout(() => setShowStatusBar(true), 5000));

    /* Animate progress bar fill */
    timers.push(setTimeout(() => setStatusProgress(100), 5300));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-[280px] w-full rounded-2xl bg-apple-gray-50 border border-apple-gray-100 p-4 overflow-hidden flex flex-col">
      {/* ── Title bar ── */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-ee-navy" />
        <span className="text-[11px] font-semibold tracking-wide uppercase text-apple-gray-400">
          Weekly Report
        </span>
      </div>

      {/* ── Report header ── */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-ee-navy shrink-0" />
          <h3 className="text-[13px] font-semibold text-ee-navy leading-tight">
            Report Settimanale &mdash; Waterfront di Messina
          </h3>
        </div>
        <p className="text-[10px] text-apple-gray-400 mt-0.5 ml-[22px]">
          Settimana 3–7 Feb 2026
        </p>
      </div>

      {/* ── Scrollable report body ── */}
      <div className="flex-1 space-y-2.5 overflow-y-auto pr-0.5">
        {/* ── 1. PROGRESSI SETTIMANA ── */}
        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                  Progressi Settimana
                </span>
              </div>
              <div className="space-y-1 ml-[18px]">
                {progressItems.map((item, i) => (
                  <AnimatePresence key={i}>
                    {i < progressRevealed && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex items-start gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-[1px]" />
                        <span className="text-[11px] text-apple-gray-700 leading-tight">
                          {item.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 2. PROSSIMI PASSI ── */}
        <AnimatePresence>
          {showNextSteps && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <ArrowRight className="w-3 h-3 text-blue-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                  Prossimi Passi
                </span>
              </div>
              <div className="space-y-1 ml-[18px]">
                {nextSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                    className="flex items-start gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-blue-400 shrink-0 mt-[1px]" />
                    <span className="text-[11px] text-apple-gray-700 leading-tight">
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 3. RISCHI ATTIVI ── */}
        <AnimatePresence>
          {showRisks && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                  Rischi Attivi
                </span>
              </div>
              <div className="space-y-1.5 ml-[18px]">
                {risks.map((risk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.25,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[11px] text-apple-gray-700 leading-tight flex-1 min-w-0">
                      {risk.label}
                    </span>
                    {/* Severity mini-bar */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-12 h-1.5 rounded-full bg-apple-gray-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: 0.6,
                            delay: 0.15,
                            ease: "easeOut",
                          }}
                          className={cn(
                            "h-full rounded-full",
                            risk.barColor,
                            risk.barWidth,
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-[9px] font-semibold uppercase tracking-wide w-7",
                          risk.color,
                        )}
                      >
                        {risk.severity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 4. DECISIONI NECESSARIE ── */}
        <AnimatePresence>
          {showDecisions && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="w-3 h-3 text-red-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600">
                  Decisioni Necessarie
                </span>
              </div>
              <div className="ml-[18px]">
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex items-start gap-1.5"
                >
                  <CircleDot className="w-3 h-3 text-red-500 shrink-0 mt-[1px]" />
                  <span className="text-[11px] text-apple-gray-700 leading-tight">
                    Approvazione variante rampe accesso{" "}
                    <span className="text-[10px] font-semibold text-red-500">
                      &mdash; Entro 10 Feb
                    </span>
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 5. Status bar ── */}
      <AnimatePresence>
        {showStatusBar && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-3 pt-2.5 border-t border-apple-gray-100"
          >
            {/* Completion progress bar */}
            <div className="w-full h-1 rounded-full bg-apple-gray-100 mb-2 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${statusProgress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full bg-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-medium text-emerald-700">
                  Report generato in 5 min
                </span>
                <span className="text-[10px] text-apple-gray-300 mx-0.5">
                  &middot;
                </span>
                <span className="text-[10px] font-medium text-emerald-700">
                  Client-safe
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                <Clock className="w-2.5 h-2.5 text-emerald-500" />
                <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wide">
                  Pronto per invio
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
