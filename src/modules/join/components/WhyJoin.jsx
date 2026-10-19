'use client';

import { motion } from 'framer-motion';

export default function WhyJoin() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12 sm:mb-20"
    >
      <div className="grid items-start gap-6 md:grid-cols-2 md:gap-16">
        <h2 className="text-3xl leading-tight font-bold text-[#213359] sm:text-4xl lg:text-5xl">Why should you join us?</h2>
        <p className="text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
          MOSAIC offers a unique opportunity to apply your skills in AI, design, and IT to solve real-world
          problems faced by marginalised communities. You&apos;ll gain hands-on experience, work with diverse teams,
          and make a lasting impact.
        </p>
      </div>
    </motion.div>
  );
}
