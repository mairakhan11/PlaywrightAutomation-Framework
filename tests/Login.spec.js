const { test, expect } = require('@playwright/test');
const {Login} = require('../POM-DD-Approach/Login');
// const dataset = JSON.parse(JSON.stringify(require('../ExternalFile/login.json')));
const {DataManager} = require('../POM-DD-Approach/DataManager');

test('Login and save session', async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
     const dataManager = new DataManager('./Config/TestData.xlsx','LoginData');
     const data = await dataManager.getLoginData()
    const login = new Login(page);
    await login.goTo();
    await login.validLogin(data.username, data.password)

    await context.storageState({ path: 'auth.json' });
    
})