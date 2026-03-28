"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center px-4">
      <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md">
        An unexpected error occurred. You can try again or return to the homepage.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button type="button" onClick={reset} className="rounded-xl">
          Try again
        </Button>
        <Button type="button" variant="outline" className="rounded-xl" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
