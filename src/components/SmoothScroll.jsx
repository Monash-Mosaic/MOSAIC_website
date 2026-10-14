'use client';

import { cancelFrame, frame } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false });
    // Step Lenis on framer-motion's frame loop so parallax layers read the eased
    // scroll position in the same frame it's applied, instead of one frame behind.
    const update = ({ timestamp }) => lenis.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
