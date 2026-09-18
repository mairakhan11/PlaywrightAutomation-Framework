class Login {

    constructor(page)
    {
        this.page=page;
        this.userEmail=page.locator("[data-qa='login-email']");
        this.pass = page.locator("[data-qa='login-password']");
        this.loginButton = page.locator("[data-qa='login-button']");
    }
    async goTo()
    {
        await this.page.goto("https://automationexercise.com/login");

    }

    async validLogin(username, password)
    {
    await this.page.locator("[data-qa='login-email']").fill("");
    await this.page.locator("[data-qa='login-email']").fill(username);
    await this.page.locator("[data-qa='login-password']").fill("")
    await this.page.locator("[data-qa='login-password']").fill(password);
    await this.page.locator("[data-qa='login-button']").click();
    }
}

module.exports = {Login}