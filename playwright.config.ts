import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
import { cacheDir } from './scripts/build/paths'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './test/playwright',
  testMatch: '**/*.spec.ts',
  /** Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: `${cacheDir}/playwright/output/`,
  /** Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /** Run tests in files in parallel */
  fullyParallel: true,
  /** Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /** Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /** Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /**
   * Reporter to use. 'github' for GitHub Actions CI to generate annotations.
   * See https://playwright.dev/docs/test-reporters
   */
  reporter: process.env.CI
    ? 'github'
    : [['html', { outputFolder: `${cacheDir}/playwright/reports/` }]],
  /** Launch a development web server during the tests. */
  webServer: {
    command: 'TS_NODE_PROJECT="tsconfig.gulp.json" yarn gulp start',
    url: `http://localhost:${process.env.ELEVENTY_TESTING_SERVER_PORT}`,
    /** How long to wait for the process to start up and be available in milliseconds. */
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  /** Shared settings for all the projects below. */
  use: {
    /** Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /** Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${process.env.ELEVENTY_TESTING_SERVER_PORT}`,
    ignoreHTTPSErrors: true,
    /** Capture screenshot after each test failure, other options are 'on' and 'off'. */
    screenshot: 'only-on-failure',
    /** Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
  },
  /** Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    /** Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },
    /** Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: {
        channel: 'msedge',
      },
    },
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
      },
    },
  ],
}

export default config
