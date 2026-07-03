"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-fade, .reveal-mask, .hero-mask";
const REVEAL_THRESHOLD = 0.12;
const REVEAL_ROOT_MARGIN = "0px 0px -40px 0px";

/**
 * Scroll-reveal engine: one IntersectionObserver adds `.is-in` to every
 * element carrying `.reveal`, `.reveal-fade`, `.reveal-mask`, or `.hero-mask`
 * (see the "Premium motion" section in app/globals.css), then unobserves it.
 * Call once per page/view, after the revealable content is mounted.
 */
export function useReveal(): void {
  useEffect(() => {
    const elements = document.querySelectorAll(REVEAL_SELECTOR);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
