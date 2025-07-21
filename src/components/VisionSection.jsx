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

      <h2 className="text-3xl md:text-4xl font-bold text-[#6D92E2] mb-12">Our Vision</h2>

      <div className="flex flex-col md:flex-row justify-center gap-12 max-w-5xl mx-auto">
        {/* Card 1 */}
        <div className="flex-1 flex flex-col items-center text-center px-4">
            {/* ICON WRAPPER */}
            <img
              src="/ScalableSolutions.svg"
              alt="Scalable Icon"
              className="h-16 w-16 mb-4"
            />

            {/* HEADING */}
            <h3 className="text-lg font-semibold text-[#6D92E2] mb-2">
              Scalable Solutions
            </h3>

            {/* PARAGRAPH */}
            <p className="text-sm text-gray-600 max-w-xs">
              Package and launch successful projects as whitepapers or toolkits to benefit other organisations.
            </p>
          </div>

        {/* Card 2 */}
        <div className="flex-1 flex flex-col items-center text-center px-4">
            {/* ICON WRAPPER */}
            <img
              src="/CommunityDrivenProjects.svg"
              alt="Scalable Icon"
              className="h-16 w-16 mb-4"
            />

            {/* HEADING */}
            <h3 className="text-lg font-semibold text-[#6D92E2] mb-2">
              Community Driven Projects
            </h3>

            {/* PARAGRAPH */}
            <p className="text-sm text-gray-600 max-w-xs">
              Work on active problems from non-academic community organisations, including international partners like Oxfam and IFRC.
            </p>
          </div>

        {/* Card 3 */}
        <div className="flex-1 flex flex-col items-center text-center px-4">
            {/* ICON WRAPPER */}
            <img
              src="/Lastingimpact.svg"
              alt="Scalable Icon"
              className="h-16 w-16 mb-4"
            />

            {/* HEADING */}
            <h3 className="text-lg font-semibold text-[#6D92E2] mb-2">
              Lasting Impact
            </h3>

            {/* PARAGRAPH */}
            <p className="text-sm text-gray-600 max-w-xs">
              Create AI solutions that address real challenges faced by underserved communities worldwide.
            </p>
          </div>
      </div>
    </motion.section>
  );
}
