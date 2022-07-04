import { expect, test } from '@playwright/test'

test('Home page title properly set', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Webstack Builders Company Website/)
})
