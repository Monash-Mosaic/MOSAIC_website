import Link from 'next/link';
import { HiArrowDown } from 'react-icons/hi';
import { heroStats } from '../data';

const dottedBackground = {
  backgroundColor: '#ffffff',
  backgroundImage: 'radial-gradient(#b4bdf2 2px, transparent 2px)',
  backgroundSize: '16px 16px',
};

export default function Hero() {
  return (
    <section
      className="relative grid min-h-screen w-full shrink-0 snap-start grid-cols-1 text-ink md:min-h-[751px] md:grid-cols-2"
      style={dottedBackground}
    >
      <div className="flex flex-col pt-32 md:pt-48">
        <ul className="flex gap-6 px-6 md:px-16">
          {heroStats.map((stat) => (
            <li
              key={stat.label}
              className="flex size-24 flex-col items-center justify-center bg-navy font-mono text-white md:size-28"
            >
              <span className="text-5xl leading-none font-bold md:text-6xl">{stat.value}</span>
              <span className="text-sm md:text-base">{stat.label}</span>
            </li>
          ))}
        </ul>
        <img
          src="/HeroImage.png"
          alt="Halftone illustration of people working together"
          className="mt-auto w-full max-w-[42rem] pt-12"
        />
      </div>

      <div className="flex flex-col justify-center border-navy px-6 pt-12 pb-24 md:border-l-4 md:pt-24 md:pr-12 md:pl-[14%]">
        <h1 className="font-mono text-4xl leading-tight font-bold md:text-5xl md:leading-[1.35] lg:text-6xl">
          Building Production-Ready Software &amp; AI Solutions For{' '}
          <span className="box-decoration-clone bg-[linear-gradient(to_top,var(--color-lime)_0.25em,transparent_0.25em)]">
            Social Good
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-lg md:text-xl">
          We partner with global humanitarian organisations, research labs, and industry leaders to build
          high-impact software.
        </p>
        <Link
          href="/contact"
          className="mt-8 self-start rounded-md bg-lime px-5 py-2 font-mono text-3xl font-bold transition-colors duration-150 hover:bg-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Get in touch
        </Link>
      </div>

      <Link
        href="#partners"
        className="absolute right-6 bottom-6 hidden items-center gap-1 rounded font-mono text-sm tracking-widest uppercase hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink md:right-12 md:flex"
      >
        Scroll to partnerships <HiArrowDown aria-hidden="true" />
      </Link>
    </section>
  );
}
