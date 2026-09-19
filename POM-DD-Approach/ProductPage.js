const { expect } = require('@playwright/test');
const { gotoWithRetry } = require('./navigation');

class ProductPage {
    constructor(page) {
        this.page = page;
        this.productLink = page.locator(".navbar-nav [href='/products']");
        this.prod_item = page.locator('.features_items .productinfo p');
        this.product = page.locator('.product-image-wrapper');
    }

    async navigateToProduct() {
        await gotoWithRetry(this.page, 'https://automationexercise.com/');
        await this.productLink.click();
    }

    async verifyProductDetails() {
        await expect(this.prod_item.first()).toBeVisible();
        const allitems = await this.prod_item.allTextContents();
        console.log(allitems);
    }

    async addTocart(productName) {
        const count = await this.product.count();

        for (let i = 0; i < count; i++) {
            const selectedprod = this.product.nth(i);
            const name = (await selectedprod.locator('p').last().textContent()).trim();

            if (name === productName) {
                await selectedprod.locator('.add-to-cart').first().click({ force: true });
                const continueShopping = this.page.locator('button.close-modal:visible');
                if (await continueShopping.count()) {
                    await continueShopping.click();
                }
                break;
            }
        }
    }
}

module.exports = { ProductPage };