'use client';
import { motion } from 'framer-motion';

export default function VisionSection() {
  return (

    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center bg-white items-center text-center px-6 snap-start"
    >

      <h2 className="text-3xl md:text-4xl font-bold text-[#6A79FF] mb-12">Our Vision</h2>

      <div className="flex flex-col md:flex-row justify-center gap-12 max-w-5xl mx-auto">
        {/* Card 1 */}
        <div className="flex-1">
          <div className="text-4xl mb-4 text-[#6A79FF]"></div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Scalable Solutions</h3>
          <p className="text-gray-600 text-sm">
            Package and launch successful projects as whitepaper or "toolkits" to benefit other organisations.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex-1">
          <div className="text-4xl mb-4 text-[#6A79FF]"></div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Community Driven Projects</h3>
          <p className="text-gray-600 text-sm">
            Work on active problems from non-academic community organisations, including international partners like Oxfam and IFRC.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex-1">
          <div className="text-4xl mb-4 text-[#6A79FF]"></div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Lasting Impact</h3>
          <p className="text-gray-600 text-sm">
            Create AI solutions that address real challenges faced by underserved communities worldwide.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
