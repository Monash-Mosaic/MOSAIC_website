import '@testing-library/jest-dom/vitest';
import React from 'react';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { mockUsePathname } from './next-mocks';

afterEach(() => {
  cleanup();
});

const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'whileHover',
  'whileTap',
  'whileInView',
  'viewport',
  'variants',
  'layout',
  'layoutId',
]);

function stripMotionProps(props) {
  const next = {};
  for (const [key, value] of Object.entries(props)) {
    if (!MOTION_PROPS.has(key)) {
      next[key] = value;
    }
  }
  return next;
}

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock('next/link', () => ({
  default({ href, children, ...props }) {
    return React.createElement('a', { href, ...props }, children);
  },
}));

vi.mock('framer-motion', () => {
  const motion = new Proxy(
    {},
    {
      get(_target, tag) {
        const Component = React.forwardRef(({ children, ...props }, ref) =>
          React.createElement(tag, { ...stripMotionProps(props), ref }, children),
        );
        Component.displayName = `motion.${String(tag)}`;
        return Component;
      },
    },
  );

  return {
    motion,
    AnimatePresence: ({ children }) => children,
  };
});

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}
