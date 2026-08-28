'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_LINKS = [
  { href: '/team', label: 'Our team' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact us' },
];

export default function Navbar({ color = 'dark' }) {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  const isLight = color === 'light';
  const logoSource =
    pathname === '/'
      ? '/Primary_logo.png'
      : isLight
        ? '/Primary_Blue_Transparent.png'
        : '/Primary_logo.png';
  const headerBg = isLight ? 'bg-white' : 'bg-[#213359]';
  const navText = isLight ? 'text-[#213359]' : 'text-white';
  const mobileMenuBg = isLight ? 'bg-white border-b border-gray-200' : 'bg-[#213359]';
  const joinButtonClass =
    'border-2 border-[#213359] text-[#213359] bg-white hover:bg-[#213359]/10';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 0);
      setShow(!(currentScrollY > lastScrollY.current && currentScrollY > 80));
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 left-0 z-[999] ${headerBg} transition-transform duration-300 ${scrolled || isLight ? 'shadow-md' : ''} ${show ? 'translate-y-0' : '-translate-y-full'}`}
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

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 8, stiffness: 50 }}
          className="hidden md:flex"
        >
          <nav className={`flex items-center gap-8 ${navText} text-lg`}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-2 py-1${pathname === link.href ? ' font-bold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              className={`ml-2 rounded-full px-6 py-2 font-medium transition-colors duration-150 ${joinButtonClass}${pathname === '/join' ? ' font-bold' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400`}
            >
              Join us
            </Link>
          </nav>
        </motion.div>

        <button
          className={`md:hidden ${navText} text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {mobileOpen && (
        <div className={`md:hidden ${mobileMenuBg} ${navText} px-6 pb-6 pt-2 flex flex-col gap-4 text-lg shadow-lg`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-2 py-2${pathname === link.href ? ' font-bold' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/join"
            className={`block rounded-full px-6 py-2 font-medium transition-colors duration-150 ${joinButtonClass}${pathname === '/join' ? ' font-bold' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400`}
            onClick={() => setMobileOpen(false)}
          >
            Join us
          </Link>
        </div>
      )}
    </header>
  );
}
