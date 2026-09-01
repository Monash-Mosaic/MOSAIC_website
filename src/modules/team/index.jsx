import { PageLayout } from '@/components';
import AcademicAdvisors from './components/AcademicAdvisors';
import StudentTeam from './components/StudentTeam';
import TeamHero from './components/TeamHero';

export default function TeamPage() {
  return (
    <PageLayout as="main" navbarColor="transparent" className="min-h-screen bg-white">
      <TeamHero />
      <AcademicAdvisors />
      <StudentTeam />
    </PageLayout>
  );
}
