import { test, expect } from '@playwright/test';

test('demonstrate basic UI assertions', async ({ page }) => {
  // Navigate to the local React app
  await page.goto('http://localhost:5173');

  // ASSERTION 1: Check if an element has specific text
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Quality Engineering Practice');

  // ASSERTION 2: Check if an input field is initially empty
  const usernameInput = page.locator('#username-input');
  await expect(usernameInput).toBeEmpty();

  // ASSERTION 3: Check if an element is visible on the screen
  const revealButton = page.locator('#reveal-btn');
  await expect(revealButton).toBeVisible();

  // ASSERTION 4: Verify element is NOT visible before an action
  const secretMessage = page.locator('#secret-message');
  await expect(secretMessage).not.toBeVisible();

  // Trigger the action
  await revealButton.click();

  // ASSERTION 5: Verify the element becomes visible after the action
  // Playwright will automatically wait for this to appear!
  await expect(secretMessage).toBeVisible();
  await expect(secretMessage).toHaveCSS('color', 'rgb(0, 128, 0)'); // checking the green style
});