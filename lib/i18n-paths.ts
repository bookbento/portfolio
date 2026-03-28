import { type AppLocale, DEFAULT_LOCALE } from "@/i18n/config";

/** Infer active locale from the browser pathname. */
export function localeFromPathname(pathname: string): AppLocale {
  if (pathname === "/th" || pathname.startsWith("/th/")) return "th";
  return "en";
}

/**
 * Public URL path for a route segment (no internal /en prefix).
 * @param path use "/" for home, "/about" for about, etc.
 */
export function localeHref(locale: AppLocale, path: string): string {
  const normalized =
    path === "" || path === "/"
      ? ""
      : path.startsWith("/")
        ? path
        : `/${path}`;

  if (locale === DEFAULT_LOCALE) {
    return normalized === "" ? "/" : normalized;
  }
  return normalized === "" ? "/th" : `/th${normalized}`;
}

/** Strip /th prefix from pathname as shown in the browser. */
export function stripLocaleFromPathname(pathname: string): string {
  if (pathname === "/th") return "/";
  if (pathname.startsWith("/th/")) {
    const rest = pathname.slice("/th".length);
    return rest && rest !== "/" ? (rest.startsWith("/") ? rest : `/${rest}`) : "/";
  }
  return pathname === "" ? "/" : pathname;
}

