import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import HomeFeatured from "@/components/sections/HomeFeatured";
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
    pathname: "/",
    title: messages.meta.home.title,
    description: messages.meta.home.description,
  });
}

export default function HomePage() {
  return (
    <div className="space-y-32">
      <Hero />
      <HomeFeatured />
    </div>
  );
}
