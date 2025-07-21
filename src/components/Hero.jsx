'use client';
import { motion } from 'framer-motion'
import OctopusDecoration from './OctopusDecoration';


export default function Hero() {
  return (

    <section className="relative min-h-screen snap-start flex flex-col justify-center items-center text-center px-6">
      <motion.h1
        style={{ color: '#BDFF15' }}
        initial={{ opacity: 0, y: -30, x: -5, scale: 0.95 }}  // Start above and invisible
        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}    // Slide down and fade in
        transition={{
          duration: 1.5,
          delay: 0.2,
          type: "spring",
          damping: 10,       // Lower = more bounciness (try 5-15)
          stiffness: 40,     // Lower = more fluid (try 40-100)
          mass: 0.5,         // Lower = faster movement
        }}
        className="text-4xl md:text-6xl font-extrabold"
      >
        AI for Social Impact
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -30, x: 5, scale: 0.95 }}  // Start above and invisible
        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}    // Slide down and fade in
        transition={{
          duration: 1.5,
          ease: [0.2, 0.8, 0.4, 1],  // Custom easing for "bouncy" fluidity
          delay: 0.3,
          type: "spring",
          damping: 10,       // Lower = more bounciness (try 5-15)
          stiffness: 40,     // Lower = more fluid (try 40-100)
          mass: 0.3,         // Lower = faster movement
        }}
      >
        <p className="mt-6 text-base md:text-lg text-gray-200">
          MOSAIC (Monash Students for AI with Communities) is where cutting-edge technology meets social impact.
          Join a team that applies data science and human-centred computing to real-world challenges faced by marginalised communities.
        </p>
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 30 }}  // Start above and invisible
        whileHover={{ scale: 1.1, duration: 0.05 }}
        animate={{ opacity: 1, y: 0 }}    // Slide down and fade in
        transition={{
          type: "spring",  // Bouncy spring animation
          duration: 1,
          damping: 10,     // Less bounciness
          stiffness: 50   // Snappier motion
        }}
        style={{ background: '#BDFF15' }} className="mt-8 bg-lime-400 text-[#0C1D45] px-6 py-3 rounded-full font-semibold hover:bg-lime-300 transition">
        Explore projects
      </motion.button>
      <OctopusDecoration />
    </section>

  );
}
