import {Page, expect} from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async assertUrlContains(urlSubstring: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(urlSubstring));
  }

  async getAllTextContents(selector: string): Promise<string[]> {
    return this.page.locator(selector).allTextContents();
  }
}
