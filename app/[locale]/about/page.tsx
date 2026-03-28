import type { Metadata } from "next";
import AboutView from "./about-view";
import { buildPageMetadata } from "@/lib/seo";
import { getMessages } from "@/i18n/load-messages";
import { isAppLocale, type AppLocale } from "@/i18n/config";

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
    pathname: "/about",
    title: messages.meta.about.title,
    description: messages.meta.about.description,
  });
}

export default function AboutPage() {
  return <AboutView />;
}
