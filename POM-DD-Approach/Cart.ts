import{test,expect,Locator, Page} from'@playwright/test';
import { gotoWithRetry } from './navigation';

export class Cart {
  verifyProduct : Locator;
   checkoutButton: Locator
   addressDetails: Locator
  billDetails: Locator
  reviewOrder: Locator
   cartInfo: Locator
   page: Page;

  constructor( page: Page) {
    this.page = page;
    this.verifyProduct = page.locator('.cart_description');
    this.checkoutButton = page.locator('.check_out');
    this.addressDetails = page.getByRole('heading', {name: 'Address Details',exact: true,});
    this.billDetails = page.locator('.checkout-information');
    this.reviewOrder = page.getByRole('heading', {name: 'Review Your Order',exact: true,});
    this.cartInfo = page.locator('#cart_info');
  }

  async goToCartPage() {
    await gotoWithRetry(this.page, 'https://automationexercise.com/view_cart');
  }

  async validityOfProduct(productName: string) {
    await expect(this.verifyProduct.getByText(productName)).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
    await expect(this.addressDetails).toBeVisible();
    console.log(await this.billDetails.textContent());
  }

  async orderReview() {
    await expect(this.reviewOrder).toBeVisible();
    await expect(this.cartInfo).toBeVisible();
  }

  async OrderReview() {
    await this.orderReview();
  }
}
