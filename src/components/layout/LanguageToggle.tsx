"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "it" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-apple-gray-200 p-0.5">
      <button
        onClick={() => switchLocale("it")}
        className={cn(
          "px-3 py-1 text-xs font-medium rounded-full transition-all",
          locale === "it"
            ? "bg-ee-navy text-white"
            : "text-apple-gray-400 hover:text-apple-gray-600"
        )}
      >
        IT
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "px-3 py-1 text-xs font-medium rounded-full transition-all",
          locale === "en"
            ? "bg-ee-navy text-white"
            : "text-apple-gray-400 hover:text-apple-gray-600"
        )}
      >
        EN
      </button>
    </div>
  );
}
