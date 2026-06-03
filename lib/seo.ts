import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";

/** Public, locale-stripped paths that make up the indexable surface. */
export const PUBLIC_PATHS = [
  "/",
  "/about",
  "/projects",
  "/experience",
  "/ai-team",
  "/contact",
] as const;

/** Canonical site origin (scheme + host, no trailing slash). */
export function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

/** Open Graph locale codes keyed by app locale. */
const OG_LOCALE: Record<AppLocale, string> = {
  en: "en_US",
  th: "th_TH",
};

/**
 * Build absolute URLs for each language version of a page.
 * @param pathname public path without locale: "/" | "/about" | "/projects" | ...
 */
export function getAlternateUrls(pathname: string): { en: string; th: string } {
  const base = siteBase();
  const path =
    pathname === "" || pathname === "/"
      ? ""
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;

  const enUrl = `${base}${path || "/"}`;
  const thUrl = `${base}/th${path}`;
  return { en: enUrl, th: thUrl };
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
}): Metadata {
  const { en, th } = getAlternateUrls(pathname);
  const canonical = locale === "en" ? en : th;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en,
        th,
        "x-default": en,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Sarunpat Sangpak",
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[locale],
      alternateLocale: locale === "en" ? OG_LOCALE.th : OG_LOCALE.en,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
