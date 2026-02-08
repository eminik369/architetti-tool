"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, Cpu, Wrench, GraduationCap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const steps = [
  { number: "01", icon: Search, titleKey: "step1title", descKey: "step1desc", color: "text-blue-600", bg: "bg-blue-50" },
  { number: "02", icon: Cpu, titleKey: "step2title", descKey: "step2desc", color: "text-violet-600", bg: "bg-violet-50" },
  { number: "03", icon: Wrench, titleKey: "step3title", descKey: "step3desc", color: "text-emerald-600", bg: "bg-emerald-50" },
  { number: "04", icon: GraduationCap, titleKey: "step4title", descKey: "step4desc", color: "text-amber-600", bg: "bg-amber-50" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function HowWeWork() {
  const t = useTranslations("howWeWork");

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-6 mb-8">
            <Image
              src="/logos/ee-partners-horizontal.svg"
              alt="ee partners"
              width={160}
              height={44}
              className="h-12 w-auto"
            />
            <div className="h-10 w-px bg-apple-gray-200" />
            <Image
              src="/logos/tstudio.png"
              alt="TStudio"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-apple-gray-800">
            {t("title")}{" "}
            <span className="text-gradient-navy">{t("titleAccent")}</span>
          </h2>
          <p className="text-xl text-apple-gray-400 mt-6 max-w-2xl">
            {t("subtitle")}{" "}
            <span className="text-apple-gray-700 font-semibold">{t("subtitleBold")}</span>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={cn(
                  "relative p-10 rounded-3xl border border-apple-gray-100",
                  "bg-white hover:shadow-lg transition-all duration-500 group"
                )}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", step.bg)}>
                    <Icon className={cn("w-7 h-7", step.color)} />
                  </div>
                  <span className="text-6xl font-black text-apple-gray-100 group-hover:text-apple-gray-200 transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-apple-gray-800 mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-apple-gray-500 leading-relaxed">
                  {t(step.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
