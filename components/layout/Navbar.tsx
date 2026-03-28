"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LangSwitcher } from "./LangSwitcher";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { path } = useLocalePath();

  const navLinks = [
    { key: "nav.home" as const, href: path("/") },
    { key: "nav.about" as const, href: path("/about") },
    { key: "nav.projects" as const, href: path("/projects") },
    { key: "nav.experience" as const, href: path("/experience") },
    { key: "nav.contact" as const, href: path("/contact") },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm rounded-2xl px-6 py-3">
        <Link href={path("/")} className="font-bold text-xl tracking-tight">
          <span className="text-primary">{t("common.siteName")}</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
