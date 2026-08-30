import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';

// Mock fetch for testing environment
global.fetch = jest.fn();

// Mock window.alert
global.alert = jest.fn();

// jsdom does not implement IntersectionObserver, which framer-motion's
// whileInView relies on.
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

// jsdom does not implement matchMedia, used by framer-motion's reduced-motion check.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// ref: https://nextjs.org/docs/app/guides/environment-variables#test-environment-variables
// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
