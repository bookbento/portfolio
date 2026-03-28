"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";

export default function HomeFeatured() {
  const { t } = useTranslation();
  const { path } = useLocalePath();

  return (
    <section>
      <div className="flex justify-between items-end mb-8 px-6 lg:px-48">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("home.featuredTitle")}</h2>
          <p className="text-muted-foreground mt-2">{t("home.featuredSubtitle")}</p>
        </div>
        <Button variant="ghost" asChild className="hidden md:flex">
          <Link href={path("/projects")}>
            {t("home.viewAll")} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-48">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
