'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar({ color = 'light' }) {
  const pathname = usePathname();

  // Use a white or visible logo for dark backgrounds
  const logoPaths = {
    '/': color === 'dark' ? '/Primary_logo.png' : '/Primary_logo.png',
    '/join': color === 'dark' ? '/Primary_logo.png' : '/Primary_Blue_Transparent.png',
    '/project': color === 'dark' ? '/Primary_logo.png' : '/Primary_Blue_Transparent.png',
    '/contact': color === 'dark' ? '/Primary_logo.png' : '/Primary_Blue_Transparent.png',
  };
  const logoSource = logoPaths[pathname] || '/Primary_logo.png';

  // Set nav link color for dark/light backgrounds
  const navTextColor = color === 'dark' ? 'text-white' : 'text-[#213359]';

  return (
    <header className="w-full fixed top-0 left-0 z-[999] bg-[#213359] shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 8, stiffness: 100 }}
        >
          <div className="text-2xl">
            <Link href="/">
              <img src={logoSource} alt="MOSAIC logo" className="h-12 cursor-pointer" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 8, stiffness: 50 }}
        >
          <nav className="flex items-center gap-8 text-white text-lg">
            <Link href="#team" className="hover:underline underline-offset-4">Our team</Link>
            <Link href="#projects" className="hover:underline underline-offset-4">Projects</Link>
            <Link href="/contact" className={`hover:underline underline-offset-4${pathname === '/contact' ? ' font-bold' : ''}`}>Contact us</Link>
            <Link href="/join" className={`ml-2 border-2 border-[#213359] text-[#213359] bg-white rounded-full px-6 py-2 font-medium transition-colors duration-150 hover:bg-[#213359]/10${pathname === '/join' ? ' font-bold' : ''}`}>Join us</Link>
          </nav>
        </motion.div>
      </div>
    </header>
  );
} 