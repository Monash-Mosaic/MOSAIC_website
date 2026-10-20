import Image from 'next/image';
import Link from 'next/link';
import { HiArrowDown } from 'react-icons/hi';
import { heroStats } from '../data';

const dot = 'radial-gradient(circle, #C2CCFB 1.5px, transparent 2.5px)';

const dottedBackground = {
  backgroundColor: '#FCFCFC',
  backgroundImage: `${dot}, ${dot}`,
  backgroundSize: '24px 12px',
  backgroundPosition: '-10px -4px, 2px 2px',
};

export default function Hero() {
  return (
    <section
      id="top"
      data-scroll-section
      className="relative isolate flex w-full shrink-0 flex-col overflow-x-clip text-ink md:h-dvh md:max-h-dvh md:overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={dottedBackground} />

      <div className="grid w-full grid-cols-1 pt-[var(--site-header)] md:min-h-0 md:flex-1 md:grid-cols-2 md:grid-rows-1">
        <div className="flex flex-col md:min-h-0">
          <ul className="flex shrink-0 flex-wrap gap-3 px-4 sm:gap-4 sm:px-6 md:flex-nowrap md:gap-6 md:px-16 xl:gap-[34.35px] xl:pr-0 xl:pl-[54px]">
            {heroStats.map((stat) => (
              <li
                key={stat.label}
                className="flex size-[clamp(3.5rem,22vw,6.5rem)] flex-col items-center justify-center bg-navy font-mono font-semibold text-white md:size-[clamp(4.25rem,14vh,6.5rem)]"
              >
                <span className="text-[clamp(1.35rem,6vw,4.5rem)] leading-none md:text-[clamp(1.75rem,5vh,4.5rem)]">{stat.value}</span>
                <span className="text-[clamp(0.65rem,2.8vw,1.15rem)] leading-none md:text-[clamp(0.7rem,1.6vh,1.15rem)]">{stat.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 h-48 mix-blend-multiply sm:h-64 md:mt-auto md:h-auto md:min-h-0 md:flex-1">
            <Image
              src="/HeroImage.png"
              alt="Halftone illustration of people working together"
              width={668}
              height={364}
              preload
              className="h-full w-full object-contain object-left-bottom"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center px-4 py-8 sm:px-6 md:min-h-0 md:overflow-hidden md:border-l-4 md:border-[#101010] md:py-4 md:pr-12 md:pl-[14%] xl:border-l-[5px] xl:pr-16 xl:pl-[12%]">
          <h1 className="font-mono text-[clamp(1.45rem,4.4vh,3.25rem)] leading-tight font-semibold">
            Building Production-Ready Software &amp; AI Solutions For{' '}
            <span className="relative isolate whitespace-nowrap before:absolute before:-right-1.5 before:bottom-0 before:-left-1 before:-z-0 before:h-[0.25em] before:rounded-[10px] before:bg-lime/70">
              Social Good
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-[clamp(0.95rem,2.1vh,1.25rem)] leading-snug">
            We partner with global humanitarian organisations, research labs, and industry leaders to
            build high-impact software.
          </p>
          <Link
            href="/contact"
            className="mt-[clamp(0.75rem,2vh,1.5rem)] self-start rounded-md bg-lime px-5 py-2 font-mono text-[clamp(1.25rem,3vh,2.125rem)] font-semibold transition-colors duration-150 hover:bg-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Get in touch
          </Link>
        </div>
      </div>

      <a
        href="#partners"
        className="absolute right-6 bottom-4 z-10 hidden items-center gap-1 rounded font-mono text-sm font-semibold tracking-widest uppercase hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink md:flex xl:right-[44px]"
      >
        Scroll to partnerships <HiArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
