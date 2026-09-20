const { test, expect } = require('@playwright/test');
const {Login} = require('../POM-DD-Approach/Login');
// const dataset = JSON.parse(JSON.stringify(require('../ExternalFile/login.json')));
//const {DataManager} = require('../POM-DD-Approach/DataManager');

test('Login and save session', async({browser})=>{

    
     //const dataManager = new DataManager('./Config/TestData.xlsx','LoginData');
    // const data = await dataManager.getLoginData()

    const credentialsJson = process.env.LOGIN_CREDENTIALS;
    if (!credentialsJson) {
    throw new Error('LOGIN_CREDENTIALS is not configured');
}
let credentials;

    try 
    {
    credentials = JSON.parse(credentialsJson);
    }
        catch 
        {
            throw new Error('LOGIN_CREDENTIALS must contain valid JSON');
        }

    if (!credentials.username || !credentials.password) 
        {
            throw new Error('LOGIN_CREDENTIALS must contain username and password');
        }
    
        const context = await browser.newContext();
        const page = await context.newPage();
        const login = new Login(page);
        await login.goTo();
        await login.validLogin(
            credentials.username,
            credentials.password);

        await context.storageState({ path: 'auth.json' });
    
})