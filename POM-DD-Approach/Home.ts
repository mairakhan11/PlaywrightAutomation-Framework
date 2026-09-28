import{test,expect,Locator, Page} from'@playwright/test';
import { gotoWithRetry } from './navigation';

export class Home {
  homeHeading: Locator;
  categoryAccordion: Locator;
  upgradeIndustrialRobotics :Locator; 
  closeButton:Locator;
  page:Page;

  constructor(page: Page) {
    this.page = page;
    this.homeHeading = page
      .getByText('Full-Fledged practice website for Automation Engineers', {
        exact: false,
      })
      .first();
    this.categoryAccordion = page.locator('#accordian');
    this.upgradeIndustrialRobotics = page.locator('p').filter({ hasText: 'All QA engineers can use this website for automation practice',}).locator('[role="link"]');
    this.closeButton=page.locator('#hd-close-button')
  }
  async UpgradeIndustrialRobotics()
  {
    await this.upgradeIndustrialRobotics.click();
    await this.closeButton.click();

  }

  async navigateToHomePage() {
    await gotoWithRetry(this.page, 'https://automationexercise.com/');

  }

  async validationOnHomePage() {
    await this.homeHeading.waitFor({ state: 'visible' });
  }
}
