import { PageLayout } from '@/components';
import Hero from './components/Hero';
import RecentProjects from './components/RecentProjects';
import VisionSection from './components/VisionSection';

export default function HomePage() {
  return (
    <PageLayout
      as="main"
      offsetHeader={false}
      className="min-h-screen snap-y snap-mandatory bg-[#E3E3E3] text-white relative flex flex-col items-center overflow-y-scroll h-screen"
    >
      <Hero />
      <VisionSection />
      <RecentProjects />
    </PageLayout>
  );
}
