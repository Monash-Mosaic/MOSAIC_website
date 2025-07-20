'use client';
import { motion } from 'framer-motion';

export default function RecentProjects() {
  return (
      <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="pt-40 min-h-screen bg-[#E4E4FB] py-30 px-6 text-center snap-start"
    >

      <h2 className="text-3xl md:text-4xl font-bold text-[#4953A1] mb-12">Recent projects</h2>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6">
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-4xl text-gray-500"></span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Project Title</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
