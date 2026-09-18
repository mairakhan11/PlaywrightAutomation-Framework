const { test, expect } = require('@playwright/test');
test.use({ storageState: 'auth.json' });
const {Home} = require('../POM-DD-Approach/Home')
test('Assertion on HomePage', async ({page})=>{

    const homePage = new Home(page);
    await homePage.navigateToHomePage();
    await homePage.validationOnHomePage();
    await expect(page.locator(".single-widget")).toBeVisible();
})
