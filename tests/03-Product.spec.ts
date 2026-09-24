import { expect, test } from '@playwright/test';
import { ProductPage } from '../POM-DD-Approach/ProductPage';

test.use({ storageState: 'auth.json' });

test('Verify All Products and Product Details', async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.navigateToProduct();
  await productPage.verifyProductDetails();

  const productName = 'Fancy Green Top';
  await productPage.addToCart(productName);
  await page.goto('https://automationexercise.com/view_cart');
  await expect(page.locator('.cart_description').getByText(productName)).toBeVisible();
});
