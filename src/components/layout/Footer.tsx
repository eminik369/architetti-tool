"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-apple-gray-100 gradient-navy">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <Image
              src="/logos/ee-partners-horizontal.svg"
              alt="ee partners"
              width={180}
              height={50}
              className="h-10 w-auto brightness-0 invert opacity-80"
            />
            <div className="h-8 w-px bg-white/20" />
            <Image
              src="/logos/tstudio.png"
              alt="TStudio"
              width={120}
              height={40}
              className="h-10 w-auto brightness-0 invert opacity-80"
            />
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm text-white/60">{t("copyright")}</p>
            <p className="text-sm text-white/40 mt-1">{t("madeFor")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
