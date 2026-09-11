import ProjectCard from './ProjectCard';

export default function ProjectsList({ projects = [] }) {
  if (projects.length === 0) {
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
