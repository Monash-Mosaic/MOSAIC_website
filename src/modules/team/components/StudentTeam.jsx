'use client';

import { motion } from 'framer-motion';
import { studentTeam } from '../data';
import TeamImage from './TeamImage';

export default function StudentTeam() {
  return (
    <div className="bg-[linear-gradient(to_bottom,#FFFFFF_50%,#213359_50%)]">
      <section className="rounded-[2.5rem] bg-[#D8DEFC] px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-4xl font-bold text-[#364B7E] md:text-5xl">Student Team</h2>
          <p className="mt-3 text-center text-sm text-[#364B7E]">Meet the people behind MOSAIC</p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {studentTeam.map((group, index) => (
            <motion.figure
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <TeamImage
                src={group.image}
                alt={group.alt}
                className="aspect-square w-full rounded-lg shadow-sm"
              />
              <figcaption className="mt-5 max-w-xs text-center text-sm text-[#213359]">
                {group.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-20 text-center text-lg text-[#213359]">more introductions soon to come :)</p>
      </section>
    </div>
  );
}
