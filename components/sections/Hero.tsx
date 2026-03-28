"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type HeroDict = {
  badge: string;
  greeting: string;
  name: string;
  role: string;
  description: string;
  viewProjects: string;
  contactMe: string;
};

export default function Hero({
  dict,
  locale,
}: {
  dict: HeroDict;
  locale: string;
}) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-4 inline-block">
          {dict.badge}
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mt-4">
          {dict.greeting}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-100">
            {dict.name}
          </span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto font-light">
          <span className="font-medium text-foreground/90">{dict.role}</span>
        </p>

        <p className="mt-3 text-xl text-muted-foreground max-w-2xl mx-auto font-light">
          {dict.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <Button asChild size="lg" className="rounded-2xl">
          <Link href={`/${locale}/projects`}>
            {dict.viewProjects} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-2xl">
          <Link href={`/${locale}/contact`}>{dict.contactMe}</Link>
        </Button>
      </motion.div>
    </section>
  );
}
