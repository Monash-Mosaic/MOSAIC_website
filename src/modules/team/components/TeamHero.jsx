'use client';

import { motion } from 'framer-motion';
import { heroImage } from '../data';

const FLOAT = {
  initial: { y: -8 },
  animate: { y: 8 },
  transition: { repeatType: 'mirror', duration: 3, repeat: Infinity },
};

export default function TeamHero() {
  return (
    <section className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden bg-[#213359] px-6 pb-24 pt-32 text-center">
      {heroImage ? (
        <img
          src={heroImage}
          alt="The MOSAIC team working together"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_25%,#31456f_0%,#213359_45%,#16233f_100%)]"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0B1531]/45" />

      <motion.img
        {...FLOAT}
        src="/Octopus_icon_green_1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[22%] w-16 md:w-24"
      />
      <motion.img
        {...FLOAT}
        transition={{ ...FLOAT.transition, duration: 3.6 }}
        src="/Octopus_icon_green_2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[18%] right-[12%] w-16 md:w-24"
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 1.2, damping: 12, stiffness: 45 }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-[#BDFF15] md:text-7xl">Meet our team</h1>
        <div className="mx-auto mt-5 h-0.5 w-full max-w-md bg-white/90" />
      </motion.div>
    </section>
  );
}
