'use client';
import { motion } from 'framer-motion';

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
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0 }}
          className="flex-1 flex flex-col items-center text-center px-4">
          {/* ICON WRAPPER */}
          <img
            src="/ScalableSolutions.svg"
            alt="Scalable Icon"
            className="h-20 w-20 mb-4"
          />

          {/* HEADING */}
          <h3 className="text-xl font-semibold text-[#6D92E2] mb-2">
            Scalable Solutions
          </h3>

          {/* PARAGRAPH */}
          <p className="text-base text-gray-600 max-w-xs">
            Package and launch successful projects as whitepapers or toolkits to benefit other organisations.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="flex-1 flex flex-col items-center text-center px-4">
          {/* ICON WRAPPER */}
          <img
            src="/CommunityDrivenProjects.svg"
            alt="Scalable Icon"
            className="h-20 w-20 mb-4"
          />

          {/* HEADING */}
          <h3 className="text-xl font-semibold text-[#6D92E2] mb-2">
            Community Driven Projects
          </h3>

          {/* PARAGRAPH */}
          <p className="text-base text-gray-600 max-w-xs">
            Work on active problems from non-academic community organisations, including international partners like Oxfam and IFRC.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          className="flex-1 flex flex-col items-center text-center px-4">
          {/* ICON WRAPPER */}
          <img
            src="/LastingImpact.svg"
            alt="Scalable Icon"
            className="h-20 w-20 mb-4"
          />

          {/* HEADING */}
          <h3 className="text-xl font-semibold text-[#6D92E2] mb-2">
            Lasting Impact
          </h3>

          {/* PARAGRAPH */}
          <p className="text-base text-gray-600 max-w-xs">
            Create AI solutions that address real challenges faced by underserved communities worldwide.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
