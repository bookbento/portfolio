"use client";

import { motion } from 'framer-motion';
import Timeline from '@/components/shared/Timeline';
// เพิ่มข้อมูล mock data ลงในนี้ หรือดึงมาจาก @/constants/data ก็ได้
import { Experience } from '@/types';

const experiences: Experience[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'Tech Corp Inc.',
    duration: '2021 - Present',
    description: [
      'Led the migration from React SPA to Next.js App Router, improving SEO and reducing initial load time by 40%.',
      'Architected a scalable component library using Tailwind CSS and Radix UI.',
      'Mentored junior developers and established code review best practices.'
    ]
  },
  {
    id: '2',
    role: 'Full-Stack Developer',
    company: 'Digital Solutions Agency',
    duration: '2018 - 2021',
    description: [
      'Developed and maintained multiple client projects using React, Node.js, and PostgreSQL.',
      'Integrated third-party APIs including Stripe for payments and AWS S3 for file uploads.',
      'Implemented responsive designs and ensured cross-browser compatibility.'
    ]
  }
];

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Experience</h1>
        <p className="text-lg text-muted-foreground">
          My professional journey and the companies I&apos;ve had the pleasure to work with.
        </p>
      </motion.div>

      <div className="pt-8">
        <Timeline items={experiences} />
      </div>
    </div>
  );
}