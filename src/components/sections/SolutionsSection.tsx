"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch, BookOpen, LayoutDashboard, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SolutionDetail from "./SolutionDetail";

const solutions = [
  {
    id: "a",
    icon: FileSearch,
    color: "text-blue-600",
    gradient: "from-blue-500/10 to-blue-600/5",
    borderHover: "hover:border-blue-200",
    iconBg: "bg-blue-50",
  },
  {
    id: "b",
    icon: BookOpen,
    color: "text-emerald-600",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    borderHover: "hover:border-emerald-200",
    iconBg: "bg-emerald-50",
  },
  {
    id: "c",
    icon: LayoutDashboard,
    color: "text-violet-600",
    gradient: "from-violet-500/10 to-violet-600/5",
    borderHover: "hover:border-violet-200",
    iconBg: "bg-violet-50",
  },
];

export default function SolutionsSection() {
  const t = useTranslations("solutions");
  const [activeSolution, setActiveSolution] = useState<string | null>(null);

  return (
    <>
      <section id="solutions" className="py-32 px-6 gradient-value scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-8 mb-10">
              <Image
                src="/logos/ee-partners.svg"
                alt="ee partners"
                width={180}
                height={90}
                className="h-24 w-auto"
              />
              <div className="h-16 w-px bg-apple-gray-200" />
              <Image
                src="/logos/tstudio.png"
                alt="TStudio"
                width={140}
                height={56}
                className="h-14 w-auto"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-apple-gray-100 shadow-sm mb-6">
              <Sparkles className="w-3 h-3 text-ts-green" />
              <p className="text-xs font-semibold tracking-widest text-apple-gray-500 uppercase">
                {t("badge")}
              </p>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-apple-gray-800">
              {t("title")}{" "}
              <span className="text-gradient-navy">{t("titleAccent")}</span>
            </h2>
            <p className="text-xl text-apple-gray-400 mt-6 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              const stats = [
                { value: t(`${sol.id}.stat1value`), label: t(`${sol.id}.stat1label`) },
                { value: t(`${sol.id}.stat2value`), label: t(`${sol.id}.stat2label`) },
                { value: t(`${sol.id}.stat3value`), label: t(`${sol.id}.stat3label`) },
              ];

              return (
                <motion.button
                  key={sol.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  onClick={() => setActiveSolution(sol.id)}
                  className={cn(
                    "group relative text-left p-8 sm:p-10 rounded-3xl border border-apple-gray-100 bg-white",
                    "hover:shadow-xl hover:-translate-y-2 transition-all duration-500",
                    sol.borderHover
                  )}
                >
                  {/* Gradient overlay on hover */}
                  <div className={cn(
                    "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    sol.gradient
                  )} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", sol.iconBg)}>
                        <Icon className={cn("w-7 h-7", sol.color)} />
                      </div>
                      <ArrowRight className="w-5 h-5 text-apple-gray-300 group-hover:text-apple-gray-600 group-hover:translate-x-2 transition-all duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-apple-gray-800 mb-2">
                      {t(`${sol.id}.title`)}
                    </h3>
                    <p className="text-sm text-apple-gray-400 mb-4">
                      {t(`${sol.id}.subtitle`)}
                    </p>
                    <p className="text-sm text-apple-gray-500 italic mb-10 leading-relaxed">
                      {t(`${sol.id}.description`)}
                    </p>

                    {/* Stats - bigger and with gradient dividers */}
                    <div className="flex gap-6 pt-6 border-t border-apple-gray-100">
                      {stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-2xl font-bold text-gradient-navy">
                            {stat.value}
                          </div>
                          <div className="text-[9px] font-semibold tracking-wider text-apple-gray-300 uppercase mt-1">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeSolution && (
          <SolutionDetail
            solutionId={activeSolution}
            onClose={() => setActiveSolution(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
