import { expect, test } from '@playwright/test';
import { Home } from '../POM-DD-Approach/Home';

test.use({ storageState: 'auth.json' });

test.only('Assertion on HomePage', async ({ page }) => {
  const homePage = new Home(page);
  await homePage.navigateToHomePage();
  //await page.pause()
  await homePage.UpgradeIndustrialRobotics();
  await homePage.validationOnHomePage();
  await expect(page.locator('.single-widget')).toBeVisible();
  
  
});
