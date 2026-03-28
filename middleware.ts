import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  type AppLocale,
  isAppLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
} from "@/i18n/config";

function getPreferredLocale(request: NextRequest): AppLocale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isAppLocale(fromCookie ?? "")) {
    return fromCookie as AppLocale;
  }

  const accept = request.headers.get("accept-language") ?? "";
  const primary = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  if (primary.startsWith("th")) {
    return "th";
  }

  return "en";
}

function withLocaleCookie(response: NextResponse, locale: AppLocale) {
  response.cookies.set({
    name: LOCALE_COOKIE,
    value: locale,
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Legacy: /en → unprefixed English URLs
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const stripped = pathname === "/en" ? "/" : pathname.slice(3) || "/";
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    return withLocaleCookie(NextResponse.redirect(url), "en");
  }

  // Public Thai URLs (/th, /th/...)
  if (pathname === "/th" || pathname.startsWith("/th/")) {
    return NextResponse.next();
  }

  const preferred = getPreferredLocale(request);

  if (preferred === "th") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/th" : `/th${pathname}`;
    return withLocaleCookie(NextResponse.redirect(url), "th");
  }

  const internal = request.nextUrl.clone();
  internal.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return withLocaleCookie(NextResponse.rewrite(internal), "en");
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
