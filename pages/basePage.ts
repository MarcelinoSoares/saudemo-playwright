import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class that provides common functionality for all page objects.
 * 
 * This class serves as a foundation for all page objects in the application,
 * implementing the Page Object Model (POM) design pattern. It encapsulates common
 * interactions with web elements and provides a clean API for test scripts.
 * 
 * All page-specific classes should extend this class to inherit common functionality
 * and maintain a consistent approach to page interactions.
 * 
 * @example
 * ```typescript
 * // Example of a page object extending BasePage
 * export class LoginPage extends BasePage {
 *   private readonly usernameSelector = '#user-name';
 *   
 *   async login(username: string, password: string): Promise<void> {
 *     await this.fillField(this.usernameSelector, username);
 *     // Additional login steps...
 *   }
 * }
 * ```
 */
export class BasePage {
  /**
   * Creates an instance of BasePage.
   * 
   * @param page - The Playwright Page object that will be used for interactions
   */
  constructor(protected page: Page) {}

  /**
   * Navigate to a specific URL.
   * 
   * This method navigates the browser to the specified URL. If a relative URL is provided,
   * it will be appended to the baseURL defined in the Playwright configuration.
   * 
   * @param url - The URL to navigate to (absolute or relative)
   * @example
   * ```typescript
   * // Navigate to the home page
   * await page.navigate('/');
   * 
   * // Navigate to a specific page
   * await page.navigate('/inventory.html');
   * ```
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get a locator for an element.
   * 
   * This method creates a Playwright Locator object that can be used to interact with
   * elements on the page. The locator is lazy, meaning it doesn't immediately search
   * for the element but rather describes how to find it when needed.
   * 
   * @param selector - The CSS or text selector for the element
   * @returns Locator object that can be used to interact with the element
   * @example
   * ```typescript
   * // Get a locator for a button
   * const button = this.getLocator('#submit-button');
   * 
   * // Use the locator to click the button
   * await button.click();
   * ```
   */
  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Wait for an element to be visible on the page.
   * 
   * This method waits for an element matching the selector to be visible on the page.
   * It throws an error if the element is not visible within the specified timeout.
   * 
   * @param selector - The CSS or text selector for the element
   * @param timeout - Optional timeout in milliseconds (defaults to Playwright's default timeout)
   * @returns Locator for the element that is now visible
   * @throws Error if the element is not visible within the timeout period
   * @example
   * ```typescript
   * // Wait for a notification to appear with default timeout
   * const notification = await this.waitForElement('.notification');
   * 
   * // Wait for a slow-loading element with extended timeout
   * const slowElement = await this.waitForElement('.slow-element', 30000);
   * ```
   */
  async waitForElement(selector: string, timeout?: number): Promise<Locator> {
    try {
      const locator = this.getLocator(selector);
      await expect(locator).toBeVisible({ timeout });
      return locator;
    } catch (error) {
      console.error(`Error waiting for element "${selector}" to be visible: ${error}`);
      throw new Error(`Element "${selector}" not visible within ${timeout || 'default'} timeout: ${error}`);
    }
  }

  /**
   * Assert that an element has specific text.
   * 
   * This method verifies that an element matching the selector has the expected text content.
   * It throws an error if the element doesn't have the expected text within the specified timeout.
   * 
   * @param selector - The CSS or text selector for the element
   * @param text - The exact text that the element should contain
   * @param timeout - Optional timeout in milliseconds (defaults to Playwright's default timeout)
   * @throws Error if the element doesn't have the expected text within the timeout period
   * @example
   * ```typescript
   * // Assert that a page title has the expected text
   * await this.assertElementText('.title', 'Products');
   * 
   * // Assert with a custom timeout
   * await this.assertElementText('.notification', 'Success', 5000);
   * ```
   */
  async assertElementText(selector: string, text: string, timeout?: number): Promise<void> {
    try {
      const locator = this.getLocator(selector);
      await expect(locator).toHaveText(text, { timeout });
    } catch (error) {
      console.error(`Error asserting text for element "${selector}": ${error}`);
      throw new Error(`Element "${selector}" does not have expected text "${text}" within ${timeout || 'default'} timeout: ${error}`);
    }
  }

  /**
   * Click on an element.
   * 
   * This method waits for an element to be visible and then clicks on it.
   * It's a common operation in web testing and is used for buttons, links, checkboxes, etc.
   * 
   * @param selector - The CSS or text selector for the element to click
   * @throws Error if the element can't be clicked (e.g., not visible, not enabled, etc.)
   * @example
   * ```typescript
   * // Click on a button
   * await this.clickElement('#login-button');
   * 
   * // Click on a link with text
   * await this.clickElement('text=Click me');
   * ```
   */
  async clickElement(selector: string): Promise<void> {
    try {
      const locator = await this.waitForElement(selector);
      await locator.click();
    } catch (error) {
      console.error(`Error clicking element "${selector}": ${error}`);
      throw new Error(`Failed to click element "${selector}": ${error}`);
    }
  }

  /**
   * Fill a form field with text.
   * 
   * This method waits for a form field to be visible and then fills it with the specified value.
   * It's commonly used for text inputs, textareas, and other editable fields.
   * 
   * @param selector - The CSS or text selector for the form field
   * @param value - The text value to enter into the field
   * @throws Error if the field can't be filled (e.g., not visible, not editable, etc.)
   * @example
   * ```typescript
   * // Fill a username field
   * await this.fillField('#username', 'testuser');
   * 
   * // Fill a textarea
   * await this.fillField('.comment-box', 'This is a comment');
   * ```
   */
  async fillField(selector: string, value: string): Promise<void> {
    try {
      const locator = await this.waitForElement(selector);
      await locator.fill(value);
    } catch (error) {
      console.error(`Error filling field "${selector}" with value "${value}": ${error}`);
      throw new Error(`Failed to fill field "${selector}" with value "${value}": ${error}`);
    }
  }

  /**
   * Assert that the current URL contains a specific substring.
   * 
   * This method verifies that the current page URL contains the specified substring.
   * It's useful for confirming navigation to the expected page.
   * 
   * @param urlSubstring - The substring that should be present in the URL
   * @throws Error if the URL doesn't contain the expected substring
   * @example
   * ```typescript
   * // Assert that we're on the inventory page
   * await this.assertUrlContains('inventory');
   * 
   * // Assert that we're on a product detail page
   * await this.assertUrlContains('product/123');
   * ```
   */
  async assertUrlContains(urlSubstring: string): Promise<void> {
    try {
      await expect(this.page).toHaveURL(new RegExp(urlSubstring));
    } catch (error) {
      const currentUrl = this.page.url();
      console.error(`Error asserting URL contains "${urlSubstring}". Current URL: ${currentUrl}. Error: ${error}`);
      throw new Error(`URL does not contain "${urlSubstring}". Current URL: ${currentUrl}. Error: ${error}`);
    }
  }

  /**
   * Get all text contents from elements matching a selector.
   * 
   * This method retrieves the text content from all elements that match the specified selector.
   * It's useful for verifying lists of items, table contents, etc.
   * 
   * @param selector - The CSS or text selector for the elements
   * @returns An array of strings containing the text content of each matching element
   * @throws Error if the text content can't be retrieved from the elements
   * @example
   * ```typescript
   * // Get all product names from a list
   * const productNames = await this.getAllTextContents('.product-name');
   * 
   * // Verify that the list contains expected items
   * expect(productNames).toContain('Sauce Labs Backpack');
   * ```
   */
  async getAllTextContents(selector: string): Promise<string[]> {
    try {
      const locator = this.getLocator(selector);
      return await locator.allTextContents();
    } catch (error) {
      console.error(`Error getting text contents from elements matching "${selector}": ${error}`);
      throw new Error(`Failed to get text contents from elements matching "${selector}": ${error}`);
    }
  }
}
