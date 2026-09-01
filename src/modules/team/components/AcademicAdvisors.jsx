'use client';

import { motion } from 'framer-motion';
import { academicAdvisors } from '../data';
import TeamImage from './TeamImage';

export default function AcademicAdvisors() {
  return (
    <section className="relative z-10 -mt-8 rounded-t-[2rem] bg-white px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-center text-3xl font-bold text-[#111111] md:text-4xl"
      >
        Academic Advisors
      </motion.h2>

      <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {academicAdvisors.map((advisor, index) => (
          <motion.figure
            key={advisor.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center rounded-md border border-[#EBEBEB] bg-white px-6 pb-5 pt-6 shadow-sm"
          >
            <TeamImage
              src={advisor.image}
              alt={advisor.name}
              className="aspect-[9/10] w-full rounded-sm"
            />
            <figcaption className="mt-5 text-center text-sm text-[#213359]">{advisor.name}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
