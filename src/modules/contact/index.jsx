'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components';
import ContactForm from './components/ContactForm';

export default function ContactPage() {
  return (
    <PageLayout
      as="main"
      navbarColor="dark"
      className="min-h-screen bg-white text-[#213359] relative flex flex-col items-center"
    >
      <section className="w-full flex flex-col items-center mt-10 px-4 pb-8">
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
          <h1 className="text-2xl md:text-5xl font-extrabold text-center mb-2" style={{ color: '#213359' }}>
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
          className="w-full max-w-7xl bg-[#213359] rounded-2xl mt-8 p-8 md:p-12 flex flex-col md:flex-row gap-8 justify-center"
        >
          <ContactForm />
          <div className="border-b-2 border-blue-500"></div>
        </motion.div>
      </section>
    </PageLayout>
  );
}
