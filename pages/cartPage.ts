import { Page, expect } from '@playwright/test';

export class CartPage {
	constructor(private page: Page) {}

	async assertCartPage() {
		const titleElement = this.page.locator('.title');
		await expect(titleElement).toHaveText('Your Cart');
	}

	async assertCartItemCount(expectedItemCount: number) {
		const cartItemCount = this.page.locator('.shopping_cart_badge');
		await expect(cartItemCount).toHaveText(`${expectedItemCount}`, {
			timeout: 10000,
		});
	}

	async addItemToCart(itemName: string) {
		const item = this.page.locator(`.inventory_item:has-text("${itemName}")`);
		const addToCartButton = item.locator('button:has-text("Add to cart")');

		await expect(item).toBeVisible();
		await expect(addToCartButton).toBeVisible();
		await addToCartButton.click();
	}

	async goToCart() {
		const cartLink = this.page.locator('.shopping_cart_link');
		await expect(cartLink).toBeVisible();
		await cartLink.click();
	}

	async assertItemAdded(itemName: string) {
		const cartItem = this.page.locator(
			`.inventory_item_name:has-text("${itemName}")`
		);

		await this.goToCart();
		await expect(cartItem).toBeVisible({ timeout: 10000 });
		await expect(cartItem).toHaveText(itemName);
	}

	async removeItem(itemName: string) {
		const formattedItemName = itemName.toLowerCase().replace(/\s+/g, '-');
		const removeButton = this.page.locator(
			`[data-test="remove-${formattedItemName}"]`
		);

		await expect(removeButton).toBeVisible();
		await removeButton.click();
		await expect(removeButton).not.toBeVisible();
	}

	async assertCartIsEmpty() {
		const cartItems = this.page.locator('.cart_item');
		await expect(cartItems).toHaveCount(0);
	}

	async assertItemRemoved(itemName: string) {
		await this.goToCart();
		const cartItem = this.page.locator(
			`.inventory_item_name:has-text("${itemName}")`
		);
		await expect(cartItem).not.toBeVisible();
		await expect(cartItem).toHaveCount(0);
	}

	async proceedToCheckout() {
		const checkoutButton = this.page.locator('#checkout');
		await expect(checkoutButton).toBeVisible();
		await checkoutButton.click();
	}
}
