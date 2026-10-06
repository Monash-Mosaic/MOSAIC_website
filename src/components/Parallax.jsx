'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { createContext, useContext, useRef } from 'react';

const ParallaxContext = createContext(null);

/**
 * Tracks how far a section has scrolled through the viewport and shares that progress with the
 * ParallaxLayers inside it. With the default offset, progress runs from 0 (section top entering the
 * bottom of the viewport) to 1 (section bottom leaving the top), so 0.5 is the section centred.
 */
export function ParallaxSection({
  as: Tag = 'section',
  offset = ['start end', 'end start'],
  children,
  ...props
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  return (
    <ParallaxContext value={scrollYProgress}>
      <Tag ref={ref} {...props}>
        {children}
      </Tag>
    </ParallaxContext>
  );
}

/**
 * Moves vertically from y[0]px to y[1]px as its ParallaxSection's progress goes from 0 to 1.
 * A symmetric range like [60, -60] sits in its designed position when the section is centred.
 * Must be rendered inside a ParallaxSection. Stays still when the user prefers reduced motion.
 */
export function ParallaxLayer({ y: [from, to], className = '', style, children, ...props }) {
  const progress = useContext(ParallaxContext);
  const y = useTransform(progress, [0, 1], [from, to]);

  return (
    <motion.div
      className={`will-change-transform motion-reduce:transform-none! ${className}`}
      style={{ ...style, y }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
