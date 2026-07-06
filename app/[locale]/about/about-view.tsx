"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/constants/data";
import { useReveal } from "@/hooks/use-reveal";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";

const WORD_STAGGER_MS = 120;
const WORD_LEAD_IN_MS = 200;
const ITEM_STAGGER_MS = 60;

export default function AboutView() {
  const { t, locale, messages } = useTranslation();
  const { path } = useLocalePath();
  useReveal();

  const isThai = locale === "th";
  const skills = messages.about.skills;
  const headlineWords = t("about.headline").split(" ");

  const eyebrow = `text-[11px] uppercase ${isThai ? "tracking-[0.08em]" : "tracking-[0.35em]"} text-muted-foreground`;
  const uiLabel = isThai
    ? "text-sm tracking-[0.08em]"
    : "text-xs uppercase tracking-[0.18em]";

  const facts = [
    { label: t("about.factLocation"), value: t("hero.location") },
    { label: t("about.factFocus"), value: t("hero.role") },
    { label: t("about.factStatus"), value: t("hero.badge") },
  ];

  return (
    <div className="grain mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
      {/* Headline */}
      <section>
        <div className="reveal flex items-baseline justify-between gap-4 border-b border-border pb-5">
          <span className={eyebrow}>— {t("nav.about")}</span>
          <span className={`${eyebrow} hidden sm:block`}>
            {t("hero.location")}
          </span>
        </div>

        <h1
          className={`hero-mask mt-10 tracking-tight ${
            isThai
              ? // Thai has no word spaces to wrap on — size to fit one line at every width.
                "whitespace-nowrap text-[min(8vw,124px)] font-light leading-[1.25]"
              : "font-display text-[12.5vw] font-medium leading-[0.95] sm:text-[10vw] lg:text-[7.5vw]"
          }`}
        >
          {headlineWords.map((word, i) => (
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
      </section>

      {/* Portrait + story */}
      <section className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-10">
        <div className="reveal-fade md:col-span-5" style={{ transitionDelay: "150ms" }}>
          <div className="img-zoom relative aspect-[3/4]">
            <Image
              src="/assets/about.jpeg"
              alt={t("hero.name")}
              fill
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className={eyebrow}>{t("hero.name")}</span>
            <span className="font-display text-sm tabular-nums text-muted-foreground">
              N° 01
            </span>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className={`reveal ${eyebrow}`}>— {t("about.storyLabel")}</p>
          <p
            className="reveal mt-8 text-lg font-light leading-[1.8] text-foreground"
            style={{ transitionDelay: "100ms" }}
          >
            {t("about.p1")}
          </p>
          <p
            className="reveal mt-6 max-w-xl text-lg font-light leading-[1.8] text-muted-foreground"
            style={{ transitionDelay: "160ms" }}
          >
            {t("about.p2")}
          </p>

          <dl className="mt-14 grid gap-x-8 sm:grid-cols-3">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className="reveal border-t border-border py-5"
                style={{ transitionDelay: `${i * ITEM_STAGGER_MS}ms` }}
              >
                <dt className={eyebrow}>{fact.label}</dt>
                <dd className="mt-3 text-sm font-light">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Skills index */}
      <section className="mt-24 md:mt-36">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-8">
          <div>
            <p className={`reveal ${eyebrow}`}>— {t("about.skillsEyebrow")}</p>
            <h2
              className={`reveal-mask mt-4 text-4xl tracking-tight md:text-6xl ${
                isThai ? "font-light" : "font-display font-medium"
              }`}
            >
              <span>{t("about.skillsTitle")}</span>
            </h2>
          </div>
          <span className="reveal font-display hidden text-sm tabular-nums text-muted-foreground md:block">
            01 / {String(skills.length).padStart(2, "0")}
          </span>
        </div>

        <ul className="grid md:grid-cols-2 md:gap-x-16">
          {skills.map((skill, i) => (
            <li
              key={skill}
              className="reveal flex items-baseline gap-6 border-b border-border py-6"
              style={{ transitionDelay: `${i * ITEM_STAGGER_MS}ms` }}
            >
              <span className="font-display text-sm tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-2xl tracking-tight md:text-3xl">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact CTA */}
      <section className="mt-24 pb-8 md:mt-36">
        <p className={`reveal ${eyebrow}`}>— {t("about.ctaEyebrow")}</p>
        <Link
          href={path("/contact")}
          className="reveal group mt-6 flex items-center justify-between gap-6 border-y border-border py-10 md:py-14"
          style={{ transitionDelay: "80ms" }}
        >
          <span
            className={`max-w-4xl text-2xl tracking-tight sm:text-3xl md:text-5xl ${
              isThai ? "font-light" : "font-display font-medium"
            }`}
          >
            {t("about.ctaTitle")}
          </span>
          <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 md:h-12 md:w-12" />
        </Link>
        <div className="mt-4 flex items-baseline justify-between">
          <span className={`reveal ${eyebrow}`}>{t("hero.badge")}</span>
          <span className="reveal font-display hidden text-sm tabular-nums text-muted-foreground sm:block">
            {String(projects.length).padStart(2, "0")} {t("nav.projects")}
          </span>
        </div>
      </section>
    </div>
  );
}
