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
    <div id="projects" className="w-full">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pt-50 bg-[#D6DEFF] py-30 px-6 text-center snap-start w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <h2 className="text-4xl md:text-4xl font-extrabold text-[#4953A1] mb-12">#TODO RECENT PROJECTS</h2>
      </motion.section>
    </div>
  );
}
