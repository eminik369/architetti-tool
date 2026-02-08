"use client";

import Image from "next/image";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-apple-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Image
            src="/logos/ee-partners-horizontal.svg"
            alt="ee partners"
            width={180}
            height={50}
            className="h-10 w-auto"
            priority
          />
          <div className="hidden sm:block h-8 w-px bg-apple-gray-200" />
          <Image
            src="/logos/tstudio.png"
            alt="TStudio"
            width={140}
            height={50}
            className="hidden sm:block h-10 w-auto"
            priority
          />
        </div>
        <LanguageToggle />
      </div>
    </header>
  );
}
