import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
      '@tests': path.resolve(rootDir, './tests'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup/vitest.setup.js'],
    include: ['tests/**/*.{test,spec}.{js,jsx}'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary', 'json'],
      reportOnFailure: true,
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/app/**/page.js',
        'src/app/**/layout.js',
        'src/app/globals.css',
      ],
    },
  },
});
