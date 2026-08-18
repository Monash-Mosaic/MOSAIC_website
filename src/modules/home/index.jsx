import { PageLayout } from '@/components';
import Hero from './components/Hero';
import RecentProjects from './components/RecentProjects';
import VisionSection from './components/VisionSection';

export default function HomePage() {
  return (
    <PageLayout
      as="main"
      navbarColor="dark"
      className="min-h-screen snap-y snap-mandatory bg-[#213359] text-white relative flex flex-col items-center overflow-y-scroll h-screen"
    >
      <Hero />
      <VisionSection />
      <RecentProjects />
    </PageLayout>
  );
}
