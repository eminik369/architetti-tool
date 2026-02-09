"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, Play } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  const t = useTranslations("hero");
  const td = useTranslations("demo");
  const locale = useLocale();

  const stats = [
    { value: t("stat1value"), label: t("stat1label") },
    { value: t("stat2value"), label: t("stat2label") },
    { value: t("stat3value"), label: t("stat3label") },
    { value: t("stat4value"), label: t("stat4label") },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-24 px-6 gradient-hero relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-ee-navy/[0.02] blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-ts-green/[0.03] blur-3xl" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Both logos side by side */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center justify-center gap-8 mb-12"
        >
          <Image
            src="/logos/ee-partners.svg"
            alt="ee partners"
            width={320}
            height={160}
            className="h-36 sm:h-44 w-auto"
            priority
          />
          <div className="h-24 w-px bg-apple-gray-200" />
          <Image
            src="/logos/tstudio.png"
            alt="TStudio"
            width={240}
            height={100}
            className="h-20 sm:h-24 w-auto"
            priority
          />
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-apple-gray-100 shadow-sm mb-10"
        >
          <Sparkles className="w-3.5 h-3.5 text-ts-green" />
          <span className="text-xs font-semibold tracking-widest text-apple-gray-600 uppercase">
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-apple-gray-800 mb-8 text-balance"
        >
          {t("headline")}
          <br />
          <span className="text-gradient-navy">{t("headlineAccent")}</span>
        </motion.h1>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-xl sm:text-2xl text-apple-gray-400 max-w-2xl mx-auto mb-3"
        >
          {t("subtitle")}
        </motion.p>
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-xl sm:text-2xl text-apple-gray-700 font-semibold max-w-2xl mx-auto mb-16"
        >
          {t("subtitleBold")}
        </motion.p>

        {/* Stats - much bigger and bolder */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mb-16 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-apple-gray-100/50">
              <div className="text-4xl sm:text-5xl font-bold text-gradient-navy leading-none">
                {stat.value}
              </div>
              <div className="text-[10px] font-semibold tracking-widest text-apple-gray-400 mt-2 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#solutions"
            className="inline-flex items-center gap-3 px-10 py-5 gradient-navy text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-ee-navy/20 hover:shadow-xl hover:shadow-ee-navy/30 hover:-translate-y-0.5"
          >
            {t("cta")}
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href={`/${locale}/demo`}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-ts-green text-ts-green rounded-full text-base font-semibold hover:bg-ts-green hover:text-white transition-all hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4" />
            {td("heroCtaDemo")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
