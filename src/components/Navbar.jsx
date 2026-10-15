'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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
const desktopContactButtonClass = `${contactButtonBase} flex h-[45px] w-[174px] items-center justify-center rounded-[10px]`;

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [useMenu, setUseMenu] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    const desktop = window.matchMedia('(min-width: 768px)');

    const measure = () => {
      const onHome = pathname === '/';
      const lineVisible = onHome && desktop.matches;
      if (!lineVisible) {
        setUseMenu(false);
        return;
      }

      const header = nav.parentElement;
      const paddingRight = header ? parseFloat(getComputedStyle(header).paddingRight) || 0 : 0;
      const available = window.innerWidth / 2 - paddingRight - 20;
      const overflows = nav.scrollWidth > available;
      setUseMenu(overflows);
      if (!overflows) setMobileOpen(false);
    };

    measure();
    const fontsReady = document.fonts?.ready;
    if (fontsReady) fontsReady.then(measure).catch(() => {});
    window.addEventListener('resize', measure);
    desktop.addEventListener('change', measure);

    return () => {
      window.removeEventListener('resize', measure);
      desktop.removeEventListener('change', measure);
    };
  }, [pathname]);

  const linkClass = (href) =>
    `rounded px-1 py-1 md:px-0 hover:underline underline-offset-8 decoration-2 decoration-lime ${focusRing}${pathname === href ? ' underline' : ''}`;

  return (
    <header className="absolute top-0 left-0 z-[999] w-full bg-transparent font-mono font-semibold text-ink">
      <div className="flex items-center justify-between px-6 py-2 md:pt-[17px] md:pr-9 md:pl-4">
        <Link href="/" className={`block rounded ${focusRing}`}>
          <Image
            src="/Primary_Blue_Transparent.png"
            alt="MOSAIC logo"
            width={204}
            height={80}
            loading="eager"
            className="h-20 w-auto md:h-14 md:w-[161px] md:object-cover"
          />
        </Link>

        <nav
          ref={navRef}
          aria-hidden={useMenu || undefined}
          className={
            useMenu
              ? 'pointer-events-none invisible absolute flex w-max items-center gap-12.5 text-[26px] leading-none'
              : 'mt-[11px] hidden items-center gap-12.5 text-[26px] leading-none md:flex'
          }
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <Link href={CONTACT_LINK.href} className={desktopContactButtonClass}>
            {CONTACT_LINK.label}
          </Link>
        </nav>

        <button
          className={`rounded text-3xl ${useMenu ? 'flex' : 'md:hidden'} ${focusRing}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          className={`flex flex-col gap-4 bg-white/90 px-6 pt-2 pb-6 text-lg shadow-lg backdrop-blur ${useMenu ? '' : 'md:hidden'}`}
        >
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
