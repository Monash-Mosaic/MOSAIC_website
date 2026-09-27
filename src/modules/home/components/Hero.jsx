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
      className="relative grid min-h-screen w-full shrink-0 snap-start grid-cols-1 text-ink md:min-h-[751px] md:grid-cols-2"
      style={dottedBackground}
    >
      <div className="flex flex-col pt-32 md:pt-48 xl:pt-[230px]">
        <ul className="flex gap-6 px-6 md:px-16 xl:gap-[34.35px] xl:pr-0 xl:pl-[54px]">
          {heroStats.map((stat) => (
            <li
              key={stat.label}
              className="flex size-24 flex-col items-center justify-center bg-navy font-mono font-semibold text-white md:size-28 xl:size-[105px]"
            >
              <span className="text-5xl leading-none md:text-6xl xl:translate-y-[9.5px] xl:text-[74px]">{stat.value}</span>
              <span className="text-sm md:text-base xl:text-[18.5px] xl:leading-none">{stat.label}</span>
            </li>
          ))}
        </ul>
        <img
          src="/HeroImage.png"
          alt="Halftone illustration of people working together"
          className="mt-auto w-full max-w-[42rem] pt-12 mix-blend-multiply xl:w-[668px]"
        />
      </div>

      <div className="flex flex-col justify-center border-[#101010] px-6 pt-12 pb-24 md:border-l-4 md:pt-24 md:pr-12 md:pl-[14%] xl:justify-start xl:border-l-[5px] xl:pt-[162px] xl:pr-0 xl:pb-0 xl:pl-[197px]">
        <h1 className="font-mono text-4xl leading-tight font-semibold md:text-5xl md:leading-[1.35] xl:max-w-[483px] xl:text-[52px] xl:leading-[normal]">
          Building Production-Ready Software &amp; AI Solutions For{' '}
          <span className="relative isolate whitespace-nowrap before:absolute before:-right-1.5 before:bottom-0 before:-left-1 before:-z-0 before:h-[0.385em] before:rounded-[10px] before:bg-lime/70">
            Social Good
          </span>
        </h1>
        <p className="mt-4 max-w-xl font-sans text-lg font-semibold md:text-[19.5px] xl:mt-1 xl:max-w-[483px] xl:leading-[normal]">
          We partner with global humanitarian organisations, research labs, and industry leaders to build
          high-impact software.
        </p>
        <Link
          href="/contact"
          className="mt-8 self-start rounded-md bg-lime px-5 py-2 font-mono text-3xl font-semibold transition-colors xl:mt-5.5 xl:flex xl:h-[59px] xl:w-[272px] xl:items-center xl:justify-center xl:rounded-[13px] xl:p-0 xl:text-[34px] duration-150 hover:bg-lime-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Get in touch
        </Link>
      </div>

      <Link
        href="#partners"
        className="absolute right-6 bottom-6 hidden items-center gap-1 rounded font-mono text-sm font-semibold tracking-widest uppercase xl:right-[44px] xl:bottom-6 xl:text-[16.4px] xl:tracking-normal hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink md:right-12 md:flex"
      >
        Scroll to partnerships <HiArrowDown aria-hidden="true" className="xl:size-[18px] xl:-translate-y-0.5" />
      </Link>
    </section>
  );
}
