import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page object for the cart page of the Sauce Demo application.
 * 
 * This class provides methods to interact with the cart page, including
 * adding items to the cart, removing items, verifying cart contents, and
 * proceeding to checkout.
 * 
 * @example
 * ```typescript
 * // Create a new instance of the CartPage
 * const cartPage = new CartPage(page);
 * 
 * // Add an item to the cart
 * await cartPage.addItemToCart('Sauce Labs Backpack');
 * 
 * // Go to the cart page
 * await cartPage.goToCart();
 * 
 * // Verify that the item was added
 * await cartPage.assertItemAdded('Sauce Labs Backpack');
 * 
 * // Proceed to checkout
 * await cartPage.proceedToCheckout();
 * ```
 */
export class CartPage extends BasePage {
    // Selectors for elements on the cart page
    private readonly titleSelector = '.title';
    private readonly cartBadgeSelector = '.shopping_cart_badge';
    private readonly cartLinkSelector = '.shopping_cart_link';
    private readonly cartItemsSelector = '.cart_item';
    private readonly checkoutButtonSelector = '#checkout';

    /**
     * Creates an instance of CartPage.
     * 
     * @param page - The Playwright Page object that will be used for interactions
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Assert that we are on the cart page.
     * 
     * This method verifies that the cart page is loaded by checking for the presence
     * of the "Your Cart" title.
     * 
     * @example
     * ```typescript
     * // Navigate to the cart page
     * await cartPage.goToCart();
     * 
     * // Verify that we're on the cart page
     * await cartPage.assertCartPage();
     * ```
     */
    async assertCartPage(): Promise<void> {
        await this.assertElementText(this.titleSelector, 'Your Cart');
    }

    /**
     * Assert the number of items in the cart.
     * 
     * This method verifies that the cart badge displays the expected number of items.
     * It's useful for verifying that items have been added to or removed from the cart.
     * 
     * @param expectedItemCount - The expected number of items in the cart
     * @example
     * ```typescript
     * // Add an item to the cart
     * await cartPage.addItemToCart('Sauce Labs Backpack');
     * 
     * // Verify that the cart contains 1 item
     * await cartPage.assertCartItemCount(1);
     * 
     * // Add another item to the cart
     * await cartPage.addItemToCart('Sauce Labs Bike Light');
     * 
     * // Verify that the cart contains 2 items
     * await cartPage.assertCartItemCount(2);
     * ```
     */
    async assertCartItemCount(expectedItemCount: number): Promise<void> {
        const cartItemCount = this.getLocator(this.cartBadgeSelector);
        await expect(cartItemCount).toHaveText(`${expectedItemCount}`, {
            timeout: 10000,
        });
    }

    /**
     * Add an item to the cart.
     * 
     * This method finds an item with the specified name in the inventory and clicks
     * its "Add to cart" button. It assumes that we are on the inventory page.
     * 
     * @param itemName - The name of the item to add to the cart
     * @example
     * ```typescript
     * // Add the Sauce Labs Backpack to the cart
     * await cartPage.addItemToCart('Sauce Labs Backpack');
     * 
     * // Verify that the cart contains 1 item
     * await cartPage.assertCartItemCount(1);
     * ```
     */
    async addItemToCart(itemName: string): Promise<void> {
        const itemSelector = `.inventory_item:has-text("${itemName}")`;
        const item = await this.waitForElement(itemSelector);
        const addToCartButton = item.locator('button:has-text("Add to cart")');

        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();
    }

    /**
     * Navigate to the cart page.
     * 
     * This method clicks the cart icon to navigate to the cart page.
     * 
     * @example
     * ```typescript
     * // Add an item to the cart
     * await cartPage.addItemToCart('Sauce Labs Backpack');
     * 
     * // Navigate to the cart page
     * await cartPage.goToCart();
     * 
     * // Verify that we're on the cart page
     * await cartPage.assertCartPage();
     * ```
     */
    async goToCart(): Promise<void> {
        await this.clickElement(this.cartLinkSelector);
    }

    /**
     * Assert that an item has been added to the cart.
     * 
     * This method navigates to the cart page and verifies that an item with the specified
     * name is present in the cart.
     * 
     * @param itemName - The name of the item to check
     * @example
     * ```typescript
     * // Add an item to the cart
     * await cartPage.addItemToCart('Sauce Labs Backpack');
     * 
     * // Verify that the item was added to the cart
     * await cartPage.assertItemAdded('Sauce Labs Backpack');
     * ```
     */
    async assertItemAdded(itemName: string): Promise<void> {
        const itemSelector = `.inventory_item_name:has-text("${itemName}")`;

        await this.goToCart();
        const cartItem = await this.waitForElement(itemSelector, 10000);
        await expect(cartItem).toHaveText(itemName);
    }

    /**
     * Remove an item from the cart.
     * 
     * This method finds an item with the specified name in the cart and clicks
     * its "Remove" button. It assumes that we are on the cart page and the item
     * is in the cart.
     * 
     * @param itemName - The name of the item to remove from the cart
     * @example
     * ```typescript
     * // Add an item to the cart
     * await cartPage.addItemToCart('Sauce Labs Backpack');
     * 
     * // Navigate to the cart page
     * await cartPage.goToCart();
     * 
     * // Remove the item from the cart
     * await cartPage.removeItem('Sauce Labs Backpack');
     * 
     * // Verify that the item was removed
     * await cartPage.assertItemRemoved('Sauce Labs Backpack');
     * ```
     */
    async removeItem(itemName: string): Promise<void> {
        const formattedItemName = itemName.toLowerCase().replace(/\s+/g, '-');
        const removeButtonSelector = `[data-test="remove-${formattedItemName}"]`;

        const removeButton = await this.waitForElement(removeButtonSelector);
        await removeButton.click();

        // Verify the button is no longer visible
        const locator = this.getLocator(removeButtonSelector);
        await expect(locator).not.toBeVisible();
    }

    /**
     * Assert that the cart is empty.
     * 
     * This method verifies that there are no items in the cart.
     * It's useful for verifying that all items have been removed from the cart.
     * 
     * @example
     * ```typescript
     * // Add an item to the cart
     * await cartPage.addItemToCart('Sauce Labs Backpack');
     * 
     * // Navigate to the cart page
     * await cartPage.goToCart();
     * 
     * // Remove the item from the cart
     * await cartPage.removeItem('Sauce Labs Backpack');
     * 
     * // Verify that the cart is empty
     * await cartPage.assertCartIsEmpty();
     * ```
     */
    async assertCartIsEmpty(): Promise<void> {
        const cartItems = this.getLocator(this.cartItemsSelector);
        await expect(cartItems).toHaveCount(0);
    }

    /**
     * Assert that an item has been removed from the cart.
     * 
     * This method navigates to the cart page and verifies that an item with the specified
     * name is not present in the cart.
     * 
     * @param itemName - The name of the item to check
     * @example
     * ```typescript
     * // Add an item to the cart
     * await cartPage.addItemToCart('Sauce Labs Backpack');
     * 
     * // Navigate to the cart page
     * await cartPage.goToCart();
     * 
     * // Remove the item from the cart
     * await cartPage.removeItem('Sauce Labs Backpack');
     * 
     * // Verify that the item was removed
     * await cartPage.assertItemRemoved('Sauce Labs Backpack');
     * ```
     */
    async assertItemRemoved(itemName: string): Promise<void> {
        await this.goToCart();

        const itemSelector = `.inventory_item_name:has-text("${itemName}")`;
        const cartItem = this.getLocator(itemSelector);

        await expect(cartItem).not.toBeVisible();
        await expect(cartItem).toHaveCount(0);
    }

    /**
     * Proceed to checkout from the cart page.
     * 
     * This method clicks the "Checkout" button to navigate from the cart page
     * to the checkout information page.
     * 
     * @example
     * ```typescript
     * // Add an item to the cart
     * await cartPage.addItemToCart('Sauce Labs Backpack');
     * 
     * // Navigate to the cart page
     * await cartPage.goToCart();
     * 
     * // Proceed to checkout
     * await cartPage.proceedToCheckout();
     * 
     * // Verify that we're on the checkout information page
     * await checkoutPage.assertCheckoutPage();
     * ```
     */
    async proceedToCheckout(): Promise<void> {
        await this.clickElement(this.checkoutButtonSelector);
    }
}
