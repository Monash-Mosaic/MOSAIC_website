'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ color = 'light' }) {
  const textColor = color === 'dark' ? 'text-[#213359]' : 'text-white';
  const pathname = usePathname();
  return (
    <header className="w-full flex justify-between items-center py-6 max-w-7xl mx-auto px-6">
      <div className={`text-2xl font-roboto ${textColor}`}>
        <Link href="/">
          <img src="/Primary_logo.png" alt="MOSAIC logo" className="h-25 cursor-pointer" />
        </Link>
      </div>
      <nav className={`space-x-8 ${textColor} text-sm`}>
        <Link href="#team" className="hover:underline font-roboto">Our team</Link>
        <Link href="#projects" className="hover:underline font-roboto">Projects</Link>
        <Link href="/contact" className={`hover:underline font-roboto ${pathname === '/contact' ? 'font-bold underline underline-offset-8 decoration-lime-400' : ''}`}>Contact us</Link>
        <Link href="#join" className="hover:underline font-roboto">Join us</Link>
      </nav>
    </header>
  );
}
