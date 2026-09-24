import { Page } from '@playwright/test';
import { gotoWithRetry } from './navigation';

export class Home {
  private readonly homeHeading;
  private readonly categoryAccordion;

  constructor(private readonly page: Page) {
    this.homeHeading = page
      .getByText('Full-Fledged practice website for Automation Engineers', {
        exact: false,
      })
      .first();
    this.categoryAccordion = page.locator('#accordian');
  }

  async navigateToHomePage(): Promise<void> {
    await gotoWithRetry(this.page, 'https://automationexercise.com/');
  }

  async validationOnHomePage(): Promise<void> {
    await this.homeHeading.waitFor({ state: 'visible' });
  }

  async category(): Promise<void> {
    await this.categoryAccordion.getByRole('link', { name: ' Women' }).click();
    await this.categoryAccordion.getByRole('link', { name: ' Men ' }).click();
    await this.categoryAccordion.getByRole('link', { name: ' Kids ' }).click();
  }
}
