'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import OctopusDecoration from './OctopusDecoration';

export default function Hero() {
  return (
    <section className="relative min-h-screen snap-start flex flex-col justify-center items-center text-center px-6">
      <motion.h1
        style={{ color: '#BDFF15' }}
        initial={{ opacity: 0, y: -30, x: -5, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.2,
          type: 'spring',
          damping: 10,
          stiffness: 40,
          mass: 0.5,
        }}
        className="text-4xl md:text-6xl font-extrabold"
      >
        AI for Social Impact
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -30, x: 5, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.2, 0.8, 0.4, 1],
          delay: 0.3,
          type: 'spring',
          damping: 10,
          stiffness: 40,
          mass: 0.3,
        }}
        className="max-w-3xl"
      >
        <p className="mt-6 text-base md:text-lg text-gray-200">
          MOSAIC (Monash Students for AI with Communities) is where cutting-edge technology meets social impact.
          Join a team that applies data science and human-centred computing to real-world challenges faced by
          marginalised communities.
        </p>
      </motion.div>
      <Link href="/projects">
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileHover={{ scale: 1.1, duration: 0.05 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            duration: 1,
            damping: 10,
            stiffness: 50,
          }}
          style={{ background: '#BDFF15' }}
          className="mt-8 bg-lime-400 text-[#0C1D45] px-6 py-3 rounded-full font-semibold hover:bg-lime-300 transition"
        >
          Explore projects
        </motion.button>
      </Link>
      <OctopusDecoration />
    </section>
  );
}
