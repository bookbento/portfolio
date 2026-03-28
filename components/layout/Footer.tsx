import { Mail } from "lucide-react";
import Link from "next/link";
import { IconGithub, IconLinkedin } from "@/components/icons/brand-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Sarunpat-Sangpak. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <IconGithub className="w-5 h-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <IconLinkedin className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:your@email.com"
            className="hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
