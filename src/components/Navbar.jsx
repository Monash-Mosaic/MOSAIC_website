'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/#partners', label: 'Partners' },
];

const CONTACT_LINK = { href: '/contact', label: 'Contact Us' };

const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#213359]';
const contactButtonClass = `rounded-md bg-[#D4F75A] px-4 py-1.5 text-[#213359] transition-colors duration-150 hover:bg-[#c5ec3f] ${focusRing}`;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = (href) =>
    `rounded px-1 py-1 hover:underline underline-offset-8 decoration-2 decoration-[#D4F75A] ${focusRing}${pathname === href ? ' underline' : ''}`;

  return (
    <header className="absolute top-0 left-0 z-[999] w-full bg-transparent font-mono text-[#213359]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <Link href="/" className={`block rounded ${focusRing}`}>
          <img src="/Primary_Blue_Transparent.png" alt="MOSAIC logo" className="h-20 w-auto" />
        </Link>

        <nav className="hidden items-center gap-10 text-xl tracking-wide md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <Link href={CONTACT_LINK.href} className={contactButtonClass}>
            {CONTACT_LINK.label}
          </Link>
        </nav>

        <button
          className={`text-3xl md:hidden ${focusRing} rounded`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-4 bg-white/90 px-6 pt-2 pb-6 text-lg shadow-lg backdrop-blur md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block ${linkClass(link.href)}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={CONTACT_LINK.href}
            className={`self-start ${contactButtonClass}`}
            onClick={() => setMobileOpen(false)}
          >
            {CONTACT_LINK.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
