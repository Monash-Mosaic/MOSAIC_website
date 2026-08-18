import Link from 'next/link';

const SOCIAL_LINKS = [
  { href: 'mailto:mosaic@monash.edu', src: '/email.png', alt: 'Email MOSAIC' },
  { href: 'https://www.instagram.com/mosaic.monash/', src: '/insta.png', alt: 'MOSAIC on Instagram' },
  {
    href: 'https://www.linkedin.com/company/mosaic-monash-student-team/posts/?feedView=all',
    src: '/link.png',
    alt: 'MOSAIC on LinkedIn',
  },
];

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-[#213359]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <img src="/monashxMosaic.png" alt="Monash x MOSAIC Logo" className="h-20 w-auto" />
            </Link>
          </div>

          <div className="flex space-x-6">
            {SOCIAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <img src={link.src} alt={link.alt} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
