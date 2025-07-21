'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function JoinPage() {
  const [expandedRole, setExpandedRole] = useState('data-scientist');

  const projectRoles = [
    { id: 'ai-engineer', title: 'AI Engineer', description: 'Build and deploy AI models to solve real-world problems in our community projects.' },
    { id: 'data-scientist', title: 'Data Scientist', description: 'Analyze data, uncover insights, and support decision-making through visualizations and models.' },
    { id: 'mobile-app-dev', title: 'Mobile App Developer', description: 'Design and build cross-platform mobile apps using Flutter, integrating APIs and managing app state effectively.' },
    { id: 'full-stack-dev', title: 'Full-Stack Web Developer', description: 'Develop web applications using Python or JavaScript frameworks, with opportunities to explore cloud platforms, databases, and AI integration tools.' },
    { id: 'ui-designer', title: 'UI/UX Designer', description: 'Craft intuitive, accessible, and visually engaging designs that enhance user experience across our digital platforms.' },

  ];

  const committeeRoles = [
    { id: 'community-engagement', title: 'Community and Engagement Officer', description: 'Foster connections, organize outreach, and keep communities engaged and informed.' },
    { id: 'accountant', title: 'Accountant',  description: 'Manage budgets, track spending, and ensure financial transparency for all activities' },
    { id: 'events-officer', title: 'Events Officer', description: 'Plan and coordinate engaging events that bring our members and communities together.' },
    { id: 'marketing-officer', title: 'Marketing Officer', description: 'Promote our work through both online and offline channels, create engaging content, and strengthen our overall presence.' },
    { id: 'people-cultures', title: 'People and Cultures Officer', description: 'Support team wellbeing, coordinate onboarding, and celebrate diversity.' },
    { id: 'design-officer', title: 'Design Officer', description: 'Create visuals, graphics, and materials that reflect our identity and values.' }
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
                <p className="text-xl text-[#213359] font-semibold">
                  Apply Online
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Submit the form to choose the team(s) you're interested in.
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
                <p className="text-xl text-[#213359] font-semibold">
                  Interview
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Chat with a MOSAIC executive about your interests and how you can contribute.
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
                <p className="text-xl text-[#213359] font-semibold">
                  Trial Period
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                 Join us for a few weeks to see where you fit best.
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
                          <p className="text-gray-300 text-base mb-4">{role.description}</p>
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
                           <p className="text-gray-300 text-base mb-4">{role.description}</p>
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
      <Footer/>
    </div>
  );
}