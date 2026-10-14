import { PageLayout } from '@/components';
import Hero from './components/Hero';
import RecentProjects from './components/RecentProjects';
import PartnershipsSection from './components/PartnershipsSection';
import ScrollJack from './components/ScrollJack';
import WhoWeAreSection from './components/WhoWeAreSection';

export default function HomePage() {
  return (
    <PageLayout
      as="main"
      offsetHeader={false}
      className="relative h-dvh w-full overflow-hidden bg-[#E3E3E3] text-white"
    >
      <ScrollJack>
        <Hero />
        <PartnershipsSection />
        <RecentProjects />
        <WhoWeAreSection />
      </ScrollJack>
    </PageLayout>
  );
}
