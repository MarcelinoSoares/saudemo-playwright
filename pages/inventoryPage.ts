import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page object for the inventory page of the Sauce Demo application.
 * 
 * This class provides methods to interact with the inventory page, including
 * searching for items, sorting products, verifying item details, and navigating
 * to product details pages.
 * 
 * @example
 * ```typescript
 * // Create a new instance of the InventoryPage
 * const inventoryPage = new InventoryPage(page);
 * 
 * // Assert that we are on the inventory page
 * await inventoryPage.assertInventoryPage();
 * 
 * // Search for an item
 * await inventoryPage.searchItem('Sauce Labs Backpack');
 * 
 * // Sort products by price (low to high)
 * await inventoryPage.selectProductSortOption('Price (low to high)');
 * ```
 */
export class InventoryPage extends BasePage {
    // Selectors for elements on the inventory page
    private readonly titleSelector = '.title';
    private readonly itemNameSelector = '.inventory_item_name';
    private readonly searchInputSelector = '#search_container';
    private readonly sortDropdownSelector = '.product_sort_container';
    private readonly itemPriceSelector = '.inventory_item_price';
    private readonly backToProductsButtonSelector = '#back-to-products';
    private readonly itemDetailsNameSelector = '.inventory_details_name';
    private readonly itemDetailsDescSelector = '.inventory_details_desc';
    private readonly itemDetailsPriceSelector = '.inventory_details_price';
    private readonly itemDescriptionSelector = '.inventory_item_desc';

    /**
     * Creates an instance of InventoryPage.
     * 
     * @param page - The Playwright Page object that will be used for interactions
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Assert that we are on the inventory page.
     * 
     * This method verifies that the inventory page is loaded by checking for the presence
     * of the "Products" title.
     * 
     * @example
     * ```typescript
     * // Verify that we're on the inventory page
     * await inventoryPage.assertInventoryPage();
     * ```
     */
    async assertInventoryPage(): Promise<void> {
        await this.assertElementText(this.titleSelector, 'Products');
    }

    /**
     * Check if an item exists in the inventory.
     * 
     * This method verifies that an item with the specified name exists in the inventory
     * by waiting for the element to be visible on the page.
     * 
     * @param itemName - The name of the item to check
     * @example
     * ```typescript
     * // Check if the Sauce Labs Backpack exists in the inventory
     * await inventoryPage.searchItemExistsInInventory('Sauce Labs Backpack');
     * ```
     */
    async searchItemExistsInInventory(itemName: string): Promise<void> {
        const selector = `.inventory_item_name:has-text("${itemName}")`;
        await this.waitForElement(selector);
    }

    /**
     * Search for an item in the inventory.
     * 
     * This method fills the search input field with the specified item name and
     * presses Enter to perform the search.
     * 
     * @param itemName - The name of the item to search for
     * @example
     * ```typescript
     * // Search for the Sauce Labs Backpack
     * await inventoryPage.searchItem('Sauce Labs Backpack');
     * 
     * // Search for a non-existent item
     * await inventoryPage.searchItem('Non-existent Product');
     * ```
     */
    async searchItem(itemName: string): Promise<void> {
        const searchInput = await this.waitForElement(this.searchInputSelector);
        await searchInput.fill(itemName);
        await searchInput.press('Enter');
    }

    /**
     * Assert that an item is in the search results.
     * 
     * This method verifies that an item with the specified name is present in the
     * search results by waiting for the element to be visible on the page.
     * 
     * @param itemName - The name of the item to check
     * @example
     * ```typescript
     * // Search for an item
     * await inventoryPage.searchItem('Sauce Labs Backpack');
     * 
     * // Verify that the item is in the search results
     * await inventoryPage.assertItemInSearchResults('Sauce Labs Backpack');
     * ```
     */
    async assertItemInSearchResults(itemName: string): Promise<void> {
        const selector = `.inventory_item_name:has-text("${itemName}")`;
        await this.waitForElement(selector);
    }

    /**
     * Assert that an item is not in the search results.
     * 
     * This method verifies that an item with the specified name is not present in the
     * search results by checking that the element is not visible on the page.
     * 
     * @param itemName - The name of the item to check
     * @example
     * ```typescript
     * // Search for a non-existent item
     * await inventoryPage.searchItem('Non-existent Product');
     * 
     * // Verify that the item is not in the search results
     * await inventoryPage.assertItemNotInSearchResults('Non-existent Product');
     * ```
     */
    async assertItemNotInSearchResults(itemName: string): Promise<void> {
        const selector = `.inventory_item_name:has-text("${itemName}")`;
        const locator = this.getLocator(selector);
        await expect(locator).not.toBeVisible();
    }

    /**
     * Select a product sort option from the dropdown.
     * 
     * This method selects the specified sort option from the product sort dropdown.
     * Available options include: 'Name (A to Z)', 'Name (Z to A)', 'Price (low to high)',
     * and 'Price (high to low)'.
     * 
     * @param sortOption - The sort option to select
     * @example
     * ```typescript
     * // Sort products by price (low to high)
     * await inventoryPage.selectProductSortOption('Price (low to high)');
     * 
     * // Sort products alphabetically
     * await inventoryPage.selectProductSortOption('Name (A to Z)');
     * ```
     */
    async selectProductSortOption(sortOption: string): Promise<void> {
        const sortDropdown = await this.waitForElement(this.sortDropdownSelector);
        await sortDropdown.selectOption(sortOption);
    }

    /**
     * Verify the first item in the list has the expected name.
     * 
     * This method checks that the first item in the inventory list has the expected name.
     * It's useful for verifying that sorting by name works correctly.
     * 
     * @param itemName - The expected name of the first item
     * @example
     * ```typescript
     * // Sort products alphabetically
     * await inventoryPage.selectProductSortOption('Name (A to Z)');
     * 
     * // Verify the first item is the Sauce Labs Backpack
     * await inventoryPage.verifyFirstItemInList('Sauce Labs Backpack');
     * ```
     */
    async verifyFirstItemInList(itemName: string): Promise<void> {
        const firstItem = this.getLocator(this.itemNameSelector).first();
        await expect(firstItem).toHaveText(itemName);
    }

    /**
     * Verify the price of the first item in the list.
     * 
     * This method checks that the first item in the inventory list has the expected price.
     * It's useful for verifying that sorting by price works correctly.
     * 
     * @param price - The expected price of the first item
     * @example
     * ```typescript
     * // Sort products by price (low to high)
     * await inventoryPage.selectProductSortOption('Price (low to high)');
     * 
     * // Verify the first item has the lowest price
     * await inventoryPage.verifyFirstItemPrice(7.99);
     * ```
     */
    async verifyFirstItemPrice(price: number): Promise<void> {
        const firstItemPrice = this.getLocator(this.itemPriceSelector).first();
        await expect(firstItemPrice).toHaveText(`$${price.toFixed(2)}`);
    }

    /**
     * Navigate back to the products page from a product detail page.
     * 
     * This method clicks the "Back to Products" button to return to the main inventory page
     * from a product detail page.
     * 
     * @example
     * ```typescript
     * // Click on a product to view its details
     * await inventoryPage.clickOnInventoryItem('Sauce Labs Backpack');
     * 
     * // Verify the product details
     * await inventoryPage.verifyItemDetails('Sauce Labs Backpack', 'carry.allTheThings()...', 29.99);
     * 
     * // Go back to the products page
     * await inventoryPage.backToProducts();
     * ```
     */
    async backToProducts(): Promise<void> {
        await this.clickElement(this.backToProductsButtonSelector);
    }

    /**
     * Click on an inventory item to view its details.
     * 
     * This method clicks on an item with the specified name to navigate to its detail page.
     * 
     * @param itemName - The name of the item to click
     * @example
     * ```typescript
     * // Click on the Sauce Labs Backpack to view its details
     * await inventoryPage.clickOnInventoryItem('Sauce Labs Backpack');
     * ```
     */
    async clickOnInventoryItem(itemName: string): Promise<void> {
        const selector = `.inventory_item_name:has-text("${itemName}")`;
        await this.clickElement(selector);
    }

    /**
     * Verify the details of an item on the product detail page.
     * 
     * This method checks that the product detail page displays the expected name,
     * description, and price for the item.
     * 
     * @param itemName - The expected name of the item
     * @param itemDescription - The expected description of the item
     * @param itemPrice - The expected price of the item
     * @example
     * ```typescript
     * // Click on a product to view its details
     * await inventoryPage.clickOnInventoryItem('Sauce Labs Backpack');
     * 
     * // Verify the product details
     * await inventoryPage.verifyItemDetails(
     *   'Sauce Labs Backpack',
     *   'carry.allTheThings() with the sleek, streamlined Sly Pack...',
     *   29.99
     * );
     * ```
     */
    async verifyItemDetails(
        itemName: string,
        itemDescription: string,
        itemPrice: number
    ): Promise<void> {
        await this.assertElementText(this.itemDetailsNameSelector, itemName);
        await this.assertElementText(this.itemDetailsDescSelector, itemDescription);
        await this.assertElementText(this.itemDetailsPriceSelector, `$${itemPrice.toFixed(2)}`);
    }

    /**
     * Verify the descriptions of all items in the inventory.
     * 
     * This method checks that all items in the inventory have the expected names and descriptions.
     * It's useful for verifying that the correct product information is displayed.
     * 
     * @param expectedItems - An array of objects containing the expected name and description for each item
     * @example
     * ```typescript
     * // Define the expected items
     * const expectedItems = [
     *   {
     *     name: 'Sauce Labs Backpack',
     *     description: 'carry.allTheThings() with the sleek, streamlined Sly Pack...'
     *   },
     *   {
     *     name: 'Sauce Labs Bike Light',
     *     description: 'A red light isn\'t the desired state in testing but it sure helps...'
     *   }
     * ];
     * 
     * // Verify all item descriptions
     * await inventoryPage.verifyItemDescriptions(expectedItems);
     * ```
     */
    async verifyItemDescriptions(
        expectedItems: { name: string; description: string }[]
    ): Promise<void> {
        const itemNames = await this.getAllTextContents(this.itemNameSelector);
        const itemDescriptions = await this.getAllTextContents(this.itemDescriptionSelector);

        expect(itemNames).toEqual(expectedItems.map((item) => item.name));
        expect(itemDescriptions).toEqual(
            expectedItems.map((item) => item.description)
        );
    }

    /**
     * Verify the prices of all items in the inventory.
     * 
     * This method checks that all items in the inventory have the expected names and prices.
     * It's useful for verifying that the correct pricing information is displayed.
     * 
     * @param expectedItems - An array of objects containing the expected name and price for each item
     * @example
     * ```typescript
     * // Define the expected items
     * const expectedItems = [
     *   { name: 'Sauce Labs Backpack', price: 29.99 },
     *   { name: 'Sauce Labs Bike Light', price: 9.99 },
     *   { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 }
     * ];
     * 
     * // Verify all item prices
     * await inventoryPage.verifyItemPrices(expectedItems);
     * ```
     */
    async verifyItemPrices(expectedItems: { name: string; price: number }[]): Promise<void> {
        const itemNames = await this.getAllTextContents(this.itemNameSelector);
        const itemPrices = await this.getAllTextContents(this.itemPriceSelector);

        const formattedPrices = itemPrices.map((price) =>
            parseFloat(price.replace('$', ''))
        );

        expect(itemNames).toEqual(expectedItems.map((item) => item.name));
        expect(formattedPrices).toEqual(expectedItems.map((item) => item.price));
    }
}
