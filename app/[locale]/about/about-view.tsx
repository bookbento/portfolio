"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";

export default function AboutView() {
  const { t, messages } = useTranslation();
  const skills = messages.about.skills;

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="w-full md:w-1/3 relative aspect-square rounded-3xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 rounded-3xl" />
          <Image
            src="/assets/IMG_9057.jpg"
            alt={t("about.headlinePart1")}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-primary">{t("about.headlinePart1")}</span>{" "}
            {t("about.headlinePart2")}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("about.p1")}</p>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("about.p2")}</p>

          <div className="pt-4 space-y-4">
            <h3 className="text-xl font-semibold">{t("about.skillsTitle")}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={`${skill}-${index}`}
                  variant="secondary"
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
