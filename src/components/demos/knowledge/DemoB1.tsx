"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Upload,
  FileText,
  Sparkles,
  Check,
  MapPin,
  Ruler,
  Building2,
  Banknote,
  Share2,
} from "lucide-react";

/* ---------- data ---------- */

const uploadedDocs = [
  { name: "Relazione_Waterfront.pdf", pages: 48 },
  { name: "Budget_Crypta.xlsx", pages: 12 },
  { name: "Molo_SanCataldo.pdf", pages: 35 },
  { name: "Scuola_Mazzacurati.pdf", pages: 27 },
];

const docExcerpt =
  "Il waterfront di Messina si estende per 2.3km lungo la costa tirrenica. Il progetto, commissionato dall\u2019Autorit\u00e0 Portuale, prevede un budget complessivo di \u20ac12.5M...";

interface Entity {
  label: string;
  type: "location" | "metric" | "client" | "budget";
  color: string;
  bg: string;
  icon: typeof MapPin;
  /** char index ranges in docExcerpt to highlight */
  start: number;
  end: number;
}

const entities: Entity[] = [
  {
    label: "Messina",
    type: "location",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    icon: MapPin,
    start: 17,
    end: 24,
  },
  {
    label: "2.3km",
    type: "metric",
    color: "text-violet-600",
    bg: "bg-violet-50 border-violet-200",
    icon: Ruler,
    start: 40,
    end: 45,
  },
  {
    label: "Autorit\u00e0 Portuale",
    type: "client",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    icon: Building2,
    start: 104,
    end: 121,
  },
  {
    label: "\u20ac12.5M",
    type: "budget",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    icon: Banknote,
    start: 156,
    end: 162,
  },
];

interface GraphLink {
  from: string;
  to: string;
  similarity: number;
}

const graphNodes = [
  { id: "waterfront", label: "Waterfront Messina", x: 18, y: 28 },
  { id: "molo", label: "Molo San Cataldo", x: 78, y: 22 },
  { id: "crypta", label: "Crypta Balbi", x: 22, y: 72 },
  { id: "scuola", label: "Scuola Mazzacurati", x: 76, y: 76 },
];

const graphLinks: GraphLink[] = [
  { from: "waterfront", to: "molo", similarity: 92 },
  { from: "crypta", to: "scuola", similarity: 45 },
];

/* ---------- helpers ---------- */

/** Build excerpt JSX with highlighted entities */
function buildHighlightedExcerpt(
  text: string,
  revealed: number
): React.ReactNode[] {
  // Sort revealed entities by start index
  const active = entities
    .slice(0, revealed)
    .sort((a, b) => a.start - b.start);

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  active.forEach((ent, i) => {
    if (ent.start > cursor) {
      parts.push(
        <span key={`t-${i}`} className="text-apple-gray-500">
          {text.slice(cursor, ent.start)}
        </span>
      );
    }
    // highlighted span
    const highlightColors: Record<string, string> = {
      location: "bg-blue-100/80 text-blue-700",
      metric: "bg-violet-100/80 text-violet-700",
      client: "bg-emerald-100/80 text-emerald-700",
      budget: "bg-amber-100/80 text-amber-700",
    };
    parts.push(
      <motion.span
        key={`h-${i}`}
        initial={{ backgroundColor: "rgba(255,255,255,0)" }}
        animate={{ backgroundColor: undefined }}
        className={cn(
          "rounded px-0.5 font-medium",
          highlightColors[ent.type]
        )}
      >
        {text.slice(ent.start, ent.end)}
      </motion.span>
    );
    cursor = ent.end;
  });

  if (cursor < text.length) {
    parts.push(
      <span key="tail" className="text-apple-gray-500">
        {text.slice(cursor)}
      </span>
    );
  }

  return parts;
}

/* ---------- component ---------- */

type Phase = 0 | 1 | 2 | 3 | 4;

export default function DemoB1() {
  const [phase, setPhase] = useState<Phase>(0);
  const [revealedEntities, setRevealedEntities] = useState(0);
  const [revealedLinks, setRevealedLinks] = useState(0);
  const [nodesVisible, setNodesVisible] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1 - upload zone (0.5s)
    timers.push(setTimeout(() => setPhase(1), 500));

    // Phase 2 - AI reading document (1.5s)
    timers.push(setTimeout(() => setPhase(2), 1500));

    // Entity extraction, one by one
    entities.forEach((_, i) => {
      timers.push(
        setTimeout(() => setRevealedEntities(i + 1), 2200 + i * 600)
      );
    });

    // Phase 3 - knowledge graph (after entities done)
    const graphStart = 2200 + entities.length * 600 + 400;
    timers.push(setTimeout(() => setPhase(3), graphStart));

    // Reveal nodes one by one
    graphNodes.forEach((_, i) => {
      timers.push(
        setTimeout(() => setNodesVisible(i + 1), graphStart + 200 + i * 300)
      );
    });

    // Reveal links
    const linksStart = graphStart + 200 + graphNodes.length * 300 + 300;
    graphLinks.forEach((_, i) => {
      timers.push(
        setTimeout(() => setRevealedLinks(i + 1), linksStart + i * 500)
      );
    });

    // Phase 4 - summary
    timers.push(
      setTimeout(() => setPhase(4), linksStart + graphLinks.length * 500 + 600)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={cn(
        "min-h-[280px] w-full rounded-2xl border border-apple-gray-100",
        "bg-apple-gray-50 p-4 font-sans overflow-hidden"
      )}
    >
      {/* ---- Header ---- */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-ee-navy">
          <BookOpen className="h-3 w-3 text-white" />
        </div>
        <span className="text-[11px] font-semibold text-ee-navy tracking-wide">
          Knowledge Base &mdash; Indicizzazione
        </span>
      </div>

      {/* ---- Phase 1: Upload zone ---- */}
      <AnimatePresence mode="wait">
        {phase >= 1 && phase < 2 && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={cn(
              "flex flex-col items-center justify-center gap-2",
              "rounded-xl border-2 border-dashed border-apple-gray-200",
              "bg-white py-6"
            )}
          >
            <Upload className="h-5 w-5 text-apple-gray-300" />
            <span className="text-[10px] text-apple-gray-400 font-medium">
              4 documenti caricati
            </span>
            <div className="flex gap-1.5 mt-1">
              {uploadedDocs.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center gap-1 rounded-md bg-apple-gray-50 border border-apple-gray-100 px-1.5 py-0.5"
                >
                  <FileText className="h-2.5 w-2.5 text-apple-gray-400" />
                  <span className="text-[8px] text-apple-gray-500 max-w-[60px] truncate">
                    {doc.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ---- Phase 2: AI reading + entity extraction ---- */}
        {phase >= 2 && phase < 3 && (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-2"
          >
            {/* Mini doc preview */}
            <div className="rounded-xl bg-white border border-apple-gray-100 p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-3.5 w-3.5 text-red-400" />
                <span className="text-[10px] font-semibold text-ee-navy">
                  Relazione_Waterfront.pdf
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-violet-500 animate-pulse" />
                  <span className="text-[9px] text-violet-500 font-medium">
                    Analisi AI
                  </span>
                </div>
              </div>

              {/* Excerpt with highlights */}
              <p className="text-[10px] leading-relaxed">
                {buildHighlightedExcerpt(docExcerpt, revealedEntities)}
              </p>
            </div>

            {/* Entity tags */}
            <div className="flex flex-wrap gap-1.5 min-h-[22px]">
              <AnimatePresence>
                {entities.slice(0, revealedEntities).map((ent) => {
                  const Icon = ent.icon;
                  return (
                    <motion.span
                      key={ent.label}
                      initial={{ opacity: 0, scale: 0.7, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 22,
                      }}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5",
                        "text-[9px] font-medium",
                        ent.bg,
                        ent.color
                      )}
                    >
                      <Icon className="h-2.5 w-2.5" />
                      {ent.label}
                    </motion.span>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ---- Phase 3: Knowledge graph ---- */}
        {phase >= 3 && phase < 4 && (
          <motion.div
            key="graph"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-2"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Share2 className="h-3 w-3 text-ee-navy" />
              <span className="text-[10px] font-semibold text-ee-navy">
                Knowledge Graph
              </span>
            </div>

            {/* SVG graph */}
            <div className="relative rounded-xl bg-white border border-apple-gray-100 shadow-sm overflow-hidden h-[140px]">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Connection lines */}
                <AnimatePresence>
                  {graphLinks.slice(0, revealedLinks).map((link) => {
                    const fromNode = graphNodes.find(
                      (n) => n.id === link.from
                    )!;
                    const toNode = graphNodes.find((n) => n.id === link.to)!;
                    const highSim = link.similarity >= 80;
                    return (
                      <motion.line
                        key={`${link.from}-${link.to}`}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={highSim ? "#1B2A4A" : "#D2D2D7"}
                        strokeWidth={highSim ? 0.8 : 0.5}
                        strokeDasharray={highSim ? "none" : "2 1.5"}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    );
                  })}
                </AnimatePresence>

                {/* Similarity labels on links */}
                {graphLinks.slice(0, revealedLinks).map((link) => {
                  const fromNode = graphNodes.find(
                    (n) => n.id === link.from
                  )!;
                  const toNode = graphNodes.find((n) => n.id === link.to)!;
                  const mx = (fromNode.x + toNode.x) / 2;
                  const my = (fromNode.y + toNode.y) / 2;
                  return (
                    <motion.g
                      key={`label-${link.from}-${link.to}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <rect
                        x={mx - 6}
                        y={my - 3}
                        width={12}
                        height={6}
                        rx={2}
                        fill="white"
                        stroke="#E8E8ED"
                        strokeWidth={0.3}
                      />
                      <text
                        x={mx}
                        y={my + 1.5}
                        textAnchor="middle"
                        fontSize={3.2}
                        fontWeight={600}
                        fill={link.similarity >= 80 ? "#1B2A4A" : "#86868B"}
                      >
                        {link.similarity}%
                      </text>
                    </motion.g>
                  );
                })}

                {/* Nodes */}
                {graphNodes.slice(0, nodesVisible).map((node) => (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 22,
                    }}
                    style={{ originX: `${node.x}%`, originY: `${node.y}%` }}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={4.5}
                      fill="#1B2A4A"
                      opacity={0.9}
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={2.5}
                      fill="white"
                      opacity={0.3}
                    />
                    <text
                      x={node.x}
                      y={node.y + 8.5}
                      textAnchor="middle"
                      fontSize={3}
                      fill="#6E6E73"
                      fontWeight={500}
                    >
                      {node.label}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </div>
          </motion.div>
        )}

        {/* ---- Phase 4: Summary ---- */}
        {phase >= 4 && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-2.5"
          >
            {/* Summary card */}
            <div
              className={cn(
                "flex items-center justify-center gap-3 rounded-xl",
                "bg-white border border-apple-gray-100 px-3 py-3 shadow-sm"
              )}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-ts-green/10">
                <Check className="h-3 w-3 text-ts-green" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { value: "150", label: "documenti" },
                  { value: "847", label: "entit\u00e0" },
                  { value: "23", label: "collegamenti" },
                ].map((stat, i) => (
                  <span key={stat.label} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <span className="text-apple-gray-200">&middot;</span>
                    )}
                    <span className="text-[10px] text-apple-gray-400 font-medium">
                      <span className="text-ee-navy font-semibold">
                        {stat.value}
                      </span>{" "}
                      {stat.label}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Status badge */}
            <div className="flex justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
                  "bg-ts-green/8 border border-ts-green/20 text-[10px] font-semibold text-ts-green"
                )}
              >
                <Sparkles className="h-3 w-3" />
                Knowledge Base Pronto
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
