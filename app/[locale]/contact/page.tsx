import type { Metadata } from "next";
import ContactView from "./contact-view";
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
    pathname: "/contact",
    title: messages.meta.contact.title,
    description: messages.meta.contact.description,
  });
}

export default function ContactPage() {
  return <ContactView />;
}
