import { PageLayout } from '@/components';
import Hero from './components/Hero';
import RecentProjects from './components/RecentProjects';
import PartnershipsSection from './components/PartnershipsSection';
import WhoWeAreSection from './components/WhoWeAreSection';

export default function HomePage() {
  return (
    <PageLayout
      as="main"
      offsetHeader={false}
      className="min-h-screen bg-[#E3E3E3] text-white relative flex flex-col items-center"
    >
      <Hero />
      <PartnershipsSection />
      <RecentProjects />
      <WhoWeAreSection />
    </PageLayout>
  );
}
