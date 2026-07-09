import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './base-page';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly itemDescriptions: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly backToProductsButton: Locator;
  readonly detailName: Locator;
  readonly detailDescription: Locator;
  readonly detailPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.itemDescriptions = page.locator('.inventory_item_desc');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.backToProductsButton = page.locator('#back-to-products');
    this.detailName = page.locator('.inventory_details_name');
    this.detailDescription = page.locator('.inventory_details_desc');
    this.detailPrice = page.locator('.inventory_details_price');
  }

  async assertInventoryPage(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  async selectProductSortOption(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
  }

  async verifyFirstItemInList(itemName: string): Promise<void> {
    await expect(this.itemNames.first()).toHaveText(itemName);
  }

  async verifyLastItemInList(itemName: string): Promise<void> {
    await expect(this.itemNames.last()).toHaveText(itemName);
  }

  async verifyFirstItemPrice(price: number): Promise<void> {
    await expect(this.itemPrices.first()).toHaveText(`$${price.toFixed(2)}`);
  }

  async verifyProductCount(count: number): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(count);
  }

  async searchItemExistsInInventory(itemName: string): Promise<void> {
    await expect(
      this.page.locator(`.inventory_item_name:has-text("${itemName}")`),
    ).toBeVisible();
  }

  async clickOnInventoryItem(itemName: string): Promise<void> {
    await this.page
      .locator(`.inventory_item_name:has-text("${itemName}")`)
      .click();
  }

  async verifyItemDetails(
    itemName: string,
    itemDescription: string,
    itemPrice: number,
  ): Promise<void> {
    await expect(this.detailName).toHaveText(itemName);
    await expect(this.detailDescription).toHaveText(itemDescription);
    await expect(this.detailPrice).toHaveText(`$${itemPrice.toFixed(2)}`);
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }

  async verifyProductNamesOrder(expectedNames: string[]): Promise<void> {
    await expect(this.itemNames).toHaveText(expectedNames);
  }

  async verifyItemDescriptions(
    expectedItems: {name: string; description: string}[],
  ): Promise<void> {
    const itemNames = await this.itemNames.allTextContents();
    const itemDescriptions = await this.itemDescriptions.allTextContents();
    expect(itemNames).toEqual(expectedItems.map(item => item.name));
    expect(itemDescriptions).toEqual(
      expectedItems.map(item => item.description),
    );
  }

  async verifyItemPrices(
    expectedItems: {name: string; price: number}[],
  ): Promise<void> {
    const itemNames = await this.itemNames.allTextContents();
    const itemPrices = await this.itemPrices.allTextContents();
    const formattedPrices = itemPrices.map(price =>
      parseFloat(price.replace('$', '')),
    );
    expect(itemNames).toEqual(expectedItems.map(item => item.name));
    expect(formattedPrices).toEqual(expectedItems.map(item => item.price));
  }
}
