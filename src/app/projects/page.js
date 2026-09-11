import ProjectsPage from '@/modules/projects';
import { loadPageProjects } from '@/modules/projects/snapshot';

export const dynamic = 'force-static';

export default function Page() {
  return <ProjectsPage projects={loadPageProjects()} />;
}
