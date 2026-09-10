import { PageLayout } from '@/components';
import ProjectsList from './components/ProjectsList';

export default function ProjectsPage({ projects = [] }) {
  return (
    <PageLayout navbarColor="light" className="min-h-screen bg-white projects-page">
      <main className="py-32">
        <ProjectsList projects={projects} />
      </main>
    </PageLayout>
  );
}
