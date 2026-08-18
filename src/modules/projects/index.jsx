import { PageLayout } from '@/components';
import { projects } from '@/data/projects';
import ProjectCard from './components/ProjectCard';

export default function ProjectsPage() {
  return (
    <PageLayout navbarColor="light" className="min-h-screen bg-white projects-page">
      <main className="py-32">
        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
