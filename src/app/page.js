import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OctopusDecoration from '../components/OctopusDecoration';
import VisionSection from '../components/VisionSection';
import RecentProjects from '../components/RecentProjects';

export default function Home() {
  return (

    <main className="min-h-screen bg-[#213359] text-white relative flex flex-col items-center">
      <Navbar color="light" />
      <Hero />
      <VisionSection />
      <RecentProjects />
    </main>
  );
}
