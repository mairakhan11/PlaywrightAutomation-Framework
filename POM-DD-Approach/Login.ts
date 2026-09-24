import { Page } from '@playwright/test';
import { gotoWithRetry } from './navigation';

export class Login {
  private readonly userEmail;
  private readonly pass;
  private readonly loginButton;

  constructor(private readonly page: Page) {
    this.userEmail = page.locator("[data-qa='login-email']");
    this.pass = page.locator("[data-qa='login-password']");
    this.loginButton = page.locator("[data-qa='login-button']");
  }

  async goTo(): Promise<void> {
    await gotoWithRetry(this.page, 'https://automationexercise.com/login');
  }

  async validLogin(username: string, password: string): Promise<void> {
    await this.userEmail.fill(username);
    await this.pass.fill(password);
    await this.loginButton.click();
  }
}
