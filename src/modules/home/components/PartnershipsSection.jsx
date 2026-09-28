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

    // Reduced to 4500 - visually identical but significantly cheaper on the CPU
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

      // Group particles into opacity buckets to minimize canvas context switches
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
        // 3: 'rgba(109, 155, 239, 0.4)',
        // 4: 'rgba(109, 155, 239, 0.6)',
        3: 'rgba(109, 155, 239, 0.8)',
      };

      // Draw all particles of the same opacity at once (reduces draw calls from 8000 to 3)
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
        bg-[#213359]
        snap-start
        px-4
        py-14
        sm:px-6
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
      <div className=" relative z-10 ml-[44px] shrink-0">
        <h2
          className="
            font-mono
            text-[clamp(2.5rem,3.6vw,52.074px)]
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
            text-[clamp(0.95rem,1.35vw,19.52px)]
            font-semibold
            leading-6
            text-[#FCFCFC]
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
          items-center
          justify-center
          pb-10
          pt-8
        "
      >
        <div
          className="
            grid
            w-full
            max-w-[1231px]
            grid-cols-1
            items-center
            justify-items-center
            gap-8
            md:grid-cols-2
          "
        >
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`
                partner-float
                group
                w-fit
                max-w-[770px]
                overflow-hidden
                rounded-[20px]
                bg-[#B7FF00]
                transition-transform
                duration-500
                hover:-translate-y-2
                ${partners.length === 3 && index === 2 ? 'md:col-span-2' : ''}
              `}
              style={{
                animationDelay: `${index * -0.7}s`,
                animationDuration: `${3.5 + index * 0.4}s`,
              }}
            >
              {/* Logo container */}
              <div
                className="
                flex
                min-h-[140px]
                w-full
                max-w-full
                items-center
                justify-center
                gap-3
                overflow-hidden
                rounded-[20px]
                bg-[#FCFCFC]
                px-4
                py-5
                sm:min-h-[158px]
                sm:gap-6
                sm:px-8
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
                      min-w-0
                      max-w-full
                      flex-1
                      items-center
                      justify-center
                      overflow-hidden
                    "
                    aria-label={`Visit ${logo.name}`}
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="
                        block
                        h-auto
                        max-h-[90px]
                        max-w-full
                        w-auto
                        object-contain
                        transition-transform
                        duration-300
                        group-hover:scale-[1]
                        sm:max-h-[120px]
                      "
                    />
                  </a>
                ))}
              </div>

              {/* Description */}
              <p
                className="
                  flex
                  min-h-[42px]
                  items-center
                  justify-center
                  px-6
                  py-2
                  text-center
                  font-['Fira_Code']
                  text-[16.3774px]
                  font-semibold
                  leading-[21px]
                  text-[#1C1C1C]
                "
              >
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to Projects */}
      <Link
        href="#projects"
        className="
          absolute
          bottom-6
          right-6
          z-10
          flex
          items-center
          gap-2
          whitespace-nowrap
          font-['Fira_Code']
          text-[clamp(0.8rem,1.1vw,16px)]
          font-semibold
          leading-[21px]
          text-[#FCFCFC]
          hover:underline
        "
      >
        <span>SCROLL TO PROJECTS</span>
        <HiArrowDown aria-hidden="true" />
      </Link>
    </div>
  );
}
