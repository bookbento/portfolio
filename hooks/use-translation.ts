"use client";

import { useI18n } from "@/components/providers/i18n-provider";

export function useTranslation() {
  const { t, locale, messages } = useI18n();
  return { t, locale, messages };
}
