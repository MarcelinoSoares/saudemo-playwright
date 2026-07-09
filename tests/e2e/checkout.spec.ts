import {test} from '@playwright/test';
import {CheckoutPage} from '../../pages/checkout-page';
import {CartPage} from '../../pages/cart-page';
import {InventoryPage} from '../../pages/inventory-page';
import {loginAsStandardUser} from '../../helpers/auth-helper';
import {products} from '../../fixtures/products';
import {persona} from '../../fixtures/personas';

test.describe('Checkout Page', () => {
  let checkoutPage: CheckoutPage;
  let cartPage: CartPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({page}) => {
    checkoutPage = new CheckoutPage(page);
    cartPage = new CartPage(page);
    inventoryPage = new InventoryPage(page);
    await loginAsStandardUser(page);
    await cartPage.addItemToCart(products.backpack.name);
    await cartPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('@smoke should display checkout page', async () => {
    await checkoutPage.assertCheckoutPage();
  });

  test('@smoke should fill checkout info and reach overview', async () => {
    const user = persona.validUser;

    await checkoutPage.fillCheckoutInfo(
      user.firstName,
      user.lastName,
      user.zipCode,
    );
    await checkoutPage.assertOverviewPage();
  });

  test('@regression should display error for missing first name', async () => {
    const user = persona.withoutFirstNameUser;

    await checkoutPage.fillCheckoutInfo(
      user.firstName,
      user.lastName,
      user.zipCode,
    );
    await checkoutPage.assertErrorMessage('Error: First Name is required');
  });

  test('@regression should display error for missing last name', async () => {
    const user = persona.withoutLastNameUser;

    await checkoutPage.fillCheckoutInfo(
      user.firstName,
      user.lastName,
      user.zipCode,
    );
    await checkoutPage.assertErrorMessage('Error: Last Name is required');
  });

  test('@regression should display error for missing zip code', async () => {
    const user = persona.withoutZipCodeUser;

    await checkoutPage.fillCheckoutInfo(
      user.firstName,
      user.lastName,
      user.zipCode,
    );
    await checkoutPage.assertErrorMessage('Error: Postal Code is required');
  });

  test('@regression should display error when all fields are empty', async () => {
    const user = persona.withoutAllUser;

    await checkoutPage.fillCheckoutInfo(
      user.firstName,
      user.lastName,
      user.zipCode,
    );
    await checkoutPage.assertErrorMessage('Error: First Name is required');
  });

  test('@regression should display order summary with correct item, price and quantity', async () => {
    const user = persona.validUser;
    const item = products.backpack;

    await checkoutPage.fillCheckoutInfo(
      user.firstName,
      user.lastName,
      user.zipCode,
    );
    await checkoutPage.assertOrderSummary(item.name, item.price, '1');
  });

  test('@regression should display tax and total on overview page', async () => {
    const user = persona.validUser;

    await checkoutPage.fillCheckoutInfo(
      user.firstName,
      user.lastName,
      user.zipCode,
    );
    await checkoutPage.assertTaxDisplayed();
    await checkoutPage.assertTotalDisplayed();
  });

  test('@regression should cancel from checkout step 1 and return to cart', async () => {
    await checkoutPage.cancelCheckout();
    await cartPage.assertCartPage();
  });

  test('@regression should cancel from overview and return to inventory', async () => {
    const user = persona.validUser;

    await checkoutPage.fillCheckoutInfo(
      user.firstName,
      user.lastName,
      user.zipCode,
    );
    await checkoutPage.assertOverviewPage();
    await checkoutPage.cancelCheckout();
    await inventoryPage.assertInventoryPage();
  });

  test('@smoke should complete checkout successfully', async () => {
    const user = persona.validUser;

    await checkoutPage.fillCheckoutInfo(
      user.firstName,
      user.lastName,
      user.zipCode,
    );
    await checkoutPage.finishCheckout();
    await checkoutPage.assertOrderConfirmation();
  });
});
