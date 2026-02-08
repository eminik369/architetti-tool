"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function ImpactSection() {
  const t = useTranslations("impact");

  const col1Items = [t("col1item1"), t("col1item2"), t("col1item3"), t("col1item4")];
  const col2Items = [t("col2item1"), t("col2item2"), t("col2item3"), t("col2item4")];

  return (
    <section className="py-32 px-6 gradient-value">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-apple-gray-100 shadow-sm mb-8">
            <Sparkles className="w-3 h-3 text-ts-green" />
            <span className="text-xs font-semibold tracking-widest text-apple-gray-500 uppercase">
              {t("badge")}
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-apple-gray-800">
            {t("title")}{" "}
            <span className="text-gradient-navy">{t("titleAccent")}</span>
          </h2>
          <p className="text-xl text-apple-gray-400 mt-6 max-w-2xl">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="p-10 rounded-3xl bg-white border border-apple-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-ts-green/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-ts-green" />
              </div>
              <h3 className="text-xl font-bold text-ee-navy">
                {t("col1title")}
              </h3>
            </div>
            <ul className="space-y-5">
              {col1Items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ts-green flex-shrink-0 mt-0.5" />
                  <span className="text-apple-gray-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-10 rounded-3xl bg-white border border-apple-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-ee-navy">
                {t("col2title")}
              </h3>
            </div>
            <ul className="space-y-5">
              {col2Items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ts-green flex-shrink-0 mt-0.5" />
                  <span className="text-apple-gray-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ROI Cases - now with gradient background and bigger numbers */}
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((n) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * n, duration: 0.5 }}
              className="p-10 rounded-3xl gradient-navy text-white shadow-lg glow-navy"
            >
              <span className="text-xs font-bold tracking-widest text-white/50 uppercase">
                {t(`case${n}title`)}
              </span>
              <div className="flex items-center gap-6 mt-6 mb-6">
                <div>
                  <div className="text-xs font-bold tracking-widest text-white/50 uppercase">
                    {t(`case${n}invest`)}
                  </div>
                  <div className="text-4xl font-black text-white/90 mt-1">
                    {t(`case${n}investValue`)}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-white/60" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-white/50 uppercase">
                    {t(`case${n}result`)}
                  </div>
                  <div className="text-4xl font-black text-gradient-green mt-1">
                    {t(`case${n}resultValue`)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{t(`case${n}desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
