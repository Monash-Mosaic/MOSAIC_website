'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar({ color = 'light' }) {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 0);
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShow(false); // Hide on scroll down
      } else {
        setShow(true); // Show on scroll up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinks = [
    { href: '#team', label: 'Our team' },
    { href: '#projects', label: 'Projects' },
    { href: '/contact', label: 'Contact us' },
  ];

  return (
    <header
      className={`w-full sticky top-0 left-0 z-[999] bg-[#213359] transition-transform duration-300 ${scrolled ? 'shadow-md' : ''} ${show ? 'translate-y-0' : '-translate-y-full'}`}
      tabIndex={-1}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-0 px-6" style={{ minHeight: '5.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 8, stiffness: 100 }}
        >
          <div className="text-2xl mr-6 flex items-center h-full">
            <Link href="/" tabIndex={0} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded block h-full">
              <img src={logoSource} alt="MOSAIC logo" className="h-20 max-h-full w-auto cursor-pointer" />
            </Link>
          </div>
        </motion.div>

        {/* Desktop nav */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 8, stiffness: 50 }}
          className="hidden md:flex"
        >
          <nav className="flex items-center gap-8 text-white text-lg">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={`hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-2 py-1${pathname === link.href ? ' font-bold' : ''}`}>{link.label}</Link>
            ))}
            <Link href="/join" className={`ml-2 border-2 border-[#213359] text-[#213359] bg-white rounded-full px-6 py-2 font-medium transition-colors duration-150 hover:bg-[#213359]/10${pathname === '/join' ? ' font-bold' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400`}>Join us</Link>
          </nav>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#213359] px-6 pb-6 pt-2 flex flex-col gap-4 text-white text-lg shadow-lg">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={`block hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-2 py-2${pathname === link.href ? ' font-bold' : ''}`} onClick={() => setMobileOpen(false)}>{link.label}</Link>
          ))}
          <Link href="/join" className={`block border-2 border-[#213359] text-[#213359] bg-white rounded-full px-6 py-2 font-medium transition-colors duration-150 hover:bg-[#213359]/10${pathname === '/join' ? ' font-bold' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400`} onClick={() => setMobileOpen(false)}>Join us</Link>
        </div>
      )}
    </header>
  );
} 