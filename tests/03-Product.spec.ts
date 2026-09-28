import { expect, test } from '@playwright/test';
import path from 'node:path';
import { DataManager } from '../POM-DD-Approach/DataManager';
import { ProductPage } from '../POM-DD-Approach/ProductPage';

test.use({ storageState: 'auth.json' });

test('Verify All Products and Product Details', async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.navigateToProduct();
  await productPage.verifyProductDetails();

  const dataManager = new DataManager(
    path.resolve(process.cwd(), 'Config', 'TestData.xlsx'),
    'ProductData'
  );
  const productNames = await dataManager.getColumnValues('ProductName');
  const numberOfProducts = Math.random() < 0.5 ? 2 : 4;
  const selectedProducts = [...productNames]
    .sort(() => Math.random() - 0.5)
    .slice(0, numberOfProducts);

  for (const productName of selectedProducts) {
    await productPage.addToCart(productName);
  }

  await page.goto('https://automationexercise.com/view_cart');
  for (const productName of selectedProducts) {
    await expect(page.locator('.cart_description').getByText(productName)).toBeVisible();
  }
});
