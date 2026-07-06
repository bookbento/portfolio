"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";

const WORD_STAGGER_MS = 120;
const WORD_LEAD_IN_MS = 200;

export default function Hero() {
  const { t, locale } = useTranslation();
  const { path } = useLocalePath();
  useReveal();

  const isThai = locale === "th";
  const nameWords = t("hero.name").split(" ");
  // Wide letter-spacing breaks Thai combining marks — keep it for Latin only.
  const eyebrow = `text-[11px] uppercase ${isThai ? "tracking-[0.08em]" : "tracking-[0.35em]"} text-muted-foreground`;
  const ctaLabel = isThai
    ? "text-sm tracking-[0.08em]"
    : "text-xs uppercase tracking-[0.18em]";

  return (
    <section className="grain relative mx-auto flex max-w-[1600px] flex-col px-6 md:px-10 lg:px-16">
      <div className="reveal flex items-baseline justify-between gap-4 border-b border-border pb-5">
        <span className={eyebrow}>— {t("hero.badge")}</span>
        <span className={`${eyebrow} hidden sm:block`}>{t("hero.location")}</span>
      </div>

      <div className="reveal-fade relative mt-6 aspect-[16/9] overflow-hidden md:aspect-[21/9]">
        <Image
          src="/assets/sarunpat.png"
          alt={t("hero.bannerAlt")}
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="ken-burns object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30" />
      </div>

      <div className="flex flex-1 flex-col justify-center py-14 md:py-20">
        <h1
          className={`hero-mask text-[14vw] tracking-tight sm:text-[11vw] lg:text-[9.5vw] ${
            isThai
              ? "font-light leading-[1.12]"
              : "font-display font-medium leading-[0.95]"
          }`}
        >
          {nameWords.map((word, i) => (
            <span key={i} className="word mr-[0.22em] last:mr-0">
              <span
                style={{
                  transitionDelay: `${i * WORD_STAGGER_MS + WORD_LEAD_IN_MS}ms`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="reveal font-display mt-4 text-2xl italic tracking-tight text-foreground md:text-4xl"
          style={{ transitionDelay: "240ms" }}
        >
          {t("hero.role")}
        </p>

        <p
          className="reveal mt-6 max-w-xl text-lg font-light text-muted-foreground"
          style={{ transitionDelay: "320ms" }}
        >
          {t("hero.description")}
        </p>

        <div
          className="reveal mt-10 flex flex-wrap items-center gap-4"
          style={{ transitionDelay: "400ms" }}
        >
          <Link
            href={path("/projects")}
            className={`inline-flex items-center gap-3 bg-foreground px-8 py-4 text-background transition-opacity duration-700 hover:opacity-80 ${ctaLabel}`}
          >
            {t("hero.viewProjects")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={path("/contact")}
            className={`inline-flex items-center gap-3 border border-foreground/25 px-8 py-4 transition-colors duration-700 hover:border-foreground ${ctaLabel}`}
          >
            {t("hero.contactMe")}
          </Link>
        </div>

        <p
          className="reveal mt-8 flex flex-wrap items-center gap-2 text-sm font-light text-muted-foreground"
          style={{ transitionDelay: "480ms" }}
        >
          {t("hero.aiTeamLabel")} ·
          <Link
            href={path("/ai-team")}
            className="btn-line inline-flex items-center gap-1 text-foreground"
          >
            {t("hero.aiTeamCta")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
