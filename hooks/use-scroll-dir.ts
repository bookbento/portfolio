"use client";

import { useEffect, useState } from "react";

const HIDE_AFTER_Y = 220;
const SCROLLED_AFTER_Y = 40;
const SHOW_ON_UP_DELTA = 4;

interface ScrollDirState {
  /** True while scrolling down past the hero — hide the nav. */
  hidden: boolean;
  /** True once past the top of the page — switch nav to its solid/glass style. */
  scrolled: boolean;
}

/**
 * rAF-throttled scroll direction tracker for auto-hiding navigation:
 * hides on scroll-down past the hero, reappears on any scroll-up.
 */
export function useScrollDir(): ScrollDirState {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > SCROLLED_AFTER_Y);
        if (y > lastY && y > HIDE_AFTER_Y) setHidden(true);
        else if (y < lastY - SHOW_ON_UP_DELTA) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, scrolled };
}
