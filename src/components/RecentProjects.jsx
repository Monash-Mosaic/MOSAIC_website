'use client';
import { motion } from 'framer-motion';
export default function RecentProjects() {


  const projects = [
    { delay: 0, title: 'International Federation of Red Cross', description: 'Imagine creating a web platform for the organisation that helps communities all over the world.', image: '/mos+ifrc.png' },
    { delay: 0.4, title: '⁠Nestle-In: Tackling Secondary Homelessnes', description: 'A Hackathon project that turned to a real life application for people who experience secondary and tertiary homelessness.', image: '/nestled.jpg' },
    { delay: 0.8, title: '⁠Aged Care: Supporting aged care workers', description: 'Co-designing solutions with and for people who transition from being active and independent to a new era of their lives.', image: '/agedCare.jpg' },

  ];


  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="pt-50  bg-[#D6DEFF] py-30 px-6 text-center snap-start w-full"
    >

      <h2 className="text-4xl md:text-4xl font-extrabold text-[#4953A1] mb-12">Recent projects</h2>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-3 max-w-8xl mx-auto">
        {projects.map((prj, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: prj.delay, damping: 10 }}
            key={i} className="rounded-lg p-6 max-w-6xl">
            <div className="w-full h-80 flex items-center justify-center mb-4 p-6">
              <span className="text-4xl text-gray-500"></span>
              <img src={prj.image} className=" h-50 md:h-60 w-auto border-[#6D92E2]/50 rounded-lg shadow-md " />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{prj.title}</h3>
            <p className="text-sm text-gray-600">
              {prj.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
