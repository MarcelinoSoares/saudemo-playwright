import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './base-page';

export class LoginPage extends BasePage {
  readonly logo: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('.login_logo');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('.error-button');
  }

  async navigate(): Promise<void> {
    await super.navigate('/');
  }

  async assertLoginPage(): Promise<void> {
    await expect(this.logo).toHaveText('Swag Labs');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccess(): Promise<void> {
    await this.assertUrlContains('inventory');
  }

  async assertLoginError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }

  async dismissError(): Promise<void> {
    await this.errorCloseButton.click();
  }

  async assertErrorDismissed(): Promise<void> {
    await expect(this.errorMessage).not.toBeVisible();
  }
}
