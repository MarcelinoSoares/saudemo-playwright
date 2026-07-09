import {test} from '@playwright/test';
import {CartPage} from '../../pages/cart-page';
import {InventoryPage} from '../../pages/inventory-page';
import {loginAsStandardUser} from '../../helpers/auth-helper';
import {products} from '../../fixtures/products';

test.describe('Cart Page', () => {
  let cartPage: CartPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({page}) => {
    cartPage = new CartPage(page);
    inventoryPage = new InventoryPage(page);
    await loginAsStandardUser(page);
  });

  test('@smoke should display cart page', async () => {
    await cartPage.goToCart();
    await cartPage.assertCartPage();
  });

  test('@smoke should add item to cart', async () => {
    await cartPage.addItemToCart(products.backpack.name);
    await cartPage.assertCartItemCount(1);
  });

  test('@regression should add multiple items to the cart and verify them', async () => {
    await cartPage.addItemToCart(products.backpack.name);
    await cartPage.addItemToCart(products.bikeLight.name);

    await cartPage.assertCartItemCount(2);
    await cartPage.goToCart();
    await cartPage.assertCartPage();
    await cartPage.assertItemInCart(products.backpack.name);
    await cartPage.assertItemInCart(products.bikeLight.name);
  });

  test('@regression should display item price in cart', async () => {
    await cartPage.addItemToCart(products.backpack.name);
    await cartPage.goToCart();
    await cartPage.assertItemPrice(
      products.backpack.name,
      products.backpack.price,
    );
  });

  test('@regression should remove item from cart', async () => {
    await cartPage.addItemToCart(products.backpack.name);
    await cartPage.goToCart();
    await cartPage.removeItem(products.backpack);
    await cartPage.assertItemNotInCart(products.backpack.name);
  });

  test('@regression should remove all items from the cart and verify it is empty', async () => {
    const allProducts = Object.values(products);

    for (const product of allProducts) {
      await cartPage.addItemToCart(product.name);
    }

    await cartPage.assertCartItemCount(allProducts.length);
    await cartPage.goToCart();
    await cartPage.assertCartPage();

    for (const product of allProducts) {
      await cartPage.removeItem(product);
    }

    await cartPage.assertCartIsEmpty();
    await cartPage.assertCartBadgeHidden();
  });

  test('@regression should continue shopping from cart', async () => {
    await cartPage.goToCart();
    await cartPage.continueShopping();
    await inventoryPage.assertInventoryPage();
  });

  test('@smoke should proceed to checkout', async () => {
    await cartPage.addItemToCart(products.backpack.name);
    await cartPage.goToCart();
    await cartPage.proceedToCheckout();
  });
});
