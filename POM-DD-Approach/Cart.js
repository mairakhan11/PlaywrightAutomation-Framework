const { expect } = require('@playwright/test');
const { gotoWithRetry } = require('./navigation');

class Cart {
    constructor(page) {
        this.page = page;
        this.verifyProd = page.locator('.cart_description');
        this.checkoutButton = page.locator('.check_out');
        this.addressDetails = page.getByRole('heading', { name: 'Address Details', exact: true });
        this.billDetails = page.locator('.checkout-information');
        this.reviewOrder = page.getByRole('heading', { name: 'Review Your Order', exact: true });
        this.cartInfo = page.locator('#cart_info');
    }

    async goToCartPage() {
        await gotoWithRetry(this.page, 'https://automationexercise.com/view_cart');
    }

    async validityOfProduct(productName) {
        await expect(this.verifyProd.getByText(productName)).toBeVisible();
    }

    async checkout() {
        await this.checkoutButton.click();
        await expect(this.addressDetails).toBeVisible();
        const billInfo = await this.billDetails.textContent();
        console.log(billInfo);
    }

    async OrderReview() {
        await expect(this.reviewOrder).toBeVisible();
        await expect(this.cartInfo).toBeTruthy();
    }
}

module.exports = { Cart };