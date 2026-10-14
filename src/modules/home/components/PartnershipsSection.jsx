'use client';

import Link from 'next/link';
import { partners } from '../data';
import { HiArrowDown } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function PartnershipsSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const section = canvas.parentElement;
    if (!section) return;

    const PARTICLE_COUNT = 6500;

    const pseudoRandom = (seed) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    let animationFrameId;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const buckets = {
        1: [],
        2: [],
        3: [],
      };

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = pseudoRandom(i * 17.31) * rect.width;
        const y = pseudoRandom(i * 31.73) * rect.height;
        const size = 0.5 + pseudoRandom(i * 7.41) * 1.5;
        const opacityTier = (i % 3) + 1;
        buckets[opacityTier].push({ x, y, size });
      }

      const opacities = {
        1: 'rgba(109, 155, 239, 0.15)',
        2: 'rgba(109, 155, 239, 0.2)',
        3: 'rgba(109, 155, 239, 0.8)',
      };

      Object.entries(buckets).forEach(([tier, particles]) => {
        ctx.beginPath();
        ctx.fillStyle = opacities[tier];
        particles.forEach((p) => {
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        });
        ctx.fill();
      });
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(section);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="partners"
      data-scroll-section
      className="relative isolate flex h-dvh max-h-dvh w-full shrink-0 flex-col overflow-hidden bg-navy py-[clamp(1rem,4vh,3.5rem)]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      {/* Partnerships Text */}
      <div className="relative z-10 flex w-full flex-col px-6 shrink-0 sm:px-12 lg:px-24">
        <h2
          className="
            font-mono
            text-[clamp(2rem,8vh,4.5rem)]
            font-semibold
            leading-tight
            text-[#FCFCFC]
          "
        >
          Partnerships
        </h2>

        <p
          className="
            text-[clamp(0.9rem,2.2vh,1.35rem)]
            font-semibold
            leading-6
            text-[#FCFCFC]
            mt-2
            md:mt-4
          "
        >
          Building high-stakes software alongside global leaders and research labs.
        </p>
      </div>

      {/* Partners */}
      <div
        className="
          relative
          z-10
          flex
          min-h-0
          w-full
          flex-1
          items-center
          justify-center
          overflow-hidden
          px-6
          py-[clamp(0.75rem,2vh,2rem)]
          sm:px-12
          lg:px-28
        "
      >
        <div
          className="
            flex
            h-fit
            w-full
            max-w-[140rem]
            mx-auto
            flex-row
            flex-wrap
            items-start
            justify-center
            gap-[clamp(1.25rem,2vw,2.5rem)]
          "
        >
          {partners.map((partner, index) => {
            // Percentages ensure the 2-on-top, 1-on-bottom layout regardless of screen width
            const flexWidthClass =
              index === 0
                ? 'w-full md:w-[34%] lg:w-[35%]'
                : index === 1
                  ? 'w-full md:w-[62%] lg:w-[61%]'
                  : index === 2
                    ? 'w-full md:w-[50%] lg:w-[42%]'
                    : 'w-full';

            return (
              <div
                key={partner.id}
                className={`
                  partner-float
                  group
                  flex
                  flex-col
                  overflow-hidden
                  rounded-[1.25rem]
                  bg-lime
                  transition-transform
                  duration-500
                  hover:-translate-y-2
                  ${flexWidthClass}
                `}
                style={{
                  animationDelay: `${index * -0.7}s`,
                  animationDuration: `${3.5 + index * 0.4}s`,
                }}
              >
                <div
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-6
                    rounded-[1.25rem]
                    bg-[#FCFCFC]
                    px-[clamp(1.25rem,2.5vw,2.5rem)]
                    py-[clamp(1rem,2vh,1.75rem)]
                  "
                >
                  {partner.logos.map((logo) => (
                    <a
                      key={logo.name}
                      href={logo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 items-center justify-center"
                      aria-label={`Visit ${logo.name}`}
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="
                          block
                          h-[clamp(3.25rem,7vh,5.5rem)]
                          w-auto
                          max-w-full
                          object-contain
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />
                    </a>
                  ))}
                </div>

                <div className="flex shrink-0 items-center justify-center px-4 py-3">
                  <span className="text-center text-[clamp(0.8rem,1.4vh,1rem)] font-semibold leading-snug text-ink">
                    {partner.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll to Projects */}
      <div className="relative z-10 flex w-full justify-end px-6 sm:px-12 lg:px-24 mt-auto shrink-0 pb-6">
        <Link
          href="#projects"
          className="
            flex
            items-center
            gap-2
            whitespace-nowrap
            text-[clamp(0.8rem,1.4vh,1rem)]
            font-semibold
            leading-5.25
            text-[#FCFCFC]
            hover:underline
          "
        >
          <span>SCROLL TO PROJECTS</span>
          <HiArrowDown aria-hidden="true" className="w-[1em] h-[1em]" />
        </Link>
      </div>
    </section>
  );
}
