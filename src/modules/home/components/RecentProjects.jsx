'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import useProjects from '@/modules/projects/useProjects';

const AUTOPLAY_MS = 6000;

function useSlidesPerView() {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const update = () => setSlidesPerView(mediaQuery.matches ? 3 : 1);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return slidesPerView;
}

function chunkProjects(projects, size) {
  if (!projects.length) return [];

  const pages = [];
  for (let index = 0; index < projects.length; index += size) {
    pages.push(projects.slice(index, index + size));
  }
  return pages;
}

function formatDescription(description) {
  const text = description?.trim();
  if (!text) return '';
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function ProjectSlideCard({ project }) {
  return (
    <div className="rounded-lg p-1 md:p-6 max-w-6xl h-full">
      <div className="w-full h-50 md:h-70 flex items-center justify-center mb-4 p-6">
        {project.image ? (
          <img
            src={project.image}
            alt={project.previewTitle}
            referrerPolicy="no-referrer"
            className="h-40 md:h-60 w-auto max-w-full object-contain border-[#6D92E2]/50 rounded-lg shadow-md"
          />
        ) : (
          <div className="h-40 md:h-60 w-full max-w-xs rounded-lg bg-white/60" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.previewTitle}</h3>
      <p className="text-sm text-gray-600">{formatDescription(project.description)}</p>
    </div>
  );
}

function CarouselSkeleton() {
  return (
    <div className="grid gap-2 md:gap-10 grid-cols-1 md:grid-cols-3 max-w-8xl mx-auto">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-lg p-1 md:p-6 animate-pulse">
          <div className="w-full h-50 md:h-70 flex items-center justify-center mb-4 p-6">
            <div className="h-40 md:h-60 w-48 rounded-lg bg-white/70" />
          </div>
          <div className="h-5 w-2/3 mx-auto rounded bg-white/70 mb-3" />
          <div className="h-4 w-5/6 mx-auto rounded bg-white/60" />
        </div>
      ))}
    </div>
  );
}

export default function RecentProjects() {
  const { projects, loading, error } = useProjects();
  const slidesPerView = useSlidesPerView();
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  const pages = useMemo(() => chunkProjects(projects, slidesPerView), [projects, slidesPerView]);
  const pageCount = pages.length;
  const currentPage = pageCount === 0 ? 0 : Math.min(page, pageCount - 1);

  useEffect(() => {
    if (pageCount <= 1 || paused) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % pageCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [pageCount, paused, page]);

  const goTo = (nextPage) => {
    if (pageCount === 0) return;
    setPage((nextPage + pageCount) % pageCount);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="pt-50 bg-[#D6DEFF] py-30 px-6 text-center snap-start w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className="text-4xl md:text-4xl font-extrabold text-[#4953A1] mb-12">Recent projects</h2>

      {loading ? (
        <CarouselSkeleton />
      ) : error || projects.length === 0 ? (
        <p className="text-[#4953A1]">Projects will appear here soon.</p>
      ) : (
        <div className="max-w-8xl mx-auto" aria-roledescription="carousel" aria-label="Recent projects">
          <div
            className="overflow-hidden"
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              const delta = event.changedTouches[0].clientX - touchStartX.current;
              if (delta < -50) goTo(currentPage + 1);
              else if (delta > 50) goTo(currentPage - 1);
            }}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${currentPage * 100}%` }}
              transition={{ type: 'spring', stiffness: 70, damping: 18 }}
            >
              {pages.map((pageItems, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid gap-2 md:gap-10 grid-cols-1 md:grid-cols-3 w-full shrink-0 basis-full"
                  aria-hidden={pageIndex !== currentPage}
                >
                  {pageItems.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: project.delay, damping: 10 }}
                    >
                      <ProjectSlideCard project={project} />
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goTo(currentPage - 1)}
                className="rounded-full bg-white/80 p-2 text-[#4953A1] shadow-md hover:bg-white transition"
                aria-label="Previous projects"
              >
                <HiChevronLeft className="h-6 w-6" />
              </button>

              {pageCount > 8 ? (
                <span className="min-w-16 text-sm font-semibold text-[#4953A1]">
                  {currentPage + 1} / {pageCount}
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  {pages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === currentPage ? 'w-7 bg-[#4953A1]' : 'w-2.5 bg-[#4953A1]/35 hover:bg-[#4953A1]/60'
                      }`}
                      aria-label={`Go to project slide ${index + 1}`}
                      aria-current={index === currentPage}
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => goTo(currentPage + 1)}
                className="rounded-full bg-white/80 p-2 text-[#4953A1] shadow-md hover:bg-white transition"
                aria-label="Next projects"
              >
                <HiChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      )}
    </motion.section>
  );
}
