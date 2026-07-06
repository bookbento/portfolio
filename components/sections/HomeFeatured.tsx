"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/constants/data";
import { useReveal } from "@/hooks/use-reveal";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";

const FEATURED_COUNT = 3;

export default function HomeFeatured() {
  const { t, locale } = useTranslation();
  const { path } = useLocalePath();
  useReveal();

  const isThai = locale === "th";
  const featured = projects.slice(0, FEATURED_COUNT);
  const totalProjects = projects.length;
  const pad = (n: number) => String(n).padStart(2, "0");
  const eyebrow = `text-[11px] uppercase ${isThai ? "tracking-[0.08em]" : "tracking-[0.35em]"} text-muted-foreground`;

  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 lg:px-16">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-8">
        <div>
          <p className={`reveal ${eyebrow}`}>— {t("home.featuredSubtitle")}</p>
          <h2
            className={`reveal-mask mt-4 text-4xl tracking-tight md:text-6xl ${
              isThai ? "font-light" : "font-display font-medium"
            }`}
          >
            <span>{t("home.featuredTitle")}</span>
          </h2>
        </div>
        <div className="reveal hidden flex-col items-end gap-3 md:flex">
          <span className="font-display text-sm tabular-nums text-muted-foreground">
            {pad(FEATURED_COUNT)} / {pad(totalProjects)}
          </span>
          <Link
            href={path("/projects")}
            className={`btn-line inline-flex items-center gap-2 ${
              isThai ? "text-sm tracking-[0.08em]" : "text-xs uppercase tracking-[0.18em]"
            }`}
          >
            {t("home.viewAll")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {featured.map((project, i) => {
        const href = project.liveUrl ?? path("/projects");
        const isExternal = Boolean(project.liveUrl);
        const linkProps = isExternal
          ? { target: "_blank" as const, rel: "noopener noreferrer" }
          : {};

        return (
          <article
            key={project.id}
            className="reveal group grid gap-6 border-b border-border py-12 md:grid-cols-12 md:items-center md:gap-10"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="font-display text-sm tabular-nums text-muted-foreground md:col-span-1">
              N° {String(i + 1).padStart(2, "0")}
            </span>

            <Link
              href={href}
              {...linkProps}
              aria-label={project.title}
              className={`img-zoom relative block aspect-[16/10] md:col-span-5 ${
                i % 2 === 1 ? "md:order-last" : ""
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                quality={80}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
            </Link>

            <div className="md:col-span-6">
              <h3 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
                <Link href={href} {...linkProps} className="transition-colors duration-700 group-hover:text-muted-foreground">
                  {project.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-xl font-light text-muted-foreground line-clamp-3">
                {project.description}
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {project.techStack.join(" · ")}
              </p>
              <Link
                href={href}
                {...linkProps}
                className={`btn-line mt-8 inline-flex items-center gap-2 ${
                  isThai ? "text-sm tracking-[0.08em]" : "text-xs uppercase tracking-[0.18em]"
                }`}
              >
                {isExternal ? t("projectCard.liveDemo") : t("home.viewProject")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        );
      })}

      <Link
        href={path("/projects")}
        className="reveal group flex items-center justify-between gap-6 border-b border-border py-10 md:py-14"
      >
        <span
          className={`text-2xl tracking-tight sm:text-3xl md:text-5xl ${
            isThai ? "font-light" : "font-display font-medium"
          }`}
        >
          {t("home.viewAllCount", { count: totalProjects })}
        </span>
        <span className="flex items-center gap-4">
          <span className="font-display hidden text-sm tabular-nums text-muted-foreground sm:block">
            {pad(FEATURED_COUNT + 1)} — {pad(totalProjects)}
          </span>
          <ArrowUpRight className="h-8 w-8 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 md:h-12 md:w-12" />
        </span>
      </Link>
    </section>
  );
}
