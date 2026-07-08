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

const TYPE_ORDER = ["production", "personal", "academic", "opensource"];

export default function ProjectsView() {
  const { t, locale } = useTranslation();
  const { path } = useLocalePath();
  useReveal();

  const isThai = locale === "th";
  const headlineWords = t("projects.title").split(" ");
  const pad = (n: number) => String(n).padStart(2, "0");

  const numbered = TYPE_ORDER.flatMap((type) =>
    projects.filter((project) => project.type === type)
  ).map((project, i) => ({ ...project, no: i + 1 }));
  const groups = TYPE_ORDER.map((type) => ({
    type,
    items: numbered.filter((project) => project.type === type),
  })).filter((group) => group.items.length > 0);

  const eyebrow = `text-[11px] uppercase ${isThai ? "tracking-[0.08em]" : "tracking-[0.35em]"} text-muted-foreground`;
  const uiLabel = isThai
    ? "text-sm tracking-[0.08em]"
    : "text-xs uppercase tracking-[0.18em]";

  return (
    <div className="grain mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
      {/* Headline */}
      <section>
        <div className="reveal flex items-baseline justify-between gap-4 border-b border-border pb-5">
          <span className={eyebrow}>— {t("nav.projects")}</span>
          <span className="font-display hidden text-sm tabular-nums text-muted-foreground sm:block">
            N° 01 — {pad(numbered.length)}
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

        <p
          className="reveal mt-8 max-w-xl text-lg font-light leading-[1.8] text-muted-foreground"
          style={{ transitionDelay: "150ms" }}
        >
          {t("projects.subtitle")}
        </p>
      </section>

      {/* Index — grouped by type */}
      {groups.map((group, gi) => (
        <section key={group.type} className="mt-20 md:mt-28">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-8">
            <div>
              <p className={`reveal ${eyebrow}`}>
                — {pad(gi + 1)} / {t("projects.indexLabel")}
              </p>
              <h2
                className={`reveal-mask mt-4 text-4xl tracking-tight md:text-6xl ${
                  isThai ? "font-light" : "font-display font-medium"
                }`}
              >
                <span>{t(`projects.types.${group.type}`)}</span>
              </h2>
            </div>
            <span className="reveal font-display hidden text-sm tabular-nums text-muted-foreground md:block">
              {t("projects.countLabel", { count: pad(group.items.length) })}
            </span>
          </div>

          {group.items.map((project, i) => {
            const primaryHref = project.liveUrl ?? project.githubUrl;
            const externalProps = {
              target: "_blank" as const,
              rel: "noopener noreferrer",
            };

            const picture = (
              <>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
              </>
            );
            const pictureClass = `img-zoom relative block aspect-[16/10] md:col-span-5 ${
              i % 2 === 1 ? "md:order-last" : ""
            }`;

            return (
              <article
                key={project.id}
                className="reveal group grid gap-6 border-b border-border py-12 md:grid-cols-12 md:items-center md:gap-10"
                style={{ transitionDelay: `${i * ITEM_STAGGER_MS}ms` }}
              >
                <span className="font-display text-sm tabular-nums text-muted-foreground md:col-span-1">
                  N° {pad(project.no)}
                </span>

                {primaryHref ? (
                  <Link
                    href={primaryHref}
                    {...externalProps}
                    aria-label={project.title}
                    className={pictureClass}
                  >
                    {picture}
                  </Link>
                ) : (
                  <div className={pictureClass}>{picture}</div>
                )}

                <div className="md:col-span-6">
                  <h3 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
                    {primaryHref ? (
                      <Link
                        href={primaryHref}
                        {...externalProps}
                        className="transition-colors duration-700 group-hover:text-muted-foreground"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      <span className="transition-colors duration-700 group-hover:text-muted-foreground">
                        {project.title}
                      </span>
                    )}
                  </h3>
                  <p className="mt-4 max-w-xl font-light text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {project.techStack.join(" · ")}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        {...externalProps}
                        className={`btn-line inline-flex items-center gap-2 ${uiLabel}`}
                      >
                        {t("projectCard.liveDemo")}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        {...externalProps}
                        className={`btn-line inline-flex items-center gap-2 ${uiLabel}`}
                      >
                        {t("projectCard.code")}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    {!primaryHref && (
                      <span className={eyebrow}>{t("projects.internal")}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ))}

      {/* Contact CTA */}
      <section className="mt-24 pb-8 md:mt-36">
        <p className={`reveal ${eyebrow}`}>— {t("projects.ctaEyebrow")}</p>
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
            {t("projects.ctaTitle")}
          </span>
          <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 md:h-12 md:w-12" />
        </Link>
        <div className="mt-4 flex items-baseline justify-between">
          <span className={`reveal ${eyebrow}`}>{t("hero.badge")}</span>
          <span className={`reveal hidden sm:block ${eyebrow}`}>
            {t("hero.location")}
          </span>
        </div>
      </section>
    </div>
  );
}
