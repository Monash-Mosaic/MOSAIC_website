'use client';

import { motion } from 'framer-motion';

export default function WhyJoin() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-20"
    >
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <h2 className="text-5xl font-bold text-[#213359] leading-tight">Why should you join us?</h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          MOSAIC offers a unique opportunity to apply your skills in AI, design, and IT to solve real-world
          problems faced by marginalised communities. You'll gain hands-on experience, work with diverse teams,
          and make a lasting impact.
        </p>
      </div>
    </motion.div>
  );
}
