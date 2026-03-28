"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { IconGithub } from "@/components/icons/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group flex flex-col bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full font-normal">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            <IconGithub className="w-4 h-4 mr-2" /> {t("projectCard.code")}
          </Link>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" /> {t("projectCard.liveDemo")}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
