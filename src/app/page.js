import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import VisionSection from '../components/VisionSection';
import RecentProjects from '../components/RecentProjects';

export default function Home() {
  return (

    <main className="min-h-screen snap-y snap-mandatory bg-[#213359] text-white relative flex flex-col items-center overflow-y-scroll h-screen">
      <Navbar color="light" />
      <Hero />
      <VisionSection />
      <RecentProjects />
      <Footer/>
    </main>
  );
}
