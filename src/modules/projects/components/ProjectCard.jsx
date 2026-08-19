'use client';

import { motion } from 'framer-motion';

function ProjectContent({ project, index }) {
  const ButtonTag = project.link ? motion.a : motion.button;

  return (
    <>
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: project.textColor }}>
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

      <p className="text-lg leading-relaxed font-medium" style={{ color: project.textColor, opacity: 0.9 }}>
        {project.description}
      </p>

      <ButtonTag
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={project.link || undefined}
        target={project.link ? '_blank' : undefined}
        rel={project.link ? 'noopener noreferrer' : undefined}
        className="inline-block px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
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
    <div className="relative w-full overflow-hidden">
      <div
        className="absolute top-0 right-0 w-1/2 h-full rounded-l-3xl"
        style={{ backgroundColor: project.bgColor }}
      />

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <div className="py-12 rounded-l-3xl relative" style={{ backgroundColor: project.bgColor }}>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-end">
            <div className="flex-1 space-y-6 pl-8 md:pl-65 pr-1 md:pr-1">
              <ProjectContent project={project} index={index} />
            </div>
            <div className="flex-shrink-0 pr-6">
              <img
                src={project.image}
                alt={`${project.title} project`}
                referrerPolicy="no-referrer"
                className="w-80 h-60 md:w-130 md:h-auto rounded-3xl object-cover"
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
    <div className="max-w-7xl mx-auto px-11">
      <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: project.bgColor }}>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex-shrink-0">
            <img
              src={project.image}
              alt={`${project.title} project`}
              referrerPolicy="no-referrer"
              className="w-80 h-60 md:w-[30rem] md:h-auto rounded-3xl object-cover"
            />
          </div>
          <div className="flex-1 space-y-6 pl-8 md:pl-1 pr-8 md:pr-60">
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
