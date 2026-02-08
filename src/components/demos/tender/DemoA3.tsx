"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FileText,
  Sparkles,
  ArrowRight,
  Search,
  Lightbulb,
  PenTool,
  Users,
  Building2,
  ShieldCheck,
  Check,
  Clock,
} from "lucide-react";

// ── Bid Pack Generation Demo ─────────────────────────────────────────
// Simulates AI auto-generating a bid document with real content visible,
// including typed executive summary, team cards, project references, and
// compliance checklist.

const EXEC_SUMMARY =
  "TStudio propone un approccio integrato per la rigenerazione urbana del waterfront di Messina, fondato su 30 anni di esperienza nella trasformazione di contesti urbani complessi e sull'impiego di metodologie BIM avanzate per garantire qualità, tempi e costi certi.";

const FLOW_STEPS = [
  { icon: Search, label: "Analisi" },
  { icon: Lightbulb, label: "Concept" },
  { icon: PenTool, label: "Progetto Definitivo" },
];

const TEAM_MEMBERS = [
  { initials: "GS", name: "G. Salimei", role: "Lead Architect", color: "bg-ee-navy" },
  { initials: "MR", name: "M. Rossi", role: "BIM Manager", color: "bg-blue-600" },
  { initials: "LC", name: "L. Conti", role: "Strutturista", color: "bg-violet-600" },
];

const PROJECTS = [
  { name: "Crypta Balbi, Roma", match: 92 },
  { name: "Molo San Cataldo, Lecce", match: 88 },
];

const COMPLIANCE_ITEMS = [
  "SOA OS-6",
  "Team multidisciplinare",
  "Cronoprogramma",
  "Computo metrico",
];

type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export default function DemoA3() {
  const [phase, setPhase] = useState<Phase>(0);
  const [typedLength, setTypedLength] = useState(0);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  // Typing effect for executive summary
  const startTyping = useCallback(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      if (i >= EXEC_SUMMARY.length) {
        i = EXEC_SUMMARY.length;
        clearInterval(interval);
        // Move to phase 2 after typing completes
        setTimeout(() => setPhase(2), 400);
      }
      setTypedLength(i);
    }, 12);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Start typing executive summary
    timers.push(setTimeout(() => {
      setPhase(1);
    }, 500));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Trigger typing when phase 1 starts
  useEffect(() => {
    if (phase === 1) {
      const cleanup = startTyping();
      return cleanup;
    }
  }, [phase, startTyping]);

  // Sequence phases 2-5 after each other
  useEffect(() => {
    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 900);
      return () => clearTimeout(t);
    }
    if (phase === 3) {
      const t = setTimeout(() => setPhase(4), 900);
      return () => clearTimeout(t);
    }
    if (phase === 4) {
      // Animate compliance checklist items one by one
      const timers = COMPLIANCE_ITEMS.map((_, i) =>
        setTimeout(() => {
          setCheckedItems((prev) => [...prev, i]);
        }, 300 + i * 350)
      );
      const done = setTimeout(() => setPhase(5), 300 + COMPLIANCE_ITEMS.length * 350 + 400);
      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(done);
      };
    }
    if (phase === 5) {
      const t = setTimeout(() => setPhase(6), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const sectionFade = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" as const },
  };

  return (
    <div className="min-h-[280px] rounded-2xl border border-apple-gray-100 bg-apple-gray-50 p-4 font-sans overflow-hidden select-none">
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-ee-navy flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold text-ee-navy tracking-tight block leading-tight">
              Generazione Bid Pack
            </span>
            <span className="text-[9px] text-apple-gray-400">
              Waterfront di Messina
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {phase >= 6 ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5"
            >
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-[9px] font-semibold text-emerald-700">
                Pronta
              </span>
            </motion.div>
          ) : phase >= 1 ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 text-blue-400" />
              </motion.div>
              <span className="text-[9px] text-apple-gray-400 font-medium">
                Generazione in corso...
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* ── Document Body ─────────────────────────────── */}
      <div className="bg-white rounded-xl border border-apple-gray-100 shadow-sm p-3 space-y-2.5 max-h-[230px] overflow-hidden">

        {/* Section 1: Executive Summary */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div {...sectionFade}>
              <div className="flex items-center gap-1.5 mb-1">
                <FileText className="w-3 h-3 text-ee-navy" />
                <span className="text-[10px] font-semibold text-ee-navy">
                  Executive Summary
                </span>
              </div>
              <p className="text-[9px] leading-relaxed text-apple-gray-500 pl-[18px]">
                {EXEC_SUMMARY.slice(0, typedLength)}
                {typedLength < EXEC_SUMMARY.length && (
                  <motion.span
                    className="inline-block w-[3px] h-[10px] bg-ee-navy ml-[1px] align-middle rounded-sm"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 2: Approccio — 3-step flow */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div {...sectionFade}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Lightbulb className="w-3 h-3 text-ee-navy" />
                <span className="text-[10px] font-semibold text-ee-navy">
                  Approccio
                </span>
              </div>
              <div className="flex items-center gap-1.5 pl-[18px]">
                {FLOW_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex items-center gap-1.5">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.15, type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center gap-1 bg-blue-50 border border-blue-100 rounded-md px-1.5 py-0.5"
                      >
                        <Icon className="w-2.5 h-2.5 text-blue-500" />
                        <span className="text-[8px] font-medium text-blue-700">
                          {step.label}
                        </span>
                      </motion.div>
                      {i < FLOW_STEPS.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.15 + 0.1 }}
                        >
                          <ArrowRight className="w-2.5 h-2.5 text-apple-gray-300" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 3: Team */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div {...sectionFade}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Users className="w-3 h-3 text-ee-navy" />
                <span className="text-[10px] font-semibold text-ee-navy">
                  Team
                </span>
              </div>
              <div className="flex items-center gap-2.5 pl-[18px]">
                {TEAM_MEMBERS.map((member, i) => (
                  <motion.div
                    key={member.initials}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-center gap-1.5"
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white",
                        member.color
                      )}
                    >
                      {member.initials}
                    </div>
                    <div className="leading-none">
                      <span className="text-[8px] font-semibold text-apple-gray-700 block">
                        {member.name}
                      </span>
                      <span className="text-[7px] text-apple-gray-400">
                        {member.role}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 4: Progetti Simili */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Building2 className="w-3 h-3 text-ee-navy" />
                <span className="text-[10px] font-semibold text-ee-navy">
                  Progetti Simili
                </span>
              </div>
              <div className="flex items-center gap-2 pl-[18px]">
                {PROJECTS.map((project, i) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + i * 0.15 }}
                    className="flex items-center gap-1.5 bg-apple-gray-50 border border-apple-gray-100 rounded-lg px-2 py-1"
                  >
                    <span className="text-[8px] text-apple-gray-600 font-medium">
                      {project.name}
                    </span>
                    <span
                      className={cn(
                        "text-[7px] font-bold rounded-full px-1.5 py-[1px]",
                        project.match >= 90
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      )}
                    >
                      {project.match}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 5: Conformità Checklist */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div {...sectionFade}>
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3 h-3 text-ee-navy" />
                <span className="text-[10px] font-semibold text-ee-navy">
                  Conformità
                </span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-[18px]">
                {COMPLIANCE_ITEMS.map((item, i) => {
                  const isChecked = checkedItems.includes(i);
                  return (
                    <div key={item} className="flex items-center gap-1">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                          scale: isChecked ? 1 : 0.8,
                          opacity: isChecked ? 1 : 0.4,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        className={cn(
                          "w-3 h-3 rounded-[3px] flex items-center justify-center",
                          isChecked
                            ? "bg-emerald-500"
                            : "bg-apple-gray-200"
                        )}
                      >
                        {isChecked && (
                          <Check className="w-2 h-2 text-white" />
                        )}
                      </motion.div>
                      <span
                        className={cn(
                          "text-[8px] font-medium transition-colors duration-200",
                          isChecked
                            ? "text-apple-gray-700"
                            : "text-apple-gray-300"
                        )}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Success Banner ────────────────────────────── */}
      <AnimatePresence>
        {phase >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
            className="mt-2 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-lg px-3 py-1.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-emerald-800 block leading-tight">
                  Bozza Completa — 95% conformità
                </span>
                <span className="text-[8px] text-emerald-600">
                  Documento generato e pronto per revisione
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-600">
              <Clock className="w-3 h-3" />
              <span className="text-[9px] font-semibold">15 min</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
