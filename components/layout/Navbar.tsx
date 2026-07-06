"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LangSwitcher } from "./LangSwitcher";
import MenuOverlay from "./MenuOverlay";
import { useScrollDir } from "@/hooks/use-scroll-dir";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";

export default function Navbar() {
  const { hidden, scrolled } = useScrollDir();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale } = useTranslation();
  const { path } = useLocalePath();

  const isThai = locale === "th";
  // Wide tracking + uppercase is Latin-only; Thai keeps Kanit tight.
  const uiLabel = isThai
    ? "text-[13px] tracking-[0.08em]"
    : "text-xs uppercase tracking-[0.18em]";

  return (
    <>
      <header
        className={`nav-shell fixed inset-x-0 top-0 z-[100] ${
          hidden && !isMenuOpen ? "nav-hidden" : ""
        } ${
          scrolled
            ? "border-b border-border bg-background/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="relative flex h-[68px] items-center justify-between px-6 md:h-[78px] md:px-10">
          <div className="flex items-center gap-7 md:gap-10">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isMenuOpen}
              className={`btn-line cursor-pointer ${uiLabel}`}
            >
              {t("nav.menu")}
            </button>
            {/* `.btn-line` hardcodes display, so responsive hiding lives on a wrapper */}
            <span className="hidden md:inline-flex">
              <Link href={path("/projects")} className={`btn-line ${uiLabel}`}>
                {t("nav.projects")}
              </Link>
            </span>
            <span className="hidden md:inline-flex">
              <Link href={path("/about")} className={`btn-line ${uiLabel}`}>
                {t("nav.about")}
              </Link>
            </span>
          </div>

          <Link
            href={path("/")}
            className="font-display absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[17px] tracking-[0.22em] md:text-[21px]"
          >
            SARUNPAT
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <span className="hidden md:inline-flex">
              <Link href={path("/contact")} className={`btn-line ${uiLabel}`}>
                {t("nav.contact")}
              </Link>
            </span>
            <LangSwitcher className={uiLabel} />
            <span className="hidden sm:inline-flex">
              <ThemeToggle className={uiLabel} />
            </span>
          </div>
        </div>
      </header>

      <MenuOverlay open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
