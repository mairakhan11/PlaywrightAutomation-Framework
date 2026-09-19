const { gotoWithRetry } = require('./navigation');

class Home {
    constructor(page) {
        this.page = page;
        this.homeHeading = page.getByText('Full-Fledged practice website for Automation Engineers', { exact: false }).first();
    }

    async navigateToHomePage() {
        await gotoWithRetry(this.page, 'https://automationexercise.com/');
    }

    async validationOnHomePage() {
        await this.homeHeading.waitFor({ state: 'visible' });
    }
}

module.exports = { Home };