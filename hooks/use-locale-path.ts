"use client";

import { useI18n } from "@/components/providers/i18n-provider";
import { localeHref } from "@/lib/i18n-paths";

export function useLocalePath() {
  const { locale } = useI18n();
  return {
    locale,
    /** @param path "/" or "/about", "/projects", etc. */
    path: (path: string) => localeHref(locale, path),
  };
}
