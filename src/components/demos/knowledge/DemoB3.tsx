"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Check, FileText, Loader2 } from "lucide-react";

interface ProjectResult {
  name: string;
  match: number;
  description: string;
  year: string;
}

const projects: ProjectResult[] = [
  {
    name: "Waterfront di Messina",
    match: 96,
    description: "Riqualificazione urbana",
    year: "2023",
  },
  {
    name: "Molo San Cataldo",
    match: 88,
    description: "Infrastruttura portuale",
    year: "2020",
  },
  {
    name: "Scuola Mazzacurati",
    match: 45,
    description: "Edilizia scolastica",
    year: "2015",
  },
];

const searchText = "Nuovo bando: Waterfront urbano";

export default function DemoB3() {
  const [typedLength, setTypedLength] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleResults, setVisibleResults] = useState(0);
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [packStatus, setPackStatus] = useState<"idle" | "generating" | "done">(
    "idle"
  );

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Type out the search query, starting after 0.5s delay
    const charDelay = 45;
    for (let i = 0; i <= searchText.length; i++) {
      timers.push(
        setTimeout(() => {
          setTypedLength(i);
        }, 500 + i * charDelay)
      );
    }

    const afterTyping = 500 + searchText.length * charDelay + 200;

    // Phase 2: Show searching state
    timers.push(setTimeout(() => setIsSearching(true), afterTyping));

    // Phase 3: Show results one by one
    const resultsStart = afterTyping + 600;
    timers.push(setTimeout(() => setIsSearching(false), resultsStart));

    projects.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleResults((prev) => prev + 1);
        }, resultsStart + i * 350)
      );
    });

    // Phase 4: Select the first two projects
    const selectStart = resultsStart + projects.length * 350 + 500;
    timers.push(
      setTimeout(() => setSelectedProjects([0]), selectStart)
    );
    timers.push(
      setTimeout(() => setSelectedProjects([0, 1]), selectStart + 400)
    );

    // Phase 5: Generating pack
    timers.push(
      setTimeout(() => setPackStatus("generating"), selectStart + 900)
    );
    timers.push(
      setTimeout(() => setPackStatus("done"), selectStart + 2000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={cn(
        "min-h-[280px] w-full rounded-2xl border border-apple-gray-100",
        "bg-apple-gray-50 p-4 font-sans overflow-hidden flex flex-col"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-ee-navy">
          <FileText className="h-3 w-3 text-white" />
        </div>
        <span className="text-xs font-semibold text-ee-navy tracking-wide">
          Precedent Pack
        </span>
      </div>

      {/* Search input */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl bg-white border px-3 py-2 mb-3",
          "transition-colors duration-200",
          isSearching ? "border-ee-navy/30" : "border-apple-gray-100"
        )}
      >
        {isSearching ? (
          <Loader2 className="h-3.5 w-3.5 text-ee-navy animate-spin flex-shrink-0" />
        ) : (
          <Search className="h-3.5 w-3.5 text-apple-gray-400 flex-shrink-0" />
        )}
        <span className="text-[11px] text-ee-navy font-medium">
          {searchText.slice(0, typedLength)}
          {typedLength < searchText.length && (
            <motion.span
              className="inline-block w-[1px] h-3 bg-ee-navy ml-[1px] align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </span>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-1.5 flex-1">
        <AnimatePresence>
          {projects.slice(0, visibleResults).map((project, i) => {
            const isSelected = selectedProjects.includes(i);
            const isDimmed = project.match < 50;

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -12, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl bg-white px-3 py-2",
                  "border transition-all duration-300",
                  isSelected
                    ? "border-ee-navy/30 shadow-sm"
                    : "border-apple-gray-100",
                  isDimmed && "opacity-50"
                )}
              >
                {/* Selection indicator */}
                <div
                  className={cn(
                    "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full",
                    "border transition-all duration-300",
                    isSelected
                      ? "border-ee-navy bg-ee-navy"
                      : "border-apple-gray-200 bg-white"
                  )}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                        }}
                      >
                        <Check className="h-2.5 w-2.5 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Project info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-ee-navy truncate">
                    {project.name}
                  </p>
                  <p className="text-[9px] text-apple-gray-400">
                    {project.description}, {project.year}
                  </p>
                </div>

                {/* Match badge */}
                <span
                  className={cn(
                    "flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold",
                    project.match >= 80
                      ? "bg-ts-green/10 text-ts-green"
                      : "bg-apple-gray-100 text-apple-gray-400"
                  )}
                >
                  {project.match}%
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer status */}
      <AnimatePresence mode="wait">
        {packStatus !== "idle" && (
          <motion.div
            key={packStatus}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "mt-2.5 flex items-center justify-center gap-2 rounded-xl",
              "border px-3 py-1.5",
              packStatus === "done"
                ? "bg-ts-green/5 border-ts-green/20"
                : "bg-white border-apple-gray-100"
            )}
          >
            {packStatus === "generating" && (
              <>
                <Loader2 className="h-3 w-3 text-ee-navy animate-spin" />
                <span className="text-[10px] text-apple-gray-500 font-medium">
                  <span className="text-ee-navy font-semibold">2</span> progetti
                  selezionati &middot; Generazione pack...
                </span>
              </>
            )}
            {packStatus === "done" && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 18,
                  }}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-ts-green"
                >
                  <Check className="h-2.5 w-2.5 text-white" />
                </motion.div>
                <span className="text-[10px] text-ts-green font-semibold">
                  Pack pronto!
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected count before generation */}
      <AnimatePresence>
        {selectedProjects.length > 0 && packStatus === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2.5 flex items-center justify-center rounded-xl bg-white border border-apple-gray-100 px-3 py-1.5"
          >
            <span className="text-[10px] text-apple-gray-400 font-medium">
              <span className="text-ee-navy font-semibold">
                {selectedProjects.length}
              </span>{" "}
              progett{selectedProjects.length === 1 ? "o" : "i"} selezionat
              {selectedProjects.length === 1 ? "o" : "i"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
