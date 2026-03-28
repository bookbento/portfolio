import "server-only";
import type { AppLocale } from "@/i18n/config";
import { DEFAULT_LOCALE } from "@/i18n/config";

import en from "@/i18n/locales/en.json";

export type Messages = typeof en;

const loaders: Record<AppLocale, () => Promise<Messages>> = {
  en: async () => en,
  th: async () => (await import("@/i18n/locales/th.json")).default,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Overlay primary onto fallback so missing or empty Thai strings use English. */
function mergeWithFallback(fallback: unknown, primary: unknown): unknown {
  if (Array.isArray(fallback)) {
    if (Array.isArray(primary) && primary.length > 0) return primary;
    return fallback;
  }

  if (isPlainObject(fallback)) {
    const out: Record<string, unknown> = { ...fallback };
    const p = isPlainObject(primary) ? primary : null;
    for (const key of Object.keys(fallback)) {
      const fVal = fallback[key];
      const pVal = p?.[key];
      out[key] = mergeWithFallback(fVal, pVal);
    }
    if (p) {
      for (const key of Object.keys(p)) {
        if (!(key in out)) {
          out[key] = p[key];
        }
      }
    }
    return out;
  }

  if (typeof primary === "string") {
    return primary.length > 0 ? primary : fallback;
  }
  if (primary !== undefined && primary !== null) return primary;
  return fallback;
}

export async function getMessages(locale: string): Promise<Messages> {
  const key: AppLocale = locale === "th" ? "th" : DEFAULT_LOCALE;
  const primary = await loaders[key]();
  if (key === DEFAULT_LOCALE) return primary;
  return mergeWithFallback(en, primary) as Messages;
}
