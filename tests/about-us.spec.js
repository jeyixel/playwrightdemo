import { test, expect } from '@playwright/test';

// UI test for About Us page

test.describe('About Us Page', () => {
  test('should display About Us content', async ({ page }) => {
    await page.goto('http://localhost:5173'); // Adjust port if needed
    await page.click('text=About Us');
    await expect(page.locator('.about-us h1')).toHaveText('About Us');
    await expect(page.locator('.about-us')).toContainText('Founded: 2026');
    await expect(page.locator('.about-us')).toContainText('Location: Demo City');
    await expect(page.locator('.about-us')).toContainText('Mission: Deliver quality demos');
  });
});
