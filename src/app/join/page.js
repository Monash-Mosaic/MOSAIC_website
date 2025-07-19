'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar color="dark" />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Why should you join us? Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <h2 className="text-5xl font-bold text-[#213359] leading-tight">
              Why should you join us?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              MOSAIC offers a unique opportunity to apply your skills in AI, design, and IT to solve real-world problems faced by marginalised communities. You'll gain hands-on experience, work with diverse teams, and make a lasting impact.
            </p>
          </div>
        </motion.div>

        {/* Our Recruitment Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold text-[#213359] mb-16">
            Our Recruitment Process
          </h2>
          
          {/* Timeline */}
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-[#213359] hidden md:block"></div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[#213359] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Submit your application for your chosen role using the form below.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[#213359] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Attend the interview.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[#213359] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Discover the suitability of the role during two weeks of probational period.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 