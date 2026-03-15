import { test, expect } from '@playwright/test';

test.describe('Contact Us Page', () => {
  test('should display Contact Us content', async ({ page }) => {
    await page.goto('http://localhost:5173'); // Adjust port if needed
    await page.click('text=Contact Us');
    await expect(page.locator('.contact-us h1')).toHaveText('Contact Us');
    await expect(page.locator('.contact-us')).toContainText('Email: contact@demo.com');
    await expect(page.locator('.contact-us')).toContainText('Phone: +1-234-567-8900');
    await expect(page.locator('.contact-us')).toContainText('Address: 123 Demo Street, Demo City');
  });
});
