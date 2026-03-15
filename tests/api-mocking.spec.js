import { test, expect } from '@playwright/test';

test.describe('API Mocking and Stubbing Tests', () => {
  
  test('Test 1: Mock successful API response and verify mocked data appears', async ({ page }) => {
    // Mock the API response before navigating
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 999,
          title: 'Mocked Title from Playwright',
          body: 'This is mocked data, not real API data!'
        })
      });
    });

    // Navigate to the app
    await page.goto('http://localhost:5173');

    // Click the fetch button
    const fetchButton = page.locator('#fetch-api-btn');
    await expect(fetchButton).toBeVisible();
    await fetchButton.click();

    // Wait for the result container to appear
    const resultContainer = page.locator('#api-result-container');
    await expect(resultContainer).toBeVisible();

    // Assert that the mocked data appears (not real data)
    await expect(resultContainer).toContainText('Mocked Title from Playwright');
    await expect(resultContainer).toContainText('This is mocked data, not real API data!');
    await expect(resultContainer).toContainText('ID: 999');

    // Verify error message does NOT appear
    const errorMessage = page.locator('#api-error-message');
    await expect(errorMessage).not.toBeVisible();
  });

  test('Test 2: Stub failed API response (500) and verify error message appears', async ({ page }) => {
    // Stub the API to return a 500 error
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    // Navigate to the app
    await page.goto('http://localhost:5173');

    // Click the fetch button
    const fetchButton = page.locator('#fetch-api-btn');
    await expect(fetchButton).toBeVisible();
    await fetchButton.click();

    // Wait for the error message to appear
    const errorMessage = page.locator('#api-error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('API request failed with status: 500');

    // Assert that the result container does NOT appear
    const resultContainer = page.locator('#api-result-container');
    await expect(resultContainer).not.toBeVisible();
  });

  test('Test 3: Abort the API request and verify error message appears', async ({ page }) => {
    // Abort the API request
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async route => {
      await route.abort('failed');
    });

    // Navigate to the app
    await page.goto('http://localhost:5173');

    // Click the fetch button
    const fetchButton = page.locator('#fetch-api-btn');
    await expect(fetchButton).toBeVisible();
    await fetchButton.click();

    // Wait for the error message to appear
    const errorMessage = page.locator('#api-error-message');
    await expect(errorMessage).toBeVisible();
    
    // The error message should contain information about the failed request
    // The actual error text may vary, but it should be visible
    await expect(errorMessage).toContainText('Error:');

    // Assert that the result container does NOT appear
    const resultContainer = page.locator('#api-result-container');
    await expect(resultContainer).not.toBeVisible();
  });
});
