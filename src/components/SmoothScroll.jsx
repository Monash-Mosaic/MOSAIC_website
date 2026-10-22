'use client';

import { cancelFrame, frame } from 'framer-motion';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') return undefined;

    const lenis = new Lenis({ autoRaf: false, anchors: true });
    const update = ({ timestamp }) => lenis.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
