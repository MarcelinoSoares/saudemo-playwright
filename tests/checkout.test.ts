import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { users } from '../fixtures/users';
import { InventoryPage } from '../pages/inventoryPage';
import { products } from '../fixtures/products';
import { CartPage } from '../pages/cartPage';
import { persona } from '../fixtures/personas';


test.describe('Checkout Page', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let checkoutPage: CheckoutPage;
    let cartPage: CartPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
        cartPage = new CartPage(page);
        await loginPage.navigate();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
        await inventoryPage.assertInventoryPage();
        await cartPage.addItemToCart(products.backpack.name);
        await cartPage.goToCart();
        await cartPage.proceedToCheckout();
    });

    test('should display checkout page', async ({}) => {
        await checkoutPage.assertCheckoutPage();
    });

    test('should fill checkout info', async ({}) => {
        const user = persona.validUser;

        await checkoutPage.fillCheckoutInfo(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.assertOverviewPage();
    });

    test('should display error message for missing first name', async ({}) => {
        const user = persona.withoutFirstNameUser;

        await checkoutPage.fillCheckoutInfo(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.assertErrorMessage('Error: First Name is required');
    });

    test('should display error message for missing last name', async ({}) => {
        const user = persona.withoutLastNameUser;

        await checkoutPage.fillCheckoutInfo(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.assertErrorMessage('Error: Last Name is required');
    });

        test('should display error message for missing zip code', async ({ }) => {
        const user = persona.withoutZipCodeUser;
        
        await checkoutPage.fillCheckoutInfo(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.assertErrorMessage('Error: Postal Code is required');
        });
    
    test('should display error message for empty user', async ({ }) => {
        const user = persona.withoutAllUser;

        await checkoutPage.fillCheckoutInfo(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.assertErrorMessage('Error: First Name is required');
    });
    test('should display order summary', async ({}) => {
        const user = persona.validUser;
        const item = products.backpack;

        await checkoutPage.fillCheckoutInfo(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.assertOrderSummary(item.name, item.price, '1');
    });

    test('should complete checkout', async ({}) => {
        const user = persona.validUser;

        await checkoutPage.fillCheckoutInfo(user.firstName, user.lastName, user.zipCode);
        await checkoutPage.finishCheckout();
        await checkoutPage.assertOrderConfirmation();
    });
});