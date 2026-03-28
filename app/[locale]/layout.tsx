import { Kanit } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { getMessages } from "@/i18n/load-messages";
import { isAppLocale, type AppLocale } from "@/i18n/config";
import "@/app/globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sarunpat Sangpak",
    template: "%s | Sarunpat",
  },
  description:
    "Portfolio of an experienced developer specializing in Next.js, React, and TypeScript.",
  openGraph: {
    type: "website",
    siteName: "Sarunpat Sangpak",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = await params;
  const locale: AppLocale = isAppLocale(paramLocale) ? paramLocale : "en";
  const messages = await getMessages(locale);
  const htmlLang = locale === "th" ? "th" : "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body
        className={`${kanit.variable} font-sans antialiased bg-background text-foreground`}
      >
        <I18nProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="min-h-screen pt-24 pb-12 mx-auto">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
