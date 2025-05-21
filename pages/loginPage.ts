import { Page } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page object for the login page of the Sauce Demo application.
 * 
 * This class provides methods to interact with the login page, including
 * logging in with credentials, verifying login success or failure, and
 * navigating to the login page.
 * 
 * @example
 * ```typescript
 * // Create a new instance of the LoginPage
 * const loginPage = new LoginPage(page);
 * 
 * // Navigate to the login page
 * await loginPage.navigate();
 * 
 * // Login with valid credentials
 * await loginPage.login('standard_user', 'secret_sauce');
 * 
 * // Assert that login was successful
 * await loginPage.assertLoginSuccess();
 * ```
 */
export class LoginPage extends BasePage {
    // Selectors for elements on the login page
    private readonly loginLogoSelector = '.login_logo';
    private readonly usernameSelector = '#user-name';
    private readonly passwordSelector = '#password';
    private readonly loginButtonSelector = '#login-button';
    private readonly errorMessageSelector = '[data-test="error"]';

    /**
     * Creates an instance of LoginPage.
     * 
     * @param page - The Playwright Page object that will be used for interactions
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to the login page of the Sauce Demo application.
     * 
     * This method navigates the browser to the root URL ('/'), which is the login page
     * of the Sauce Demo application.
     * 
     * @example
     * ```typescript
     * // Navigate to the login page
     * await loginPage.navigate();
     * ```
     */
    async navigate(): Promise<void> {
        await super.navigate('/');
    }

    /**
     * Assert that we are on the login page.
     * 
     * This method verifies that the login page is loaded by checking for the presence
     * of the Sauce Labs logo and verifying its text content.
     * 
     * @example
     * ```typescript
     * // Verify that we're on the login page
     * await loginPage.assertLoginPage();
     * ```
     */
    async assertLoginPage(): Promise<void> {
        await this.waitForElement(this.loginLogoSelector);
        await this.assertElementText(this.loginLogoSelector, 'Swag Labs');
    }

    /**
     * Login with the given credentials.
     * 
     * This method fills in the username and password fields and clicks the login button.
     * It does not verify whether the login was successful or not.
     * 
     * @param username - The username to enter in the username field
     * @param password - The password to enter in the password field
     * @example
     * ```typescript
     * // Login with standard user credentials
     * await loginPage.login('standard_user', 'secret_sauce');
     * 
     * // Login with locked out user credentials
     * await loginPage.login('locked_out_user', 'secret_sauce');
     * ```
     */
    async login(username: string, password: string): Promise<void> {
        await this.fillField(this.usernameSelector, username);
        await this.fillField(this.passwordSelector, password);
        await this.clickElement(this.loginButtonSelector);
    }

    /**
     * Assert that login was successful.
     * 
     * This method verifies that the login was successful by checking that the URL
     * contains 'inventory', indicating that we've been redirected to the inventory page.
     * 
     * @example
     * ```typescript
     * // Login and verify success
     * await loginPage.login('standard_user', 'secret_sauce');
     * await loginPage.assertLoginSuccess();
     * ```
     */
    async assertLoginSuccess(): Promise<void> {
        await this.assertUrlContains('inventory');
    }

    /**
     * Assert that login failed with the given error message.
     * 
     * This method verifies that the login failed by checking for the presence of an
     * error message element and verifying its text content.
     * 
     * @param message - The expected error message text
     * @example
     * ```typescript
     * // Login with invalid credentials and verify the error message
     * await loginPage.login('invalid_user', 'wrong_password');
     * await loginPage.assertLoginError('Epic sadface: Username and password do not match any user in this service');
     * 
     * // Login with locked out user and verify the error message
     * await loginPage.login('locked_out_user', 'secret_sauce');
     * await loginPage.assertLoginError('Epic sadface: Sorry, this user has been locked out.');
     * ```
     */
    async assertLoginError(message: string): Promise<void> {
        await this.waitForElement(this.errorMessageSelector);
        await this.assertElementText(this.errorMessageSelector, message);
    }
}
