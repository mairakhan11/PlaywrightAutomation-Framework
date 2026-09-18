class Home{
    constructor(page)
    {
        this.page=page;
        this.AutomationTS= page.locator("#slider-carousel [role='link']");
        this.text = page.locator("#slider-carousel .col-sm-6");
        this.closeslider = page.locator("#hd-close-button");
    }

    async navigateToHomePage()
    {
        await this.page.goto("https://automationexercise.com/");
    }

    async validationOnHomePage()
    {
        await this.AutomationTS.click();
        const Hometext= await this.text.first().textContent();
        console.log(Hometext);
        await this.closeslider.click();


    }
}
module.exports={Home}