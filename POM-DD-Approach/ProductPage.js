const { test, expect } = require('@playwright/test');
class ProductPage{

    constructor(page)
    {
        this.page=page;
        this.productLink = page.locator(".navbar-nav [href='/products']")
        this.prod_item = page.locator(".features_items .productinfo p")
        this.product = page.locator(".product-image-wrapper");
        this.continueShopping = page.getByText("Continue Shopping")

        
    }

    async navigateToProduct()
    {
        await this.page.goto("https://automationexercise.com/");
        await this.productLink.click();
    }

    async verifyProductDetails()
    {
        await expect(this.prod_item.first()).toBeVisible();
        await this.prod_item.first().textContent();
        const allitems= await this.prod_item.allTextContents();
        console.log(await allitems);

    }
    async addTocart(productName)
    {
        const count = await this.product.count();
        for (let i = 0; i < count; i++) 
    {
            const selectedprod = this.product.nth(i);
            const name = (await selectedprod.locator("p").last().textContent()).trim();

            if (name === productName) 
        {
            await selectedprod.locator(".add-to-cart").first().click();
            await this.continueShopping.getByText("Continue Shopping").click();
            break;
        }
    }
}

}
module.exports={ProductPage}