"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bot, Link2, MessageSquare, User } from "lucide-react";

export default function DemoB2() {
  const [showUserMsg, setShowUserMsg] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showCitation, setShowCitation] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1: User message appears
    timers.push(setTimeout(() => setShowUserMsg(true), 500));

    // Step 2: Typing indicator appears
    timers.push(setTimeout(() => setShowTyping(true), 1600));

    // Step 3: Response replaces typing indicator
    timers.push(
      setTimeout(() => {
        setShowTyping(false);
        setShowResponse(true);
      }, 3000)
    );

    // Step 4: Citation appears
    timers.push(setTimeout(() => setShowCitation(true), 3800));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={cn(
        "min-h-[280px] w-full rounded-2xl border border-apple-gray-100",
        "bg-apple-gray-50 p-4 font-sans overflow-hidden flex flex-col"
      )}
    >
      {/* Chat header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-ee-navy">
            <Bot className="h-3 w-3 text-white" />
          </div>
          <span className="text-xs font-semibold text-ee-navy tracking-wide">
            KB AI
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-ts-green" />
          <span className="text-[9px] text-apple-gray-400 font-medium">
            Online
          </span>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col gap-2.5 rounded-xl bg-white border border-apple-gray-100 p-3 overflow-hidden">
        {/* User message */}
        <AnimatePresence>
          {showUserMsg && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex justify-end"
            >
              <div className="flex items-end gap-1.5 max-w-[85%]">
                <div
                  className={cn(
                    "rounded-2xl rounded-br-md px-3 py-2",
                    "bg-ee-navy/[0.06] text-ee-navy"
                  )}
                >
                  <p className="text-[11px] leading-relaxed font-medium">
                    Qual &egrave; il cliente del Waterfront di Messina?
                  </p>
                </div>
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-ee-navy/10">
                  <User className="h-2.5 w-2.5 text-ee-navy" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {showTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex justify-start"
            >
              <div className="flex items-end gap-1.5">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-ts-green/10">
                  <Bot className="h-2.5 w-2.5 text-ts-green" />
                </div>
                <div className="rounded-2xl rounded-bl-md bg-apple-gray-50 px-3.5 py-2.5">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-apple-gray-300"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: dot * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Response */}
        <AnimatePresence>
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex justify-start"
            >
              <div className="flex items-end gap-1.5 max-w-[90%]">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-ts-green/10">
                  <Bot className="h-2.5 w-2.5 text-ts-green" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="rounded-2xl rounded-bl-md bg-apple-gray-50 px-3 py-2">
                    <p className="text-[11px] leading-relaxed text-apple-gray-700">
                      Il committente &egrave; l&apos;
                      <span className="font-semibold text-ee-navy">
                        Autorit&agrave; di Sistema Portuale dello Stretto
                      </span>
                      .
                    </p>
                  </div>

                  {/* Citation */}
                  <AnimatePresence>
                    {showCitation && (
                      <motion.div
                        initial={{ opacity: 0, x: -8, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 22,
                        }}
                      >
                        <div
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full",
                            "bg-ee-navy/[0.05] border border-ee-navy/10",
                            "px-2.5 py-1 cursor-pointer",
                            "hover:bg-ee-navy/[0.08] transition-colors"
                          )}
                        >
                          <Link2 className="h-2.5 w-2.5 text-ee-navy/50" />
                          <span className="text-[8px] font-medium text-ee-navy/70 tracking-wide">
                            CITE: TS-P-0001 | Scheda Waterfront
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input hint */}
      <div className="mt-2 flex items-center gap-2 rounded-xl bg-white border border-apple-gray-100 px-3 py-1.5">
        <MessageSquare className="h-3 w-3 text-apple-gray-300" />
        <span className="text-[10px] text-apple-gray-300">
          Chiedi alla knowledge base...
        </span>
      </div>
    </div>
  );
}
