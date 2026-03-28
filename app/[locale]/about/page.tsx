"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const skills = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'AWS'];

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="w-full md:w-1/3 relative aspect-square rounded-3xl overflow-hidden shadow-xl">
          {/* แทนที่รูปด้วยรูปของคุณเอง */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 rounded-3xl" />
          <Image 
            src="/globe.svg" 
            alt="About Me" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Passionate about crafting <span className="text-primary">digital experiences.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Hello! I&apos;m a Senior Full-Stack Engineer with over 5 years of experience in building scalable web applications. I specialize in the modern JavaScript ecosystem, focusing on React, Next.js, and TypeScript.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My goal is to build clean, performant, and accessible user interfaces that solve real-world problems. When I&apos;m not coding, you can find me exploring new technologies, writing technical blogs, or enjoying a good cup of coffee.
          </p>
          
          <div className="pt-4 space-y-4">
            <h3 className="text-xl font-semibold">Core Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 rounded-xl text-sm font-medium">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}