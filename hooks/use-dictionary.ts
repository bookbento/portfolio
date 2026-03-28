import "server-only";

const dictionaries = {
  en: () => import("@/i18n/en.json").then((module) => module.default),
  th: () => import("@/i18n/th.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: string) => {
  const key: Locale = locale === "th" ? "th" : "en";
  return dictionaries[key]();
};
