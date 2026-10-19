'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components';
import ContactForm from './components/ContactForm';

export default function ContactPage() {
  return (
    <PageLayout
      as="main"
      className="min-h-screen bg-white text-[#213359] relative flex flex-col items-center"
    >
      <section className="flex w-full flex-col items-center px-4 pt-6 pb-10 sm:mt-10 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            duration: 1,
            damping: 10,
            stiffness: 50,
          }}
        >
          <img src="/Octopus_icon_3.png" alt="Octopus" className="mx-auto mb-4 w-20 md:w-28" />
          <h1 className="mb-2 px-2 text-center text-2xl font-extrabold break-words sm:text-3xl md:text-5xl" style={{ color: '#213359' }}>
            We’d love to hear from you!
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            duration: 1,
            damping: 15,
            stiffness: 60,
          }}
          className="mt-8 flex w-full max-w-7xl flex-col justify-center gap-8 rounded-2xl bg-[#213359] p-4 sm:p-8 md:flex-row md:p-12"
        >
          <ContactForm />
          <div className="border-b-2 border-blue-500"></div>
        </motion.div>
      </section>
    </PageLayout>
  );
}
