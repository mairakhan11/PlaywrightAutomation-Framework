const { test, expect } = require('@playwright/test');
test.use({ storageState: 'auth.json' });
const {ProductPage} = require('../POM-DD-Approach/ProductPage')

test('Verify All Products and Product Details', async ({page})=>{

    const prod = new ProductPage(page);
    await prod.navigateToProduct();
    await prod.verifyProductDetails();    
    //const itemadded= await page.locator(".product-image-wrapper .add-to-cart").nth(4).click();
    const productName = 'Fancy Green Top';
    await prod.addTocart(productName);
// Go to Cart
// Assertion
await page.goto("https://automationexercise.com/view_cart")
await expect(page.locator(".cart_description").getByText(productName)).toBeVisible();
// await page.pause();
   
    
})