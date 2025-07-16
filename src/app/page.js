import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OctopusDecoration from '../components/OctopusDecoration';
import VisionSection from '../components/VisionSection';
import RecentProjects from '../components/RecentProjects';

export default function Home() {
  return (
    <main className="text-white bg-[#213359] snap-y snap-mandatory overflow-y-scroll h-screen">
      <Navbar />
      <Hero />
      <VisionSection />
      <RecentProjects />
    </main>
  );
}
