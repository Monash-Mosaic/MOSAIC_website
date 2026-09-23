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
  'rounded hover:underline underline-offset-4 decoration-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#213359]';

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-[#213359] bg-[#D4F75A] font-mono text-[#213359]">
      <div className="mx-auto flex flex-col items-center justify-between gap-6 px-6 py-5 md:flex-row">
        <Link href="/" className={`block shrink-0 bg-white ${linkClass}`}>
          <img src="/Primary_Blue_Transparent.png" alt="MOSAIC logo" className="h-20 w-auto" />
        </Link>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg font-bold uppercase tracking-wide md:border-x-2 md:border-[#213359] md:px-4"
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
