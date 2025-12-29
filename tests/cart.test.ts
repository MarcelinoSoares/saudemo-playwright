import {test} from '@playwright/test';
import {LoginPage} from '../pages/login-page';

import {users} from '../fixtures/users';
import {products} from '../fixtures/products';
import {CartPage} from '../pages/cart-page';

test.describe('Cart Page', () => {
  let loginPage: LoginPage;

  let cartPage: CartPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);

    cartPage = new CartPage(page);
    await loginPage.navigate();
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password,
    );
  });

  test('should display cart page', async () => {
    await cartPage.goToCart();
    await cartPage.assertCartPage();
  });

  test('should add item to cart', async () => {
    const itemName = products.backpack.name;

    await cartPage.addItemToCart(itemName);
    await cartPage.assertCartItemCount(1);
  });

  test('Should add multiple items to the cart and verify them', async () => {
    const itemName1 = products.backpack.name;
    const itemName2 = products.bikeLight.name;

    await cartPage.addItemToCart(itemName1);
    await cartPage.addItemToCart(itemName2);
    await cartPage.assertCartItemCount(2);
    await cartPage.goToCart();
    await cartPage.assertCartPage();
    await cartPage.assertItemAdded(itemName1);
    await cartPage.assertItemAdded(itemName2);
  });

  test('should remove item from cart', async () => {
    const itemName = products.backpack.name;

    await cartPage.addItemToCart(itemName);
    await cartPage.goToCart();
    await cartPage.removeItem(itemName);
    await cartPage.assertItemRemoved(itemName);
  });

  test('Should remove all items from the cart and verify it is empty', async () => {
    const productList = [
      products.backpack.name,
      products.bikeLight.name,
      products.boltTShirt.name,
      products.fleeceJacket.name,
      products.redTShirt.name,
      products.onesie.name,
    ];

    for (const product of productList) {
      await cartPage.addItemToCart(product);
    }

    await cartPage.assertCartItemCount(productList.length);
    await cartPage.goToCart();
    await cartPage.assertCartPage();

    for (const product of productList) {
      await cartPage.removeItem(product);
    }

    await cartPage.assertCartIsEmpty();
  });

  test('should proceed to checkout', async () => {
    const itemName = products.backpack.name;

    await cartPage.addItemToCart(itemName);
    await cartPage.goToCart();
    await cartPage.proceedToCheckout();
  });
});
