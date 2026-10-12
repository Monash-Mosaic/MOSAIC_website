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
    <div
      id="partners"
      className="
        relative
        isolate
        flex
        min-h-screen
        w-full
        flex-col
        overflow-hidden
        bg-navy
        snap-start
        py-14
      "
    >
      {/* Background Particles */}
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
            text-[clamp(2.5rem,3.5vw,7.5rem)]
            font-semibold
            leading-tight
            text-[#FCFCFC]
          "
        >
          Partnerships
        </h2>

        <p
          className="
            font-inter
            text-[clamp(0.95rem,1.4vw,2.5rem)]
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
          flex-1
          w-full
          items-center
          justify-center
          px-6
          sm:px-12
          lg:px-28
          pb-10
          pt-12
        "
      >
        <div
          className="
            flex
            w-full
            max-w-[140rem] 
            mx-auto
            flex-row
            flex-wrap
            items-stretch
            justify-center
            gap-[clamp(1.5rem,2vw,3rem)]
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
                {/* White Logo Container (Height scales with viewport width for 4K) */}
                <div
                  className="
                    flex
                    w-fit
                    flex-1
                    items-center
                    justify-center
                    rounded-[1.25rem]
                    bg-[#FCFCFC]
                    px-[clamp(1.5rem,3vw,3rem)]
                    py-6
                    gap-5
                    min-h-[clamp(6rem,12vw,20rem)]
                  "
                >
                  {partner.logos.map((logo) => (
                    <a
                      key={logo.name}
                      href={logo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        flex-1
                        h-full
                        items-center
                        justify-center
                        min-w-0
                      "
                      aria-label={`Visit ${logo.name}`}
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="
                          block
                          h-auto
                          w-screen
                          max-h-[clamp(5rem,8rem,20rem)]
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

                {/* Description (Green Bar) */}
                <div
                  className="
                    flex
                    h-[clamp(3rem,3.3vw,5rem)]
                    shrink-0
                    items-center
                    justify-center
                    px-4
                  "
                >
                  <span
                    className="
                    text-center
                    font-['Fira_Code']
                    text-[clamp(0.875rem,1.2vw,1.75rem)]
                    font-semibold
                    leading-snug
                    text-ink
                  "
                  >
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
            font-['Fira_Code']
            text-[clamp(0.8rem,1.2vw,1.75rem)]
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
    </div>
  );
}
