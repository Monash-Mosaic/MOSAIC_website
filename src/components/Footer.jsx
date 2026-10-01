import Image from 'next/image';
import Link from 'next/link';

const PAGE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#partners', label: 'Partners' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact Us' },
];

const SOCIAL_LINKS = [
  {
    href: 'https://www.linkedin.com/company/mosaic-monash-student-team/posts/?feedView=all',
    label: 'LinkedIn',
  },
  { href: 'https://www.instagram.com/mosaic.monash/', label: 'Instagram' },
];

const linkClass =
  'rounded hover:underline underline-offset-4 decoration-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink';

export default function Footer() {
  return (
    <footer className="w-full border-t border-navy bg-footer-lime font-mono text-ink">
      <div className="mx-auto flex flex-col items-center justify-between gap-6 px-6 py-5 md:flex-row xl:pt-[17px] xl:pr-[33px] xl:pb-[18px] xl:pl-[18px]">
        <Link href="/" className={`block shrink-0 ${linkClass}`}>
          <Image
            src="/Primary_Blue_Transparent.png"
            alt="MOSAIC logo"
            width={204}
            height={80}
            className="h-20 w-auto xl:h-14 xl:w-[161px] xl:object-cover"
          />
        </Link>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg font-semibold uppercase md:border-x-2 md:border-navy md:px-4 xl:box-content xl:w-[817px] xl:flex-nowrap xl:justify-between xl:gap-x-0 xl:text-[16.6px] xl:leading-[normal]"
        >
          {PAGE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`MOSAIC on ${link.label}`}
              className={linkClass}
            >
              [{link.label} <span aria-hidden="true">↗</span>]
            </a>
          ))}
          <span>©{new Date().getFullYear()}</span>
        </nav>
      </div>
    </footer>
  );
}
