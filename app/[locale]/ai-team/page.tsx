import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import AiTeamView from "./ai-team-view";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { pageBreadcrumbSchema } from "@/lib/structured-data";
import { getMessages } from "@/i18n/load-messages";
import { isAppLocale, type AppLocale } from "@/i18n/config";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--at-font-display",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--at-font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--at-font-mono",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const L: AppLocale = isAppLocale(locale) ? locale : "en";
  const messages = await getMessages(L);
  return buildPageMetadata({
    locale: L,
    pathname: "/ai-team",
    title: messages.meta.aiTeam.title,
    description: messages.meta.aiTeam.description,
  });
}

export default async function AiTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const L: AppLocale = isAppLocale(locale) ? locale : "en";
  const messages = await getMessages(L);
  const breadcrumb = pageBreadcrumbSchema({
    locale: L,
    pathname: "/ai-team",
    homeLabel: messages.nav.home,
    pageLabel: messages.nav.aiTeam,
  });

  const fontVars = [
    instrumentSerif.variable,
    hankenGrotesk.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <>
      <JsonLd data={breadcrumb} />
      <AiTeamView fontVars={fontVars} />
    </>
  );
}
