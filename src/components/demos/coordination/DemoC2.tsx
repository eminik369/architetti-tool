"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DemoC2 — "Action Board (Kanban)"                                  */
/*  A mini 3-column kanban. Cards appear one by one, then the first   */
/*  "Open" card slides across to "Done".                              */
/* ------------------------------------------------------------------ */

interface TaskCard {
  id: string;
  title: string;
  owner: string;
  due?: string;
  warning?: boolean;
  done?: boolean;
}

type ColumnKey = "open" | "blocked" | "done";

interface Column {
  key: ColumnKey;
  label: string;
  headerColor: string;
  dotColor: string;
}

const columns: Column[] = [
  {
    key: "open",
    label: "Open",
    headerColor: "text-blue-600",
    dotColor: "bg-blue-500",
  },
  {
    key: "blocked",
    label: "Blocked",
    headerColor: "text-amber-600",
    dotColor: "bg-amber-500",
  },
  {
    key: "done",
    label: "Done",
    headerColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
  },
];

const initialCards: Record<ColumnKey, TaskCard[]> = {
  open: [
    { id: "t1", title: "Invio layout cliente", owner: "GS", due: "Ven" },
    { id: "t2", title: "Revisione strutturale", owner: "MR", due: "Lun" },
  ],
  blocked: [
    { id: "t3", title: "Approvazione materiali", owner: "LC", warning: true },
  ],
  done: [
    { id: "t4", title: "Planimetria definitiva", owner: "GS", done: true },
  ],
};

// Flatten all cards in display order: open0, open1, blocked0, done0
const displayOrder: { col: ColumnKey; idx: number }[] = [
  { col: "open", idx: 0 },
  { col: "open", idx: 1 },
  { col: "blocked", idx: 0 },
  { col: "done", idx: 0 },
];

export default function DemoC2() {
  // How many cards have been revealed (0..4)
  const [revealedCount, setRevealedCount] = useState(0);
  // Has the "move" animation happened?
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const INITIAL_DELAY = 500;
    const CARD_INTERVAL = 600;

    displayOrder.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setRevealedCount(i + 1);
        }, INITIAL_DELAY + i * CARD_INTERVAL),
      );
    });

    // After all cards shown, move first open card to done
    timers.push(
      setTimeout(() => {
        setMoved(true);
      }, INITIAL_DELAY + displayOrder.length * CARD_INTERVAL + 800),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Build visible cards per column, accounting for the move
  const getColumnCards = (colKey: ColumnKey): TaskCard[] => {
    const base = initialCards[colKey];
    const visibleBase = base.filter((_, i) => {
      const orderIdx = displayOrder.findIndex(
        (d) => d.col === colKey && d.idx === i,
      );
      return orderIdx !== -1 && orderIdx < revealedCount;
    });

    if (colKey === "open" && moved) {
      // Remove first card from open
      return visibleBase.slice(1);
    }
    if (colKey === "done" && moved) {
      // Add first open card to done (mark as done)
      return [
        ...visibleBase,
        { ...initialCards.open[0], done: true, id: "t1-moved" },
      ];
    }
    return visibleBase;
  };

  const renderCard = (card: TaskCard) => (
    <motion.div
      key={card.id}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "rounded-lg bg-white border px-2.5 py-2 shadow-sm",
        card.warning
          ? "border-amber-200"
          : card.done
            ? "border-emerald-200"
            : "border-apple-gray-100",
      )}
    >
      <p className="text-[11px] font-medium text-apple-gray-800 leading-tight mb-1.5">
        {card.title}
      </p>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-[10px] text-apple-gray-400">
          <User className="w-2.5 h-2.5" />
          {card.owner}
        </span>
        {card.due && (
          <span className="flex items-center gap-0.5 text-[10px] text-apple-gray-400">
            <Clock className="w-2.5 h-2.5" />
            {card.due}
          </span>
        )}
        {card.warning && (
          <AlertTriangle className="w-3 h-3 text-red-400" />
        )}
        {card.done && (
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-[280px] w-full rounded-2xl bg-apple-gray-50 border border-apple-gray-100 p-4 overflow-hidden flex flex-col">
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-ee-navy" />
        <span className="text-[11px] font-semibold tracking-wide uppercase text-apple-gray-400">
          Action Board
        </span>
      </div>

      {/* Kanban columns */}
      <div className="flex-1 grid grid-cols-3 gap-2">
        {columns.map((col) => {
          const cards = getColumnCards(col.key);
          return (
            <div key={col.key} className="flex flex-col">
              {/* Column header */}
              <div className="flex items-center gap-1.5 mb-2">
                <div className={cn("w-1.5 h-1.5 rounded-full", col.dotColor)} />
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider",
                    col.headerColor,
                  )}
                >
                  {col.label}
                </span>
                <span className="text-[10px] text-apple-gray-300 ml-auto">
                  {cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-1.5 flex-1">
                <AnimatePresence mode="popLayout">
                  {cards.map((card) => renderCard(card))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
