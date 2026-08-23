# Testing

Tests live in this directory and follow the same module split as `src/modules`.

```
tests/
  setup/         shared Vitest setup, Next/Framer mocks, render helpers
  fixtures/      reusable sample data (import via `@tests/...`)
  unit/          pure logic and hooks, grouped by module
  components/    React components, grouped by module (`shared` for Navbar/Footer)
  api/           App Router handlers
  e2e/           Playwright journeys per page
```

## Commands

```bash
npm test              # Vitest watch
npm run test:run      # Vitest once
npm run test:coverage # Vitest with coverage
npm run test:e2e      # Playwright (starts `next dev` unless a server is already running)
npm run test:all      # unit + e2e
```
