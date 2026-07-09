import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './base-page';
import {Product} from '../fixtures/products';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  async assertCartPage(): Promise<void> {
    await expect(this.title).toHaveText('Your Cart');
  }

  async assertCartItemCount(expectedItemCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(`${expectedItemCount}`);
  }

  async assertCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }

  async assertCartBadgeHidden(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async addItemToCart(itemName: string): Promise<void> {
    const item = this.page.locator(`.inventory_item:has-text("${itemName}")`);
    await item.locator('button:has-text("Add to cart")').click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async assertItemInCart(itemName: string): Promise<void> {
    await expect(
      this.page.locator(`.inventory_item_name:has-text("${itemName}")`),
    ).toBeVisible();
  }

  async assertItemNotInCart(itemName: string): Promise<void> {
    await expect(
      this.page.locator(`.inventory_item_name:has-text("${itemName}")`),
    ).not.toBeVisible();
  }

  async assertItemPrice(itemName: string, price: number): Promise<void> {
    const cartItem = this.page.locator(`.cart_item:has-text("${itemName}")`);
    await expect(cartItem.locator('.inventory_item_price')).toHaveText(
      `$${price.toFixed(2)}`,
    );
  }

  async removeItem(product: Product): Promise<void> {
    await this.page.locator(`[data-test="${product.removeId}"]`).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  // Kept for backward compatibility — caller must already be on the cart page
  async assertItemAdded(itemName: string): Promise<void> {
    await this.assertItemInCart(itemName);
  }

  // Kept for backward compatibility — caller must already be on the cart page
  async assertItemRemoved(itemName: string): Promise<void> {
    await this.assertItemNotInCart(itemName);
  }
}
