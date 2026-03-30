"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";

export default function Hero() {
  const { t } = useTranslation();
  const { path } = useLocalePath();

  return (
    <div>
      <div className="relative w-full h-[80vh]">
        <Image
          src="/assets/sarunpat.png"
          alt={t("hero.bannerAlt")}
          fill
          priority
          className="object-cover rounded-xl"
        />
      </div>
      <section className="relative flex flex-col items-center justify-center min-h-[40vh] text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-2 rounded-full text-primary text-sm font-medium tracking-wide mb-4 inline-block">
            {t("hero.badge")}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mt-4">
            {t("hero.greeting")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B98B91] to-orange-300">
              {t("hero.name")}
            </span>
          </h1>
          <p className="mt-6 mb-8 text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            <span className="font-medium text-foreground/90">{t("hero.role")}</span>
          </p>

          <p className="mt-3 mb-8 text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            {t("hero.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Button asChild size="lg" className="rounded-2xl">
            <Link href={path("/projects")}>
              {t("hero.viewProjects")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-2xl">
            <Link href={path("/contact")}>{t("hero.contactMe")}</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
