import { test, expect } from '@playwright/test';

// 1. SETUP: This runs BEFORE every single test
test.beforeEach(async ({ page }) => {
  console.log('Setup: Navigating to the application and logging in...');
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.locator('#username').fill('student');
  await page.locator('#password').fill('Password123');
  await page.locator('#submit').click();
});

// 2. TEARDOWN: This runs AFTER every single test
test.afterEach(async ({ page }) => {
  console.log('Teardown: Logging out and cleaning up...');
  await page.locator('.wp-block-button__link').click(); // Clicking Log out
});

// THE TESTS: Notice how they don't need login code!
test('Verify successful login redirects to secure area', async ({ page }) => {
  await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
});

test('Verify successful login displays success message', async ({ page }) => {
  const successMessage = page.locator('.post-title');
  await expect(successMessage).toHaveText('Logged In Successfully');
});