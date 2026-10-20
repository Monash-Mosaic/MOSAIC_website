import { PageLayout } from '@/components';
import ProjectsList from './components/ProjectsList';

export default function ProjectsPage() {
  return (
    <PageLayout className="min-h-screen bg-white projects-page">
      <main className="pt-[var(--site-header)] pb-8 md:pb-16">
        <ProjectsList />
      </main>
    </PageLayout>
  );
}
