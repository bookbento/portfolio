"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";

export function NotFoundContent() {
  const { t } = useTranslation();
  const { path } = useLocalePath();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-6">
      <h1 className="text-9xl font-black text-primary/20">404</h1>
      <h2 className="text-3xl font-bold tracking-tight">{t("notFound.title")}</h2>
      <p className="text-muted-foreground max-w-md">{t("notFound.description")}</p>
      <Button asChild className="rounded-xl mt-4">
        <Link href={path("/")}>{t("notFound.cta")}</Link>
      </Button>
    </div>
  );
}
