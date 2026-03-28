import Hero from "@/components/sections/Hero";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/constants/data";
import { getDictionary } from "@/hooks/use-dictionary";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Locale = "en" | "th";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-32">
      <Hero dict={dict.hero} locale={locale} />

      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
            <p className="text-muted-foreground mt-2">Some of my recent work.</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link href={`/${locale}/projects`}>
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
