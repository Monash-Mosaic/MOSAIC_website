'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { createContext, useContext, useRef } from 'react';

const ParallaxContext = createContext(null);

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
