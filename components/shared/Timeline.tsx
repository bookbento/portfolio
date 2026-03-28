"use client";

import { motion } from 'framer-motion';
import { Experience } from '@/types';

export default function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="relative border-l border-muted-foreground/20 ml-3 md:ml-6 space-y-12 pb-8">
      {items.map((item, index) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 md:pl-0"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[21px] md:-left-[29px] top-1 h-10 w-10 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary" />
          </div>

          <div className="md:ml-12 bg-card p-6 rounded-2xl border shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold">{item.role}</h3>
                <h4 className="text-lg text-muted-foreground font-medium">{item.company}</h4>
              </div>
              <span className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full w-fit">
                {item.duration}
              </span>
            </div>
            
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              {item.description.map((desc, i) => (
                <li key={i} className="text-sm leading-relaxed">{desc}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}