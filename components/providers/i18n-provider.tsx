"use client";

import * as React from "react";
import type { AppLocale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";
import en from "@/i18n/locales/en.json";
import { getMessage, interpolate } from "@/i18n/translate";

export type TranslateFn = (
  key: string,
  vars?: Record<string, string | number>
) => string;

type I18nContextValue = {
  locale: AppLocale;
  messages: Messages;
  t: TranslateFn;
};

const I18nContext = React.createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: AppLocale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const t = React.useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let raw = getMessage(messages, key);
      if (typeof raw !== "string" || raw.length === 0) {
        const fb = getMessage(en, key);
        raw = typeof fb === "string" ? fb : undefined;
      }
      if (typeof raw !== "string") return key;
      return interpolate(raw, vars);
    },
    [messages]
  );

  const value = React.useMemo(
    () => ({ locale, messages, t }),
    [locale, messages, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
