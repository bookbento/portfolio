"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LOCALES = ["en", "th"] as const;
type AppLocale = (typeof LOCALES)[number];

function isAppLocale(value: string): value is AppLocale {
  return (LOCALES as readonly string[]).includes(value);
}

export function LangSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const safeLocale: AppLocale = isAppLocale(currentLocale) ? currentLocale : "en";
  const nextLocale: AppLocale = safeLocale === "en" ? "th" : "en";

  const switchLanguage = () => {
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];

    if (first && isAppLocale(first)) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    const nextPath = `/${segments.join("/")}`;
    router.push(nextPath);
    router.refresh();
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="rounded-full px-3 text-sm font-medium tabular-nums min-w-[2.75rem] cursor-pointer"
      onClick={switchLanguage}
      aria-label={safeLocale === "en" ? "Switch to Thai" : "Switch to English"}
    >
      {safeLocale === "en" ? "TH" : "EN"}
    </Button>
  );
}
