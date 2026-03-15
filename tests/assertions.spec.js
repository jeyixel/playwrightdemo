import { test, expect } from '@playwright/test';

test('assertion', async({page})=>{

    await page.goto('http://localhost:5173/')
    await page.pause()

    await expect(page).toHaveTitle(/dummy-ui/);

    // check element is present or not
    await expect(page.getByRole('button', { name: 'Reveal Secret' })).toHaveCount(1)

    // elemet handler
    if(await page.$('text=Reveal Secret')){
        await page.locator('text=Reveal Secret').click()
    }

    // check elemet is hiddle or visible
    await expect(page.locator('text=Reveal Secret')).toBeVisible()
    await expect.soft(page.locator('text=Reveal Secret')).toBeHidden()

    //check elemet enable or disable
    await expect(page.locator('text=Reveal Secret')).toBeEnabled()
    await expect.soft(page.locator('text=Reveal Secret')).toBeDisabled()

    // check text
    await expect(page.locator('text=Quality Engineering Practice')).toHaveText('Quality Engineering Practice')
    await expect(page.locator('text=Quality Engineering Practice')).not.toHaveText('ABCD')

    await expect(page.getByRole('textbox', { name: 'Enter username' })).toHaveCount(1)

    if(await page.$('text=Enter username')){
        await page.locator('text=Enter username').click()
    }

    //visual validation with ss
    await expect(page).toHaveScreenshot()

    await expect(page.getByRole('button', { name: 'Fetch API Data' })).toHaveCount(1)

     if(await page.$('text=Fetch API Data')){
        await page.locator('text=Fetch API Data').click()
    }


});