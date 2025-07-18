'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';



export default function Navbar({ color = 'light' }) {
  const textColor = color === 'dark' ? 'text-[#213359]' : 'text-white';
  const pathname = usePathname();

  // Define your logo sources based on routes
  const logoPaths = {
    '/': '/Primary_logo.png',
    '/join': '/Primary_Blue_Transparent.png',
    '/project': '/Primary_Blue_Transparent.png',
    '/contact': '/Primary_Blue_Transparent.png',
    // Add more routes as needed
  };

  // Fallback to primary logo if route not specified
  const logoSource = logoPaths[pathname] || '/Primary_logo.png';
  return (
    <header className="w-full flex justify-between items-center py-6 max-w-7xl mx-auto px-6">
      <div className={`text-2xl font-roboto ${textColor}`}>
        <Link href="/">
          <img src={logoSource} alt="MOSAIC logo" className="h-25 cursor-pointer" />
        </Link>
      </div>
      <nav className={`space-x-8 ${textColor} text-sm`}>
        <Link href="#team" className="hover:border-white hover:border-2 px-4 py-4 rounded-full transition-all duration-200 font-roboto">Our team</Link>
        <Link href="#projects" className="hover:border-white hover:border-2 px-4 py-4 rounded-full transition-all duration-200 font-roboto">Projects</Link>
        <Link href="/contact" className={`hover:border-white hover:border-2 px-4 py-4 rounded-full transition-all duration-200 font-roboto ${pathname === '/contact' ? 'font-bold underline underline-offset-8 decoration-lime-400' : ''}`}>Contact us</Link>
        <Link href="#join" className="hover:border-white hover:border-2 px-4 py-4 rounded-full transition-all duration-200 font-roboto">Join us</Link>
      </nav>
    </header>
  );
}
