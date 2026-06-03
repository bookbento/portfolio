import type { Metadata } from "next";
import AboutView from "./about-view";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { pageBreadcrumbSchema } from "@/lib/structured-data";
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const L: AppLocale = isAppLocale(locale) ? locale : "en";
  const messages = await getMessages(L);
  const breadcrumb = pageBreadcrumbSchema({
    locale: L,
    pathname: "/about",
    homeLabel: messages.nav.home,
    pageLabel: messages.nav.about,
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <AboutView />
    </>
  );
}
