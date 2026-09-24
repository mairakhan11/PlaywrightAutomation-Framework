import { expect, Page } from '@playwright/test';
import { gotoWithRetry } from './navigation';

export class Cart {
  private readonly verifyProduct;
  private readonly checkoutButton;
  private readonly addressDetails;
  private readonly billDetails;
  private readonly reviewOrder;
  private readonly cartInfo;

  constructor(private readonly page: Page) {
    this.verifyProduct = page.locator('.cart_description');
    this.checkoutButton = page.locator('.check_out');
    this.addressDetails = page.getByRole('heading', {
      name: 'Address Details',
      exact: true,
    });
    this.billDetails = page.locator('.checkout-information');
    this.reviewOrder = page.getByRole('heading', {
      name: 'Review Your Order',
      exact: true,
    });
    this.cartInfo = page.locator('#cart_info');
  }

  async goToCartPage(): Promise<void> {
    await gotoWithRetry(this.page, 'https://automationexercise.com/view_cart');
  }

  async validityOfProduct(productName: string): Promise<void> {
    await expect(this.verifyProduct.getByText(productName)).toBeVisible();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
    await expect(this.addressDetails).toBeVisible();
    console.log(await this.billDetails.textContent());
  }

  async orderReview(): Promise<void> {
    await expect(this.reviewOrder).toBeVisible();
    await expect(this.cartInfo).toBeVisible();
  }
}
