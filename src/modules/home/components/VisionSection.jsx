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
      <h2 className="text-4xl md:text-4xl font-extrabold text-[#6D92E2] mb-12">#TODO VISION SECTION</h2>
    </motion.section>
  );
}
