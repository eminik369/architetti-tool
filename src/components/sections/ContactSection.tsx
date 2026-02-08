"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Mail, Building2, Cpu } from "lucide-react";

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-bold tracking-tight text-apple-gray-800 mb-16"
        >
          {t("title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-10 rounded-3xl border border-apple-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-ee-navy/5 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-ee-navy" />
              </div>
              <Image
                src="/logos/ee-partners-horizontal.svg"
                alt="ee partners"
                width={160}
                height={44}
                className="h-12 w-auto"
              />
            </div>
            <h3 className="text-xl font-bold text-apple-gray-800">
              {t("eeTitle")}
            </h3>
            <p className="text-apple-gray-400 mt-2 text-lg">{t("eeDesc")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 rounded-3xl border border-apple-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-ts-green/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-ts-green" />
              </div>
              <Image
                src="/logos/tstudio.png"
                alt="TStudio"
                width={120}
                height={44}
                className="h-12 w-auto"
              />
            </div>
            <h3 className="text-xl font-bold text-apple-gray-800">
              {t("tsTitle")}
            </h3>
            <p className="text-apple-gray-400 mt-2 text-lg">{t("tsDesc")}</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-base text-apple-gray-500">
                <MapPin className="w-5 h-5 text-apple-gray-300" />
                {t("tsAddress")}
              </div>
              <div className="flex items-center gap-3 text-base text-apple-gray-500">
                <Mail className="w-5 h-5 text-apple-gray-300" />
                {t("tsEmail")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
