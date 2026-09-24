import { expect, Page } from '@playwright/test';
import { gotoWithRetry } from './navigation';

export class ProductPage {
  private readonly productLink;
  private readonly productItems;
  private readonly products;

  constructor(private readonly page: Page) {
    this.productLink = page.locator(".navbar-nav [href='/products']");
    this.productItems = page.locator('.features_items .productinfo p');
    this.products = page.locator('.product-image-wrapper');
  }

  async navigateToProduct(): Promise<void> {
    await gotoWithRetry(this.page, 'https://automationexercise.com/');
    await this.productLink.click();
  }

  async verifyProductDetails(): Promise<void> {
    await expect(this.productItems.first()).toBeVisible();
    console.log(await this.productItems.allTextContents());
  }

  async addToCart(productName: string): Promise<void> {
    const count = await this.products.count();

    for (let index = 0; index < count; index++) {
      const selectedProduct = this.products.nth(index);
      const productText = await selectedProduct.locator('p').last().textContent();
      const name = productText?.trim() ?? '';

      if (name === productName) {
        await selectedProduct.locator('.add-to-cart').first().click({ force: true });
        const continueShopping = this.page.locator('button.close-modal:visible');
        if (await continueShopping.count()) {
          await continueShopping.click();
        }
        return;
      }
    }
  }
}
