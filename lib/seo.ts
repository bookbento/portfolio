import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

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
  };
}
