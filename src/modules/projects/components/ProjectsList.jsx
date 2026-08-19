'use client';

import useProjects from '@/modules/projects/useProjects';
import ProjectCard from './ProjectCard';

export default function ProjectsList() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="space-y-16 max-w-7xl mx-auto px-10">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="h-72 rounded-3xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || projects.length === 0) {
    return (
      <p className="text-center text-[#213359] text-lg">Projects will appear here soon.</p>
    );
  }

  return (
    <div className="space-y-16">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
