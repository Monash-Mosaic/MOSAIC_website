'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components';

export default function TeamPage() {
  return (
    <PageLayout navbarColor="dark" className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <h1 className="text-5xl font-bold text-[#213359] leading-tight">Our team</h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              MOSAIC is powered by students across AI, design, and IT who volunteer their time to build
              technology for marginalised communities. We&apos;re putting together the profiles of the people
              behind our projects.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-2 border-dashed border-[#213359]/30 rounded-2xl py-20 px-6 text-center"
        >
          <img src="/Octopus_icon_3.png" alt="Octopus" className="mx-auto mb-6 w-20 md:w-24" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#213359] mb-3">Team profiles coming soon</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We&apos;re currently collecting photos and bios for our committee and project teams. Check back
            soon, or get in touch if you&apos;d like to work with us.
          </p>
        </motion.div>
      </main>
    </PageLayout>
  );
}
