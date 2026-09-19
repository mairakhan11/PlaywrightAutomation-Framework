const { gotoWithRetry } = require('./navigation');

class Login {
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator("[data-qa='login-email']");
        this.pass = page.locator("[data-qa='login-password']");
        this.loginButton = page.locator("[data-qa='login-button']");
    }

    async goTo() {
        await gotoWithRetry(this.page, 'https://automationexercise.com/login');
    }

    async validLogin(username, password) {
        await this.userEmail.fill('');
        await this.userEmail.fill(username);
        await this.pass.fill('');
        await this.pass.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { Login };