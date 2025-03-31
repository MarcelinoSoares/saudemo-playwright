import { Page, expect } from '@playwright/test';

export class InventoryPage {
	constructor(private page: Page) {}

	async assertInventoryPage() {
		const titleElement = this.page.locator('.title');
		await expect(titleElement).toHaveText('Products');
	}

	async searchItemExistsInInventory(itemName: string) {
		const item = this.page.locator(
			`.inventory_item_name:has-text("${itemName}")`
		);
		await expect(item).toBeVisible();
	}

	async searchItem(itemName: string) {
		const searchInput = this.page.locator('#search_container');
		await expect(searchInput).toBeVisible();
		await searchInput.fill(itemName);
		await searchInput.press('Enter');
	}

	async assertItemInSearchResults(itemName: string) {
		const item = this.page.locator(
			`.inventory_item_name:has-text("${itemName}")`
		);
		await expect(item).toBeVisible();
	}

	async assertItemNotInSearchResults(itemName: string) {
		const item = this.page.locator(
			`.inventory_item_name:has-text("${itemName}")`
		);
		await expect(item).not.toBeVisible();
	}

	async selectProductSortOption(sortOption: string) {
		const sortDropdown = this.page.locator('.product_sort_container');
		await expect(sortDropdown).toBeVisible();
		await sortDropdown.selectOption(sortOption);
	}

	async verifyFirstItemInList(itemName: string) {
		const firstItem = this.page.locator('.inventory_item_name').first();
		await expect(firstItem).toHaveText(itemName);
	}

	async verifyFirstItemPrice(price: number) {
		const firstItemPrice = this.page.locator('.inventory_item_price').first();
		await expect(firstItemPrice).toHaveText(`$${price.toFixed(2)}`);
	}

	async backToProducts() {
		const backToProductsButton = this.page.locator('#back-to-products');
		await expect(backToProductsButton).toBeVisible();
		await backToProductsButton.click();
	}

	async clickOnInventoryItem(itemName: string) {
		const item = this.page.locator(
			`.inventory_item_name:has-text("${itemName}")`
		);
		await expect(item).toBeVisible();
		await item.click();
	}

	async verifyItemDetails(
		itemName: string,
		itemDescription: string,
		itemPrice: number
	) {
		const itemNameElement = this.page.locator('.inventory_details_name');
		const itemDescriptionElement = this.page.locator('.inventory_details_desc');
		const itemPriceElement = this.page.locator('.inventory_details_price');

		await expect(itemNameElement).toHaveText(itemName);
		await expect(itemDescriptionElement).toHaveText(itemDescription);
		await expect(itemPriceElement).toHaveText(`$${itemPrice.toFixed(2)}`);
	}

	async verifyItemDescriptions(
		expectedItems: { name: string; description: string }[]
	) {
		const itemNames = await this.page
			.locator('.inventory_item_name')
			.allTextContents();
		const itemDescriptions = await this.page
			.locator('.inventory_item_desc')
			.allTextContents();

		expect(itemNames).toEqual(expectedItems.map((item) => item.name));
		expect(itemDescriptions).toEqual(
			expectedItems.map((item) => item.description)
		);
	}

	async verifyItemPrices(expectedItems: { name: string; price: number }[]) {
		const itemNames = await this.page
			.locator('.inventory_item_name')
			.allTextContents();
		const itemPrices = await this.page
			.locator('.inventory_item_price')
			.allTextContents();

		const formattedPrices = itemPrices.map((price) =>
			parseFloat(price.replace('$', ''))
		);

		expect(itemNames).toEqual(expectedItems.map((item) => item.name));
		expect(formattedPrices).toEqual(expectedItems.map((item) => item.price));
	}
}
