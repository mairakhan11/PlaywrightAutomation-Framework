import { defineConfig, devices } from '@playwright/test';

const MAXIMIZED_WINDOW = {
  viewport: null,
  deviceScaleFactor: undefined,
  launchOptions: {
    args: ['--start-maximized'],
    ignoreDefaultArgs: [
      '--disable-extensions',
      '--disable-component-extensions-with-background-pages',
    ],
  },
};

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  testIgnore: ['**/*.js', '**/example.spec.ts'],
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  timeout: 70 *1000,
  expect: {
    timeout: 70 * 1000,
  
  },
  reporter: 'html',
  use: {
    headless: !!process.env.CI,
    screenshot: 'on',
    trace: 'on-first-retry',
    navigationTimeout : 10000,
    actionTimeout: 15000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ...MAXIMIZED_WINDOW },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
//   name: 'edge',
//   use: { ...devices['Desktop Edge'] },
// },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  
});
