'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#partners', label: 'Partners' },
];

const CONTACT_LINK = { href: '/contact', label: 'Contact Us' };

const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-ink';
const contactButtonBase = `bg-lime transition-colors duration-150 hover:bg-lime-hover ${focusRing}`;
const contactButtonClass = `${contactButtonBase} rounded-md px-4 py-1.5`;
const desktopContactButtonClass = `${contactButtonBase} flex h-9 shrink-0 items-center justify-center rounded-[10px] px-3 text-[13px] lg:h-10 lg:px-4 lg:text-base xl:h-[45px] xl:w-[174px] xl:text-[22px] 2xl:text-[26px]`;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = (href) =>
    `rounded px-1 py-1 whitespace-nowrap md:px-0 hover:underline underline-offset-8 decoration-2 decoration-lime ${focusRing}${pathname === href ? ' underline' : ''}`;

  return (
    <header className="sticky top-0 z-[999] w-full bg-[#FCFCFC]/95 pt-[env(safe-area-inset-top)] font-mono font-semibold text-ink backdrop-blur md:absolute md:bg-transparent md:pt-0 md:backdrop-blur-none">
      <div className="flex items-center justify-between px-4 py-2 sm:px-6 md:pt-[17px] md:pr-9 md:pl-4">
        <Link href="/" className={`block shrink-0 rounded ${focusRing}`}>
          <Image
            src="/Primary_Blue_Transparent.png"
            alt="MOSAIC logo"
            width={204}
            height={80}
            loading="eager"
            className="h-14 w-auto sm:h-16 md:h-14 md:w-[161px] md:object-cover"
          />
        </Link>

        <button
          className={`rounded text-3xl md:hidden ${focusRing}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <div className="absolute top-0 right-0 hidden w-1/2 md:block">
        <nav className="flex max-w-full items-center justify-end gap-3 px-4 pt-[17px] pr-6 text-[13px] leading-none lg:gap-6 lg:text-lg xl:gap-10 xl:pr-9 xl:text-[22px] 2xl:gap-12.5 2xl:text-[26px]">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <Link href={CONTACT_LINK.href} className={desktopContactButtonClass}>
            {CONTACT_LINK.label}
          </Link>
        </nav>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-4 bg-white/95 px-4 pt-2 pb-6 text-lg shadow-lg backdrop-blur sm:px-6 md:hidden">
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
