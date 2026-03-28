"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { useLocalePath } from "@/hooks/use-locale-path";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  const { path } = useLocalePath();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center px-4">
      <h1 className="text-2xl font-bold tracking-tight">{t("error.title")}</h1>
      <p className="text-muted-foreground max-w-md">{t("error.description")}</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button type="button" onClick={reset} className="rounded-xl">
          {t("error.retry")}
        </Button>
        <Button type="button" variant="outline" className="rounded-xl" asChild>
          <Link href={path("/")}>{t("error.home")}</Link>
        </Button>
      </div>
    </div>
  );
}
