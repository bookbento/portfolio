import type { MetadataRoute } from "next";
import { PUBLIC_PATHS, getAlternateUrls } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_PATHS.map((path) => {
    const { en, th } = getAlternateUrls(path);

    return {
      url: en,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: { en, th },
      },
    };
  });
}
