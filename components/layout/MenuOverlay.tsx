"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";
import { NAV_LINKS } from "./nav-links";

const ITEM_STAGGER_MS = 60;
const ITEM_LEAD_IN_MS = 150;

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/bookbento", external: true },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    external: true,
  },
  { label: "Email", href: "mailto:mrsarunpatbook3@gmail.com", external: false },
];

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const pathname = usePathname();
  const { t, locale } = useTranslation();
  const { path } = useLocalePath();
  const closeRef = useRef<HTMLButtonElement>(null);

  const isThai = locale === "th";
  const uiLabel = isThai
    ? "text-[13px] tracking-[0.08em]"
    : "text-xs uppercase tracking-[0.18em]";
  const eyebrow = `text-[11px] uppercase ${
    isThai ? "tracking-[0.08em]" : "tracking-[0.35em]"
  }`;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("nav.menu")}
      inert={!open}
      // `.grain` forces position:relative, so it lives on an inner wrapper —
      // putting it here would override `fixed` and drop the overlay into flow.
      className={`fixed inset-0 z-[150] overflow-y-auto bg-foreground text-background transition-opacity duration-[var(--duration-ui)] ease-[var(--ease-inout-luxe)] motion-reduce:transition-none ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="grain min-h-full">
        <div className="flex h-[68px] items-center justify-between px-6 md:h-[78px] md:px-10">
          <span className={`${uiLabel} text-background/55`}>
            {t("nav.index")}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={`btn-line cursor-pointer ${uiLabel}`}
          >
            {t("nav.close")} ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 px-6 pb-16 pt-10 md:grid-cols-12 md:px-10 md:pt-16">
          <nav aria-label={t("nav.menu")} className="md:col-span-7">
            <ul className="space-y-3 md:space-y-5">
              {NAV_LINKS.map((link, i) => {
                const href = path(link.href);
                const isActive = pathname === href;
                return (
                  <li
                    key={link.key}
                    className={`transition-[transform,opacity] duration-[var(--duration-ui)] ease-[var(--ease-luxe)] motion-reduce:transition-none ${
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: open
                        ? `${i * ITEM_STAGGER_MS + ITEM_LEAD_IN_MS}ms`
                        : "0ms",
                    }}
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex items-baseline gap-4 md:gap-6 ${
                        isThai
                          ? "text-[11vw] font-light leading-[1.15] md:text-[5.5vw]"
                          : "font-display text-[13vw] leading-none md:text-[6.5vw]"
                      } ${
                        isActive
                          ? "text-background"
                          : "text-background/70 transition-colors duration-[var(--duration-ui)] hover:text-background"
                      }`}
                    >
                      <span className="text-xs font-normal tracking-[0.18em] text-background/45 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {isActive && !isThai ? (
                        <em className="italic">{t(link.key)}</em>
                      ) : (
                        <span>{t(link.key)}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className={`md:col-span-5 md:pt-8 transition-opacity duration-[var(--duration-fade)] ease-[var(--ease-luxe)] motion-reduce:transition-none ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: open ? "500ms" : "0ms" }}
          >
            <p className={`${eyebrow} mb-6 text-background/55`}>
              — {t("hero.name")}
            </p>
            <ul className="space-y-3 text-base font-light text-background/85">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="btn-line"
                    {...(social.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className={`${uiLabel} mt-12 text-background/55`}>
              {t("hero.location")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
