'use client';

import { motion } from 'framer-motion';

function ProjectContent({ project, index }) {
  const ButtonTag = project.link ? motion.a : motion.button;

  return (
    <>
      <div>
        <h2 className="mb-2 text-2xl font-bold break-words sm:text-3xl md:text-4xl" style={{ color: project.textColor }}>
          Project {index + 1}: {project.title}
        </h2>
        {project.subtitle ? (
          <h3
            className="text-xl md:text-2xl font-semibold mb-4"
            style={{ color: project.textColor, opacity: 0.8 }}
          >
            {project.subtitle}
          </h3>
        ) : null}
      </div>

      <p className="text-base leading-relaxed font-medium break-words sm:text-lg" style={{ color: project.textColor, opacity: 0.9 }}>
        {project.description}
      </p>

      <ButtonTag
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={project.link || undefined}
        target={project.link ? '_blank' : undefined}
        rel={project.link ? 'noopener noreferrer' : undefined}
        className="inline-block max-w-full rounded-full px-6 py-3 text-base font-bold shadow-lg transition-all duration-200 hover:shadow-xl sm:px-8 sm:text-lg"
        style={{
          backgroundColor: project.buttonColor,
          color: project.buttonTextColor,
        }}
        {...(project.link ? {} : { type: 'button' })}
      >
        Learn more
      </ButtonTag>
    </>
  );
}

function RightAlignedProject({ project, index }) {
  return (
    <div className="relative w-full overflow-x-clip">
      <div
        className="absolute top-0 right-0 hidden h-full w-1/2 rounded-l-3xl md:block"
        style={{ backgroundColor: project.bgColor }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="relative rounded-3xl py-5 md:rounded-l-3xl md:rounded-r-none md:py-12" style={{ backgroundColor: project.bgColor }}>
          <div className="flex flex-col items-stretch gap-6 px-4 md:flex-row md:items-center md:justify-end md:px-0">
            <div className="order-2 min-w-0 flex-1 space-y-6 md:order-1 md:pr-4 md:pl-16">
              <ProjectContent project={project} index={index} />
            </div>
            <div className="order-1 w-full shrink-0 md:order-2 md:w-auto md:pr-6">
              <img
                src={project.image}
                alt={`${project.title} project`}
                referrerPolicy="no-referrer"
                className="h-auto w-full rounded-3xl object-cover md:w-[32.5rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftAlignedProject({ project, index }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-11">
      <div className="overflow-hidden rounded-3xl" style={{ backgroundColor: project.bgColor }}>
        <div className="flex flex-col items-stretch gap-6 p-4 md:flex-row md:items-center md:p-0">
          <div className="w-full shrink-0 md:w-auto">
            <img
              src={project.image}
              alt={`${project.title} project`}
              referrerPolicy="no-referrer"
              className="h-auto w-full rounded-3xl object-cover md:w-[30rem]"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-6 md:py-8 md:pr-16 md:pl-4">
            <ProjectContent project={project} index={index} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.12, 0.6) }}
      className="w-full"
    >
      {project.imageAlign === 'right' ? (
        <RightAlignedProject project={project} index={index} />
      ) : (
        <LeftAlignedProject project={project} index={index} />
      )}
    </motion.div>
  );
}
