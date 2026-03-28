"use client";

import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  type AppLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
} from "@/i18n/config";
import {
  localeFromPathname,
  localeHref,
  stripLocaleFromPathname,
} from "@/lib/i18n-paths";

export function LangSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = localeFromPathname(pathname);
  const target: AppLocale = current === "en" ? "th" : "en";

  const switchLanguage = () => {
    const stripped = stripLocaleFromPathname(pathname);
    const publicPath = stripped === "/" ? "/" : stripped.startsWith("/") ? stripped : `/${stripped}`;
    const nextPath = localeHref(target, publicPath);

    document.cookie = `${LOCALE_COOKIE}=${target};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};SameSite=Lax`;
    router.push(nextPath);
    router.refresh();
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="rounded-full w-9 h-9"
      onClick={switchLanguage}
      aria-label={current === "en" ? "Switch to Thai" : "Switch to English"}
    >
      <Globe className="h-[1.15rem] w-[1.15rem]" aria-hidden />
    </Button>
  );
}
