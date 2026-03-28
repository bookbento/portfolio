"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative rounded-full w-9 h-9 cursor-pointer"
      onClick={toggle}
      aria-label={
        mounted
          ? resolvedTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle color theme"
      }
    >
      {!mounted ? (
        <Sun className="h-[1.2rem] w-[1.2rem] opacity-40" aria-hidden />
      ) : (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden />
        </>
      )}
    </Button>
  );
}
