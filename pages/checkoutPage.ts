import { expect, Page } from '@playwright/test';

export class CheckoutPage {
	constructor(private page: Page) {}

	async assertCheckoutPage() {
		const checkoutPageUrl = this.page.url();
		await expect(this.page).toHaveURL(checkoutPageUrl);
		await expect(this.page.locator('.title')).toHaveText(
			'Checkout: Your Information'
		);
	}

	async assertOverviewPage() {
		const checkoutPageUrl = this.page.url();
		await expect(this.page).toHaveURL(checkoutPageUrl);
		await expect(this.page.locator('.title')).toHaveText(
			'Checkout: Overview'
		);
	}

	async fillCheckoutInfo(firstName: string, lastName: string, zip: string) {
		const firstNameField = this.page.locator('#first-name');
		const lastNameField = this.page.locator('#last-name');
		const zipField = this.page.locator('#postal-code');
		const continueButton = this.page.locator('#continue');

		await firstNameField.fill(firstName);
		await lastNameField.fill(lastName);
		await zipField.fill(zip);
		await continueButton.click();
	}

	async finishCheckout() {
		const finishButton = this.page.locator('#finish');
		await finishButton.click();
	}

	async assertOrderConfirmation() {
		const completeHeader = this.page.locator('.complete-header');
		const completeText = this.page.locator('.complete-text');

		await expect(completeHeader).toHaveText('Thank you for your order!');
		await expect(completeText).toHaveText(
			'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
		);
	}

	async assertErrorMessage(message: string) {
		const errorMessage = this.page.locator('.error-message-container');
		await expect(errorMessage).toHaveText(message);
	}

	async assertOrderSummary(
		itemName: string,
		itemPrice: number,
		itemQuantity: string
	) {
		const itemNameElement = this.page.locator('.inventory_item_name');
		const itemPriceElement = this.page.locator('.inventory_item_price');
		const itemQuantityElement = this.page.locator('.cart_quantity');

		await expect(itemNameElement).toHaveText(itemName);
		await expect(itemPriceElement).toHaveText(`$${itemPrice.toFixed(2)}`);
		await expect(itemQuantityElement).toHaveText(itemQuantity);
	}
}
