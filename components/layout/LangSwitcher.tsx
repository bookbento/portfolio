"use client";

import { usePathname } from "next/navigation";
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

interface LangSwitcherProps {
  className?: string;
}

export function LangSwitcher({ className = "" }: LangSwitcherProps) {
  const pathname = usePathname();
  const current = localeFromPathname(pathname);
  const target: AppLocale = current === "en" ? "th" : "en";

  const switchLanguage = () => {
    const stripped = stripLocaleFromPathname(pathname);
    const publicPath = stripped === "/" ? "/" : stripped.startsWith("/") ? stripped : `/${stripped}`;
    const nextPath = localeHref(target, publicPath);

    document.cookie = `${LOCALE_COOKIE}=${target};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};SameSite=Lax`;
    // Changing the [locale] param remounts the whole segment anyway, and a
    // client-side remount recreates next-themes' inline <script> (which React
    // never executes on the client — dev warning). A full navigation runs the
    // theme script natively on the fresh document instead.
    window.location.assign(nextPath);
  };

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className={`btn-line cursor-pointer uppercase ${className}`}
      aria-label={current === "en" ? "Switch to Thai" : "Switch to English"}
    >
      {target}
    </button>
  );
}
