const { test, expect } = require('@playwright/test');
test.use({ storageState: 'auth.json' });
const {Cart} = require('../POM-DD-Approach/Cart')

test('Verify Cart Page ', async ({page})=>{

    const productName = 'Fancy Green Top';
    const cartPage = new Cart(page);
    await cartPage.goToCartPage();
    await cartPage.validityOfProduct(productName);
    await cartPage.checkout();
    await cartPage.OrderReview();
   
})