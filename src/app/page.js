import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OctopusDecoration from '../components/OctopusDecoration';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#213359] text-white relative flex flex-col items-center">
      <Navbar />
      <Hero />
      <OctopusDecoration />
    </main>
  );
}
