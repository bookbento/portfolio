"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { LangSwitcher } from './LangSwitcher';

export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'Home', path: `/${locale}` },
    { name: 'About', path: `/${locale}/about` },
    { name: 'Projects', path: `/${locale}/projects` },
    { name: 'Experience', path: `/${locale}/experience` },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm rounded-2xl px-6 py-3">
        <Link href={`/${locale}`} className="font-bold text-xl tracking-tight">
          <span className="text-primary">Portfolio</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.path ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LangSwitcher currentLocale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}