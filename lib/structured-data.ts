import { siteBase, getAlternateUrls } from "@/lib/seo";
import type { AppLocale } from "@/i18n/config";

/**
 * schema.org JSON-LD builders. All values are static / config-derived,
 * so the output is safe to inline in a server-rendered <script>.
 */

const PERSON_NAME = "Sarunpat Sangpak";
const PERSON_JOB_TITLE = "Full-Stack Engineer";

/** Real, verified profiles only. LinkedIn omitted until a real URL exists. */
const PERSON_SAME_AS = [
  "https://github.com/bookbento",
  "mailto:mrsarunpatbook3@gmail.com",
];

const PERSON_SKILLS = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Java",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "AWS",
];

export function personSchema(): Record<string, unknown> {
  const base = siteBase();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    url: base,
    image: `${base}/opengraph-image`,
    jobTitle: PERSON_JOB_TITLE,
    knowsAbout: PERSON_SKILLS,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chiang Mai",
      addressCountry: "TH",
    },
    sameAs: PERSON_SAME_AS,
  };
}

export function websiteSchema(): Record<string, unknown> {
  const base = siteBase();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: PERSON_NAME,
    url: base,
    inLanguage: ["en", "th"],
    author: {
      "@type": "Person",
      name: PERSON_NAME,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Absolute URL for this crumb. */
  url: string;
}

export function breadcrumbSchema(items: readonly BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Two-level Home → Page breadcrumb using canonical localized URLs.
 */
export function pageBreadcrumbSchema({
  locale,
  pathname,
  homeLabel,
  pageLabel,
}: {
  locale: AppLocale;
  pathname: string;
  homeLabel: string;
  pageLabel: string;
}): Record<string, unknown> {
  const pick = (urls: { en: string; th: string }) => (locale === "en" ? urls.en : urls.th);

  return breadcrumbSchema([
    { name: homeLabel, url: pick(getAlternateUrls("/")) },
    { name: pageLabel, url: pick(getAlternateUrls(pathname)) },
  ]);
}
