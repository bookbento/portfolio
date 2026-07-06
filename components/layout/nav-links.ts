/** Primary site navigation, shared by the nav bar and the fullscreen menu. */
export const NAV_LINKS = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.projects", href: "/projects" },
  { key: "nav.experience", href: "/experience" },
  { key: "nav.aiTeam", href: "/ai-team" },
  { key: "nav.contact", href: "/contact" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
