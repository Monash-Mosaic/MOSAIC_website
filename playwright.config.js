import { defineConfig, devices } from '@playwright/test';

const port = process.env.PLAYWRIGHT_PORT || '3000';
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [['github'], ['html']] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Production in CI avoids Next.js blocking /_next chunks across localhost vs 127.0.0.1.
    command: isCI
      ? `npx next start --port ${port} --hostname localhost`
      : `npx next dev --turbopack --port ${port} --hostname localhost`,
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
