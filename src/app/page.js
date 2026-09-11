import HomePage from '@/modules/home';
import { loadPageProjects } from '@/modules/projects/snapshot';

export const dynamic = 'force-static';

export default function Page() {
  return <HomePage projects={loadPageProjects()} />;
}
