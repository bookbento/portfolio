"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "@/hooks/use-translation";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  // Label names the theme the click switches to.
  const label = isDark ? t("nav.themeLight") : t("nav.themeDark");

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`btn-line cursor-pointer ${mounted ? "" : "opacity-50"} ${className}`}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle color theme"
      }
    >
      {label}
    </button>
  );
}
