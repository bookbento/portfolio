"use client";

import { motion } from "framer-motion";
import Timeline from "@/components/shared/Timeline";
import type { Experience } from "@/types";
import { useTranslation } from "@/hooks/use-translation";

const experiences: Experience[] = [
  {
    id: "1",
    role: "Apprentice Full-Stack Developer",
    company: "TurnPro Company",
    duration: "Present",
    description: [
      "Led the migration from React SPA to Next.js App Router, improving SEO and reducing initial load time by 40%.",
      "Architected a scalable component library using Tailwind CSS and Radix UI.",
      "Mentored junior developers and established code review best practices.",
    ],
  },
  {
    id: "2",
    role: "Bachelor s degree student",
    company: "Chiang Mai University DII faculty",
    duration: "2024 - 2025",
    description: [
      "Studied and developed backend applications using Node.js, focusing on building RESTful APIs and scalable server-side logic",
      "Gained hands-on experience with SQL databases (designing schemas, writing queries, and managing relational data)",
      "Learned core principles of Cybersecurity, including authentication, data protection, and secure coding practices",
      "Explored Cloud Deployment, deploying web applications and APIs to cloud platforms with attention to performance and scalability",
      "Built strong foundation in Java Object-Oriented Programming (OOP), applying concepts such as encapsulation, inheritance, and design patterns",
    ],
  },
];

export default function ExperienceView() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t("experience.title")}</h1>
        <p className="text-lg text-muted-foreground">{t("experience.subtitle")}</p>
      </motion.div>

      <div className="pt-8">
        <Timeline items={experiences} />
      </div>
    </div>
  );
}
