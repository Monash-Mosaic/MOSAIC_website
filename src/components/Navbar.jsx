'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#partners', label: 'Partners' },
];

const CONTACT_LINK = { href: '/contact', label: 'Contact Us' };

const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-ink';
const contactButtonBase = `bg-lime transition-colors duration-150 hover:bg-lime-hover ${focusRing}`;
const contactButtonClass = `${contactButtonBase} rounded-full px-4 py-1.5`;
const desktopContactButtonClass = `${contactButtonBase} flex h-9 shrink-0 items-center justify-center rounded-full px-3 text-[13px] lg:h-10 lg:px-4 lg:text-base xl:h-11 xl:px-5 xl:text-[18px]`;

export default function Navbar() {
  const pathname = usePathname();
  const shellRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    const apply = () => {
      const header = shell.querySelector('header');
      if (!header) return;
      const top = parseFloat(getComputedStyle(shell).top) || 0;
      const height = Math.ceil(top + header.offsetHeight + 20);
      document.documentElement.style.setProperty('--site-header', `${height}px`);
    };

    apply();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(apply);
    observer?.observe(shell);
    window.addEventListener('resize', apply);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, [mobileOpen]);

  const linkClass = (href) =>
    `rounded-full px-2 py-1 whitespace-nowrap hover:underline underline-offset-8 decoration-2 decoration-lime ${focusRing}${pathname === href ? ' underline' : ''}`;

  return (
    <div
      ref={shellRef}
      className="pointer-events-none fixed top-3 right-0 left-0 z-[999] px-3 text-ink sm:top-4 sm:px-4"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-6xl">
        <header className="flex items-center justify-between gap-3 rounded-full border border-black/5 bg-white/90 px-3 py-1.5 font-mono font-semibold text-ink shadow-[0_10px_30px_rgba(16,16,16,0.12)] backdrop-blur-md sm:px-4">
          <Link
            href="/#top"
            className={`block shrink-0 rounded-full ${focusRing}`}
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/Primary_Blue_Transparent.png"
              alt="MOSAIC logo"
              width={204}
              height={80}
              loading="eager"
              className="h-11 w-auto sm:h-12 md:h-14 md:w-[161px] md:object-cover"
            />
          </Link>

          <div className="hidden min-w-0 w-1/2 justify-end md:flex">
            <nav className="flex max-w-full items-center justify-end gap-2 text-[13px] leading-none lg:gap-4 lg:text-base xl:gap-6 xl:text-[18px]">
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

          <button
            className={`rounded-full p-1 text-3xl md:hidden ${focusRing}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </header>

        {mobileOpen && (
          <nav className="mt-2 flex flex-col gap-3 rounded-3xl border border-black/5 bg-white/95 px-5 py-4 text-lg text-ink shadow-[0_10px_30px_rgba(16,16,16,0.12)] backdrop-blur-md md:hidden">
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
      </div>
    </div>
  );
}
