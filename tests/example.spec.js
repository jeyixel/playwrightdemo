// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// exercises
test('see if github button is available', async ({ page }) => {
  // go to the page first
  await page.goto('https://playwright.dev/');

  // check for the github
  await expect(page.getByRole('link', { name: 'Star microsoft/playwright on GitHub' })).toBeVisible();

  // check for the text "Chosen by companies and open source projects"
  await expect(page.getByText('Chosen by companies and open source projects')).toBeVisible();

  // check the browsers list
  await expect(page.getByRole('img', { name: 'Browsers (Chromium, Firefox,' })).toBeVisible();
});

// test to see if redirections work
test('see if they redirect you to vs code page', async ({ page }) => {
  // go to the page first
  await page.goto('https://playwright.dev/');

  // click the vs code page
  await page.getByRole('link', { name: 'VS Code' }).click();

  // after the click should see the title of vs code page
  await expect(page.getByRole('heading', { name: 'The open source AI code editor' })).toBeVisible();

});

