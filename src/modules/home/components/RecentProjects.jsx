'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';

export default function RecentProjects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="pt-50 bg-[#D6DEFF] py-30 px-6 text-center snap-start w-full"
    >
      <h2 className="text-4xl md:text-4xl font-extrabold text-[#4953A1] mb-12">Recent projects</h2>

      <div className="grid gap-2 md:gap-10 grid-cols-1 md:grid-cols-3 max-w-8xl mx-auto">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: project.delay, damping: 10 }}
            className="rounded-lg p-1 md:p-6 max-w-6xl"
          >
            <div className="w-full h-50 md:h-70 flex items-center justify-center mb-4 p-6">
              <img
                src={project.image}
                alt={project.previewTitle}
                className="h-40 md:h-60 w-auto border-[#6D92E2]/50 rounded-lg shadow-md"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.previewTitle}</h3>
            <p className="text-sm text-gray-600">{project.description}.</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
