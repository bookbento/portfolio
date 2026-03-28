import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Ninja Lingo',
    description: 'NinjaLingo is a vocabulary learning web application focused on enhancing memorization and retention through interactive learning techniques. Designed with a clean and intuitive interface, the platform helps users efficiently build and reinforce vocabulary in an engaging way.',
    image: "/assets/ninjalingo.png",
    techStack: ['React', 'TypeScript', 'Tailwind', 'Astro', 'Neon'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://ninjalingo.com',
  },
  {
    id: '2',
    title: 'TurnPro Landing page',
    description: 'A modern web application designed with a strong focus on SEO, performance, and scalability. Built using lightweight architecture to ensure fast load times, improved Core Web Vitals, and seamless user experience. Optimized for search engine visibility with clean structure, semantic HTML, and best practices for indexing and ranking.',
    image: "/assets/turnpro.png",
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Slug', 'Non SQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://turnprolandingpage.vercel.app/',
  },
];