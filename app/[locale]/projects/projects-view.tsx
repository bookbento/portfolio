"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/constants/data";
import { useTranslation } from "@/hooks/use-translation";

export default function ProjectsView() {
  const { t } = useTranslation();

  const groupedProjects = projects.reduce((acc, project) => {
    if (!acc[project.type]) {
      acc[project.type] = [];
    }
    acc[project.type].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  
  const sectionTitle: Record<string, string> = {
    production: "Production Projects",
    personal: "Personal Projects",
    academic: "Academic Projects",
    opensource: "Open Source",
  };

  const order = ["production", "personal", "academic", "opensource"];

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-16 px-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {t("projects.title")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("projects.subtitle")}
        </p>
      </motion.div>


      {order.map((type) =>
        groupedProjects[type] ? (
          <div key={type} className="space-y-6">

            <h2 className="text-2xl font-semibold tracking-tight">
              {sectionTitle[type]}
            </h2>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {groupedProjects[type].map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}