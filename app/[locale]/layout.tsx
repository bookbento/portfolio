import { Kanit } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Sarunpat | Full-Stack Dev",
  description:
    "Portfolio of an experienced full-stack developer specializing in Next.js, React, and TypeScript.",
  openGraph: {
    type: "website",
    url: "https://yourdomain.com",
    title: "Sarunpat | Full-Stack Dev",
    description: "Portfolio of an experienced full-stack developer...",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${kanit.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar locale={locale} />
          <main className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
