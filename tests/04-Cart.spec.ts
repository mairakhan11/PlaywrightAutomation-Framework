import { test } from '@playwright/test';
import { Cart } from '../POM-DD-Approach/Cart';

test.use({ storageState: 'auth.json' });

test('Verify Cart Page', async ({ page }) => {
  const productName = 'Fancy Green Top';
  const cartPage = new Cart(page);

  await cartPage.goToCartPage();
  await cartPage.validityOfProduct(productName);
  await cartPage.checkout();
  await cartPage.orderReview();
});
