'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function JoinPage() {
  const [expandedRole, setExpandedRole] = useState('data-scientist');

  const projectRoles = [
    { id: 'ai-engineer', title: 'AI Engineer' },
    { id: 'data-scientist', title: 'Data Scientist', description: 'Brief Role Description' }
  ];

  const committeeRoles = [
    { id: 'community-engagement', title: 'Community and Engagement Officer' },
    { id: 'accountant', title: 'Accountant' },
    { id: 'events-officer', title: 'Events Officer' },
    { id: 'marketing-officer', title: 'Marketing Officer' },
    { id: 'people-cultures', title: 'People and Cultures Officer' },
    { id: 'design-officer', title: 'Design Officer' }
  ];

  const toggleRole = (roleId) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

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

      {/* Available Roles Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-[#213359] py-16 w-full"
      >
        <div className="px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Project Roles */}
              <div>
                <h2 className="text-3xl font-bold text-lime-400 mb-8">Project Roles</h2>
                <div className="space-y-0">
                  {projectRoles.map((role, index) => (
                    <div key={role.id}>
                      <div 
                        className="flex items-center justify-between py-4 cursor-pointer hover:bg-[#1a2a4a] transition-colors duration-200"
                        onClick={() => toggleRole(role.id)}
                      >
                        <span className="text-white text-lg">{role.title}</span>
                        <span className="text-lime-400 text-xl font-bold">
                          {expandedRole === role.id ? '-' : '+'}
                        </span>
                      </div>
                      {expandedRole === role.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pb-4"
                        >
                          <p className="text-gray-300 text-sm mb-4">{role.description}</p>
                          <button className="bg-lime-400 text-white px-6 py-2 rounded font-semibold hover:bg-lime-500 transition-colors duration-200">
                            Apply now
                          </button>
                        </motion.div>
                      )}
                      {index < projectRoles.length - 1 && (
                        <div className="border-b border-dotted border-lime-400"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Committee Roles */}
              <div>
                <h2 className="text-3xl font-bold text-lime-400 mb-8">Committee Roles</h2>
                <div className="space-y-0">
                  {committeeRoles.map((role, index) => (
                    <div key={role.id}>
                      <div 
                        className="flex items-center justify-between py-4 cursor-pointer hover:bg-[#1a2a4a] transition-colors duration-200"
                        onClick={() => toggleRole(role.id)}
                      >
                        <span className="text-white text-lg">{role.title}</span>
                        <span className="text-lime-400 text-xl font-bold">
                          {expandedRole === role.id ? '-' : '+'}
                        </span>
                      </div>
                      {expandedRole === role.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pb-4"
                        >
                          <p className="text-gray-300 text-sm mb-4">Brief Role Description</p>
                          <button className="bg-lime-400 text-white px-6 py-2 rounded font-semibold hover:bg-lime-500 transition-colors duration-200">
                            Apply now
                          </button>
                        </motion.div>
                      )}
                      {index < committeeRoles.length - 1 && (
                        <div className="border-b border-dotted border-lime-400"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 