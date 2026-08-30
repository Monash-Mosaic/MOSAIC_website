'use client';

import { motion } from 'framer-motion';
import { recruitmentSteps } from '../data';

export default function RecruitmentProcess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-20"
    >
      <h2 className="text-5xl font-bold text-[#213359] mb-16">Our Recruitment Process</h2>

      <div className="relative">
        <div className="absolute top-8 left-0 right-0 h-1 bg-[#213359] hidden md:block"></div>

        <div className="grid md:grid-cols-3 gap-8">
          {recruitmentSteps.map((item) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-[#213359] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-white text-xl font-bold">{item.step}</span>
                </div>
              </div>
              <p className="text-xl text-[#213359] font-semibold">{item.title}</p>
              <p className="text-lg text-gray-700 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
