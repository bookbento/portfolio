---
name: premium-motion
description: Premium editorial design language and animation system for this portfolio. Use whenever building or restyling any UI in this repo — new sections, pages, components, hover states, reveals, hero areas, or anything involving animation/motion. Ensures the luxurious, slow, editorial feel (nongpalm DNA) instead of generic template UI.
---

# Premium Motion — design language for this portfolio

The target feel is **หรู สวย premium**: luxury-editorial, like a fashion magazine. The reference DNA comes from the `nongpalm` project. The core insight: **premium = slow + restrained**, not more effects. Long durations (1.4–1.8s), one signature easing curve, staggered entrances, and lots of negative space read as "expensive". Fast, bouncy, or busy motion reads as cheap.

## Motion tokens (already installed in `app/globals.css`)

Never hardcode easing/duration — use these:

| Token | Value | Use for |
|---|---|---|
| `--ease-luxe` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Reveals, image zoom — the master curve |
| `--ease-inout-luxe` | `cubic-bezier(0.76, 0, 0.24, 1)` | Line draws, nav slide, symmetric moves |
| `--duration-reveal` | `1.4s` | Scroll/text reveals |
| `--duration-fade` | `1.8s` | Pure opacity fades |
| `--duration-ui` | `0.7s` | Hover states, nav, underlines |
| `--duration-zoom` | `1.8s` | Image hover zoom |

Stagger unit: **60ms** per item (`style={{ transitionDelay: `${i * 60}ms` }}`); hero words: **120ms** per word + 200ms lead-in.

## Installed utilities

> **Layering gotcha:** the utility classes below live in `globals.css` *unlayered*, so any property they set beats Tailwind utilities on the same element regardless of class order. Known traps: `.grain` sets `position: relative` (overrides `fixed`/`absolute` — put `grain` on an inner wrapper of fixed overlays) and `.btn-line` sets `display: inline-flex` (overrides `hidden`/responsive display utilities — wrap in a `<span className="hidden md:inline-flex">` to hide responsively).

### Scroll reveal system

`hooks/use-reveal.ts` exports `useReveal()` — one IntersectionObserver that adds `.is-in` to every `.reveal` / `.reveal-fade` / `.reveal-mask` element, then unobserves. Call it **once** in the page-level client view (e.g. in `*-view.tsx`). It already handles `prefers-reduced-motion` (reveals everything immediately).

```tsx
'use client';
import { useReveal } from '@/hooks/use-reveal';

export function SectionView() {
  useReveal();
  return (
    <section>
      <h2 className="reveal-mask"><span>Selected Works</span></h2>
      {items.map((item, i) => (
        <article key={item.id} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
          …
        </article>
      ))}
    </section>
  );
}
```

- `.reveal` — fade + rise 28px (default choice for cards/blocks)
- `.reveal-fade` — opacity only (for images/large surfaces)
- `.reveal-mask` — direct child slides up from `translateY(110%)` behind an overflow mask (for headings; child must be an inline-block element like `<span>`)

### Word-mask hero reveal (`.hero-mask`)

The signature headline entrance: split the headline into words, each in an overflow mask, staggered.

```tsx
<h1 className="hero-mask text-[9.5vw] leading-[0.92]">
  {words.map((w, i) => (
    <span key={i} className="word mr-[0.25em]">
      <span style={{ transitionDelay: `${i * 120 + 200}ms` }}>{w}</span>
    </span>
  ))}
</h1>
```

`useReveal()` observes `.hero-mask` too and toggles `.is-in` on the `<h1>`, sliding each word up. One emphasis word may be wrapped in `<em className="italic font-normal">` — the editorial accent.

### Other utilities in `app/globals.css`

- `.btn-line` — 1px underline that wipes out right, then redraws from left on hover. Use for nav links and text CTAs.
- `.img-zoom` — wrap around an image (works with `next/image` `fill`); image scales to 1.06 over 1.8s on hover. Prefer this over fast `scale-105` transitions.
- `.ken-burns` — 12s slow drift `scale(1.08→1.18)` for hero imagery; pair with a crossfade (`transition-opacity duration-[1600ms]`) when cycling slides, re-keying the `<img>` to restart the drift.
- `.grain` — SVG fractal-noise texture overlay (opacity 0.06 multiply; auto-switches to screen blend in dark mode). Use on large flat color surfaces to add atmosphere.
- `.nav-shell` / `.nav-hidden` + `useScrollDir()` from `hooks/use-scroll-dir.ts` — auto-hiding nav: hides on scroll-down past 220px, returns on scroll-up; `scrolled` flag switches to glass style (`bg-background/90 backdrop-blur-md`).

### Sticky parallax recipe (not a utility — copy this pattern)

```tsx
'use client';
// inside a `sticky top-0 h-screen overflow-hidden` section
useEffect(() => {
  const el = ref.current;
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const onScroll = () => {
    const r = el.getBoundingClientRect();
    const center = r.top + r.height / 2 - window.innerHeight / 2;
    img.style.transform = `translate3d(0, ${-center * 0.18}px, 0) scale(1.18)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

## Editorial styling vocabulary

- **Eyebrow/kicker labels**: `text-[11px] tracking-[0.35em] uppercase text-muted-foreground`, often prefixed with an em-dash: `— Selected Works`
- **UI labels**: `text-xs tracking-[0.18em] uppercase`
- **Indices**: zero-padded tabular numbers — `01 / 05`, `N° 06` (`tabular-nums`)
- **Oversized display type**: viewport-driven sizes (`text-[7.5vw]`–`text-[14vw]`), `leading-[0.92]`, slight negative tracking
- **Gradient scrims** over imagery: `bg-gradient-to-b from-black/40 via-black/10 to-black/60` for depth + text contrast
- **`mix-blend-difference`** on labels/arrows overlaying images so they stay legible on any background
- Thin 1px hairlines (`border-border`) instead of shadows for separation; glassmorphism only sparingly (nav, small badges)

## Repo-specific rules

- **framer-motion is loaded via `LazyMotion` with `strict`** (`components/providers/motion-provider.tsx`) → always import `m` (`<m.div>`), never `motion.div`. For plain scroll reveals prefer the CSS utilities above over framer-motion — lighter and consistent.
- **Both themes**: the site has light/dark (`next-themes`, class-based). Every new surface must look intentional in both. Use the shadcn tokens (`--background`, `--foreground`, `--muted-foreground`, `--border`) not hardcoded hex.
- **Bilingual (en/th)**: display serifs (Bodoni-style) have no Thai glyphs. Editorial serif treatment applies to **Latin text only**; Thai text uses Kanit (already `--font-kanit`) — for Thai headlines use lighter weights (300–400) at large sizes to keep the editorial feel. Never let Thai strings fall into a Latin-only display font.
- **Reduced motion is mandatory**: every new animation needs a `prefers-reduced-motion: reduce` fallback (the installed utilities already have one; match that standard in new CSS or JS effects).
- **Compositor-only properties**: animate `transform`, `opacity`, `clip-path` only. Never `width/height/top/left/margin`.
- Project data lives in `constants/data.ts` (`Project` type in `types/index.ts`); project cards render via `components/shared/ProjectCard.tsx`.

## Checklist before shipping a surface

- [ ] Uses motion tokens, not ad-hoc easings/durations
- [ ] Entrances are staggered (60ms unit) and slow (≥1.4s reveals)
- [ ] Hover states designed (btn-line / img-zoom / equivalent), not default
- [ ] Looks intentional in light AND dark theme
- [ ] Thai locale checked — no Thai text in Latin display styling
- [ ] Reduced-motion verified (DevTools → Emulate prefers-reduced-motion)
- [ ] Only compositor-friendly properties animated
