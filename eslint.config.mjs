import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig, globalIgnores } from 'eslint/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

// eslint-config-next 15 still ships eslintrc-style configs, so they are bridged
// into flat config here.
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = defineConfig([
  // Flat config only lints .js/.mjs/.cjs by default; the components are .jsx.
  { files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'] },
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('prettier'),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    'scripts/**',
    'node_modules/**',
    '.open-next/**',
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'public/**',
    'cloudflare-env.d.ts',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
