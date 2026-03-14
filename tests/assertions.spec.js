import { test, expect } from '@playwright/test';

test('assertion demo', async({page})=>{

    await page.goto('https://kitchen.applitools.com/')
    await page.pause()

    await expect(page).toHaveTitle(/The Kitchen/);

    // check element is present or not
    await expect(page.locator('text=The Kitchen')).toHaveCount(1)

    // elemet handler
    if(await page.$('text=The Kitchen')){
        await page.locator('text=The Kitchen').click()
    }

    // check elemet is hiddle or visible
    await expect(page.locator('text=The Kitchen')).toBeVisible()
    await expect.soft(page.locator('text=The Kitchen')).toBeHidden()

    //check elemet enable or disable
    await expect(page.locator('text=The Kitchen')).toBeEnabled()
    await expect.soft(page.locator('text=The Kitchen')).toBeDisabled()

    // check text
    await expect(page.locator('text=The Kitchen')).toHaveText('The Kitchen')
    await expect(page.locator('text=The Kitchen')).not.toHaveText('ABCD')

    //visual validation with ss
    await expect(page).toHaveScreenshot()

})