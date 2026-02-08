"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ListTodo,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DemoC1 — "Meeting to Actions"                                     */
/*  A meeting transcript is analysed line-by-line and key items are   */
/*  extracted on the right side.                                       */
/* ------------------------------------------------------------------ */

interface TranscriptLine {
  text: string;
  highlightColor: string; // tailwind ring/bg color when active
}

interface ExtractedItem {
  icon: React.ReactNode;
  label: string;
  detail: string;
  accentColor: string; // tailwind text color
  bgColor: string; // tailwind bg color
}

const transcriptLines: TranscriptLine[] = [
  {
    text: "Approvato il layout finale delle rampe",
    highlightColor: "bg-emerald-50 ring-emerald-300",
  },
  {
    text: "Scadenza invio al cliente: venerdì",
    highlightColor: "bg-blue-50 ring-blue-300",
  },
  {
    text: "Rischio: ritardo approvazione materiali",
    highlightColor: "bg-amber-50 ring-amber-300",
  },
  {
    text: "Guendalina conferma revisione entro mercoledì",
    highlightColor: "bg-blue-50 ring-blue-300",
  },
];

const extractedItems: ExtractedItem[] = [
  {
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
    label: "Decisione",
    detail: "Layout rampe approvato",
    accentColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: <ListTodo className="w-3.5 h-3.5 text-blue-500" />,
    label: "Azione",
    detail: "Invio al cliente → ven (GS)",
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
    label: "Rischio",
    detail: "Ritardo materiali (Alta)",
    accentColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    icon: <ListTodo className="w-3.5 h-3.5 text-blue-500" />,
    label: "Azione",
    detail: "Revisione GS → mer",
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

export default function DemoC1() {
  // Which transcript line is currently highlighted (-1 = none yet)
  const [activeLineIdx, setActiveLineIdx] = useState(-1);
  // Which extracted items are visible
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const INITIAL_DELAY = 500;
    const LINE_INTERVAL = 900;

    transcriptLines.forEach((_, i) => {
      // Highlight transcript line
      timers.push(
        setTimeout(() => {
          setActiveLineIdx(i);
        }, INITIAL_DELAY + i * LINE_INTERVAL),
      );

      // Show corresponding extracted item 400ms after highlight
      timers.push(
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, i]);
        }, INITIAL_DELAY + i * LINE_INTERVAL + 400),
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-[280px] w-full rounded-2xl bg-apple-gray-50 border border-apple-gray-100 p-4 overflow-hidden flex flex-col">
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-ee-navy" />
        <span className="text-[11px] font-semibold tracking-wide uppercase text-apple-gray-400">
          Meeting to Actions
        </span>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3">
        {/* ---------- LEFT: Transcript ---------- */}
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-medium text-apple-gray-400 mb-1.5 uppercase tracking-wider">
            Transcript
          </p>
          <div className="space-y-1.5">
            {transcriptLines.map((line, i) => {
              const isActive = activeLineIdx >= i;
              const isCurrent = activeLineIdx === i;
              return (
                <motion.div
                  key={i}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-[11px] leading-snug transition-all duration-500 ring-1 ring-transparent",
                    isActive
                      ? cn(line.highlightColor, "ring-1")
                      : "bg-white text-apple-gray-500",
                  )}
                  animate={
                    isCurrent
                      ? { scale: [1, 1.02, 1] }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  <span
                    className={cn(
                      "transition-colors duration-300",
                      isActive ? "text-apple-gray-800 font-medium" : "text-apple-gray-400",
                    )}
                  >
                    {line.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ---------- RIGHT: Extracted Items ---------- */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <ArrowRight className="w-3 h-3 text-apple-gray-300" />
            <p className="text-[10px] font-medium text-apple-gray-400 uppercase tracking-wider">
              Estratto
            </p>
          </div>
          <div className="space-y-1.5">
            <AnimatePresence>
              {extractedItems.map((item, i) =>
                visibleItems.includes(i) ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 flex items-start gap-2",
                      item.bgColor,
                    )}
                  >
                    <span className="mt-0.5 shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-wide",
                          item.accentColor,
                        )}
                      >
                        {item.label}
                      </p>
                      <p className="text-[11px] text-apple-gray-700 leading-tight">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                ) : null,
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
