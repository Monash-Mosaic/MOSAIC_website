'use client';

import { motion } from 'framer-motion';
import { visionItems } from '../data';

export default function VisionSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center bg-white items-center text-center px-6 snap-start w-full"
    >
      <h2 className="text-4xl md:text-4xl font-extrabold text-[#6D92E2] mb-12">Our Vision</h2>

      <div className="flex flex-col md:flex-row justify-center gap-16 max-w-6xl mx-auto">
        {visionItems.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: item.delay }}
            className="flex-1 flex flex-col items-center text-center px-4"
          >
            <img src={item.image} alt={item.alt} className="h-20 w-20 mb-4" />
            <h3 className="text-xl font-semibold text-[#6D92E2] mb-2">{item.title}</h3>
            <p className="text-base text-gray-600 max-w-xs">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
