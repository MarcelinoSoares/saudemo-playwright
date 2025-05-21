import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page object for the checkout pages of the Sauce Demo application.
 * 
 * This class provides methods to interact with the checkout process, including
 * filling out checkout information, verifying order details, completing the checkout,
 * and confirming order completion.
 * 
 * @example
 * ```typescript
 * // Create a new instance of the CheckoutPage
 * const checkoutPage = new CheckoutPage(page);
 * 
 * // Fill out the checkout information
 * await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
 * 
 * // Verify that we're on the checkout overview page
 * await checkoutPage.assertOverviewPage();
 * 
 * // Complete the checkout process
 * await checkoutPage.finishCheckout();
 * 
 * // Verify the order confirmation
 * await checkoutPage.assertOrderConfirmation();
 * ```
 */
export class CheckoutPage extends BasePage {
    // Selectors for elements on the checkout pages
    private readonly titleSelector = '.title';
    private readonly firstNameSelector = '#first-name';
    private readonly lastNameSelector = '#last-name';
    private readonly zipCodeSelector = '#postal-code';
    private readonly continueButtonSelector = '#continue';
    private readonly finishButtonSelector = '#finish';
    private readonly completeHeaderSelector = '.complete-header';
    private readonly completeTextSelector = '.complete-text';
    private readonly errorMessageSelector = '.error-message-container';
    private readonly itemNameSelector = '.inventory_item_name';
    private readonly itemPriceSelector = '.inventory_item_price';
    private readonly itemQuantitySelector = '.cart_quantity';

    /**
     * Creates an instance of CheckoutPage.
     * 
     * @param page - The Playwright Page object that will be used for interactions
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Assert that we are on the checkout information page.
     * 
     * This method verifies that the checkout information page is loaded by checking
     * that the page title is "Checkout: Your Information".
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
    async assertCheckoutPage(): Promise<void> {
        const currentUrl = this.page.url();
        await expect(this.page).toHaveURL(currentUrl);
        await this.assertElementText(this.titleSelector, 'Checkout: Your Information');
    }

    /**
     * Assert that we are on the checkout overview page.
     * 
     * This method verifies that the checkout overview page is loaded by checking
     * that the page title is "Checkout: Overview".
     * 
     * @example
     * ```typescript
     * // Fill out the checkout information
     * await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
     * 
     * // Verify that we're on the checkout overview page
     * await checkoutPage.assertOverviewPage();
     * ```
     */
    async assertOverviewPage(): Promise<void> {
        const currentUrl = this.page.url();
        await expect(this.page).toHaveURL(currentUrl);
        await this.assertElementText(this.titleSelector, 'Checkout: Overview');
    }

    /**
     * Fill out the checkout information form and proceed to the overview page.
     * 
     * This method fills in the first name, last name, and zip/postal code fields
     * on the checkout information page and clicks the Continue button to proceed
     * to the checkout overview page.
     * 
     * @param firstName - The first name to enter
     * @param lastName - The last name to enter
     * @param zip - The zip/postal code to enter
     * @example
     * ```typescript
     * // Fill out the checkout information with valid data
     * await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
     * 
     * // Verify that we're on the checkout overview page
     * await checkoutPage.assertOverviewPage();
     * 
     * // Fill out the checkout information with missing data
     * await checkoutPage.fillCheckoutInfo('', 'Doe', '12345');
     * 
     * // Verify that an error message is displayed
     * await checkoutPage.assertErrorMessage('Error: First Name is required');
     * ```
     */
    async fillCheckoutInfo(firstName: string, lastName: string, zip: string): Promise<void> {
        await this.fillField(this.firstNameSelector, firstName);
        await this.fillField(this.lastNameSelector, lastName);
        await this.fillField(this.zipCodeSelector, zip);
        await this.clickElement(this.continueButtonSelector);
    }

    /**
     * Complete the checkout process by clicking the Finish button.
     * 
     * This method clicks the Finish button on the checkout overview page to complete
     * the checkout process and navigate to the order confirmation page.
     * 
     * @example
     * ```typescript
     * // Fill out the checkout information
     * await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
     * 
     * // Complete the checkout process
     * await checkoutPage.finishCheckout();
     * 
     * // Verify the order confirmation
     * await checkoutPage.assertOrderConfirmation();
     * ```
     */
    async finishCheckout(): Promise<void> {
        await this.clickElement(this.finishButtonSelector);
    }

    /**
     * Assert that the order confirmation is displayed.
     * 
     * This method verifies that the order confirmation page is displayed by checking
     * for the presence of the "Thank you for your order!" header and the confirmation message.
     * 
     * @example
     * ```typescript
     * // Fill out the checkout information
     * await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
     * 
     * // Complete the checkout process
     * await checkoutPage.finishCheckout();
     * 
     * // Verify the order confirmation
     * await checkoutPage.assertOrderConfirmation();
     * ```
     */
    async assertOrderConfirmation(): Promise<void> {
        await this.assertElementText(this.completeHeaderSelector, 'Thank you for your order!');
        await this.assertElementText(
            this.completeTextSelector,
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
        );
    }

    /**
     * Assert that an error message is displayed.
     * 
     * This method verifies that an error message with the specified text is displayed
     * on the checkout page. It's useful for verifying validation errors when submitting
     * the checkout form with invalid or missing data.
     * 
     * @param message - The expected error message text
     * @example
     * ```typescript
     * // Fill out the checkout information with missing first name
     * await checkoutPage.fillCheckoutInfo('', 'Doe', '12345');
     * 
     * // Verify that the appropriate error message is displayed
     * await checkoutPage.assertErrorMessage('Error: First Name is required');
     * 
     * // Fill out the checkout information with missing last name
     * await checkoutPage.fillCheckoutInfo('John', '', '12345');
     * 
     * // Verify that the appropriate error message is displayed
     * await checkoutPage.assertErrorMessage('Error: Last Name is required');
     * ```
     */
    async assertErrorMessage(message: string): Promise<void> {
        await this.assertElementText(this.errorMessageSelector, message);
    }

    /**
     * Assert that the order summary is correct.
     * 
     * This method verifies that the order summary on the checkout overview page
     * displays the expected item name, price, and quantity.
     * 
     * @param itemName - The expected item name
     * @param itemPrice - The expected item price
     * @param itemQuantity - The expected item quantity
     * @example
     * ```typescript
     * // Add an item to the cart
     * await cartPage.addItemToCart('Sauce Labs Backpack');
     * 
     * // Navigate to the cart page and proceed to checkout
     * await cartPage.goToCart();
     * await cartPage.proceedToCheckout();
     * 
     * // Fill out the checkout information
     * await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
     * 
     * // Verify the order summary
     * await checkoutPage.assertOrderSummary('Sauce Labs Backpack', 29.99, '1');
     * ```
     */
    async assertOrderSummary(
        itemName: string,
        itemPrice: number,
        itemQuantity: string
    ): Promise<void> {
        await this.assertElementText(this.itemNameSelector, itemName);
        await this.assertElementText(this.itemPriceSelector, `$${itemPrice.toFixed(2)}`);
        await this.assertElementText(this.itemQuantitySelector, itemQuantity);
    }
}
