"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FileText, Check, Search } from "lucide-react";

// ── Requirement Extraction Demo ──────────────────────────────────────
// Simulates AI scanning a tender PDF and extracting categorised requirements.

interface Requirement {
  label: string;
  category: "eligibilita" | "tecnici" | "deliverables" | "tempistiche";
}

const REQUIREMENTS: Requirement[] = [
  { label: "SOA OS-6 cat. III", category: "eligibilita" },
  { label: "Team multidisciplinare", category: "tecnici" },
  { label: "Relazione tecnica", category: "deliverables" },
  { label: "Progetto definitivo", category: "deliverables" },
  { label: "Cronoprogramma 24 mesi", category: "tempistiche" },
  { label: "Fatturato \u2265 2M\u20AC", category: "eligibilita" },
  { label: "BIM LOD 300", category: "tecnici" },
  { label: "Computo metrico", category: "deliverables" },
];

const CATEGORY_STYLES: Record<
  Requirement["category"],
  { bg: string; text: string; label: string }
> = {
  eligibilita: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    label: "Eligibilit\u00E0",
  },
  tecnici: { bg: "bg-blue-100", text: "text-blue-700", label: "Tecnici" },
  deliverables: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    label: "Deliverables",
  },
  tempistiche: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    label: "Tempistiche",
  },
};

const DOC_LINES = [
  { w: "w-[90%]", text: "Art. 1 \u2013 Oggetto dell'appalto" },
  { w: "w-[75%]", text: "Requisiti di partecipazione..." },
  { w: "w-[85%]", text: "Categoria SOA OS-6 classe III" },
  { w: "w-[60%]", text: "Il concorrente deve disporre di..." },
  { w: "w-[80%]", text: "Team multidisciplinare richiesto" },
  { w: "w-[70%]", text: "Elaborati progettuali richiesti:" },
  { w: "w-[88%]", text: "Relazione tecnica e metodologica" },
  { w: "w-[65%]", text: "Tempistiche di consegna 24 mesi" },
];

export default function DemoA1() {
  const [progress, setProgress] = useState(0);
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);
  const [visibleReqs, setVisibleReqs] = useState<number>(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const INITIAL_DELAY = 500;
    const LINE_INTERVAL = 350;
    const highlightOrder = [0, 2, 4, 6, 7, 1, 3, 5];

    // Animate progress bar smoothly
    const progressTimer = setTimeout(() => {
      const start = Date.now();
      const duration = LINE_INTERVAL * REQUIREMENTS.length + 400;
      const tick = () => {
        const elapsed = Date.now() - start;
        const pct = Math.min(100, (elapsed / duration) * 100);
        setProgress(pct);
        if (pct < 100) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, INITIAL_DELAY);

    // Highlight lines and reveal requirements
    const timers = highlightOrder.map((lineIdx, i) =>
      setTimeout(() => {
        setHighlightedLines((prev) => [...prev, lineIdx]);
        if (i < REQUIREMENTS.length) {
          setVisibleReqs(i + 1);
        }
      }, INITIAL_DELAY + LINE_INTERVAL * i)
    );

    // Final "complete" state
    const doneTimer = setTimeout(
      () => {
        setComplete(true);
        setVisibleReqs(REQUIREMENTS.length);
      },
      INITIAL_DELAY + LINE_INTERVAL * highlightOrder.length + 300
    );

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(doneTimer);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-[280px] rounded-2xl border border-apple-gray-100 bg-apple-gray-50 p-4 font-sans overflow-hidden select-none">
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-ee-navy flex items-center justify-center">
            <Search className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-semibold text-ee-navy tracking-tight">
            Bando Waterfront di Messina
          </span>
        </div>
        <AnimatePresence>
          {complete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5"
            >
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-semibold text-emerald-700">
                47 requisiti estratti
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Progress Bar ────────────────────────────── */}
      <div className="w-full h-1 rounded-full bg-apple-gray-100 mb-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-ee-navy to-blue-500"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* ── Content Grid ────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left: Document View */}
        <div className="bg-white rounded-xl border border-apple-gray-100 p-3 shadow-sm">
          <div className="flex items-center gap-1.5 mb-2">
            <FileText className="w-3 h-3 text-apple-gray-400" />
            <span className="text-[9px] font-medium text-apple-gray-400 uppercase tracking-wider">
              Documento PDF
            </span>
          </div>
          <div className="space-y-1.5">
            {DOC_LINES.map((line, i) => {
              const isHighlighted = highlightedLines.includes(i);
              return (
                <div key={i} className="relative">
                  <motion.div
                    className={cn(
                      "h-[18px] rounded-[3px] flex items-center px-1.5 transition-colors duration-300",
                      isHighlighted
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-apple-gray-50"
                    )}
                    animate={
                      isHighlighted
                        ? {
                            boxShadow: [
                              "0 0 0px rgba(59,130,246,0)",
                              "0 0 8px rgba(59,130,246,0.3)",
                              "0 0 2px rgba(59,130,246,0.1)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                  >
                    <span
                      className={cn(
                        "text-[8px] truncate transition-colors duration-300",
                        line.w,
                        isHighlighted
                          ? "text-blue-700 font-medium"
                          : "text-apple-gray-300"
                      )}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Extracted Requirements */}
        <div className="bg-white rounded-xl border border-apple-gray-100 p-3 shadow-sm">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[9px] font-medium text-apple-gray-400 uppercase tracking-wider">
              Requisiti Estratti
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            <AnimatePresence>
              {REQUIREMENTS.slice(0, visibleReqs).map((req) => {
                const style = CATEGORY_STYLES[req.category];
                return (
                  <motion.span
                    key={req.label}
                    initial={{ opacity: 0, scale: 0.7, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium",
                      style.bg,
                      style.text
                    )}
                  >
                    {req.label}
                  </motion.span>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Category legend */}
          {visibleReqs > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 pt-2 border-t border-apple-gray-100 flex flex-wrap gap-2"
            >
              {Object.entries(CATEGORY_STYLES).map(([key, style]) => (
                <span
                  key={key}
                  className="flex items-center gap-1 text-[8px] text-apple-gray-400"
                >
                  <span
                    className={cn("w-1.5 h-1.5 rounded-full", style.bg)}
                  />
                  {style.label}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
