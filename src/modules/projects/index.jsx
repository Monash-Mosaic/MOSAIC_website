import { PageLayout } from '@/components';
import ProjectsList from './components/ProjectsList';

export default function ProjectsPage() {
  return (
    <PageLayout className="min-h-screen bg-white projects-page">
      <main className="py-32">
        <ProjectsList />
      </main>
    </PageLayout>
  );
}
