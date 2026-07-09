import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './base-page';

export class CheckoutPage extends BasePage {
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly errorMessage: Locator;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly itemQuantity: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.zipInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.finishButton = page.locator('#finish');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.errorMessage = page.locator('.error-message-container');
    this.itemName = page.locator('.inventory_item_name');
    this.itemPrice = page.locator('.inventory_item_price');
    this.itemQuantity = page.locator('.cart_quantity');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async assertCheckoutPage(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async assertOverviewPage(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async fillCheckoutInfo(
    firstName: string,
    lastName: string,
    zip: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipInput.fill(zip);
    await this.continueButton.click();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async assertOrderConfirmation(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    );
  }

  async assertErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }

  async assertOrderSummary(
    itemName: string,
    itemPrice: number,
    itemQuantity: string,
  ): Promise<void> {
    await expect(this.itemName).toHaveText(itemName);
    await expect(this.itemPrice).toHaveText(`$${itemPrice.toFixed(2)}`);
    await expect(this.itemQuantity).toHaveText(itemQuantity);
  }

  async assertTaxDisplayed(): Promise<void> {
    await expect(this.taxLabel).toBeVisible();
  }

  async assertTotalDisplayed(): Promise<void> {
    await expect(this.totalLabel).toBeVisible();
  }
}
