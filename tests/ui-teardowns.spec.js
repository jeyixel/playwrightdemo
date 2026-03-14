import { test, expect } from '@playwright/test';

// SETUP: This runs before EVERY single test in this file
test.beforeEach(async ({ page }) => {
  console.log('Setup: Navigating to the app...');
  await page.goto('http://localhost:5173');
});

// TEARDOWN: This runs after EVERY single test in this file
test.afterEach(async ({ page }) => {
  console.log('Teardown: Cleaning up local storage to reset state...');
  await page.evaluate(() => window.localStorage.clear());
});

test('demonstrate basic UI assertions', async ({ page }) => {
  // We no longer need page.goto() here! The Setup hook handled it.
  
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Quality Engineering Practice');

  const usernameInput = page.locator('#username-input');
  await expect(usernameInput).toBeEmpty();
});

test('demonstrate button visibility toggle', async ({ page }) => {
  // The Setup hook navigated to a fresh page for this test too.
  
  const revealButton = page.locator('#reveal-btn');
  const secretMessage = page.locator('#secret-message');
  
  await expect(secretMessage).not.toBeVisible();
  await revealButton.click();
  await expect(secretMessage).toBeVisible();
});