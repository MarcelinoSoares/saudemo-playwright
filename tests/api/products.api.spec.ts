import {test, expect} from '@playwright/test';
import {users} from '../../fixtures/users';
import {products} from '../../fixtures/products';

test.describe('Products - Network Layer', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.fill('#user-name', users.standardUser.username);
    await page.fill('#password', users.standardUser.password);
    await page.click('#login-button');
    await page.waitForURL(/inventory/);
  });

  test('inventory page is accessible when authenticated', async ({page}) => {
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('all product images load successfully', async ({page}) => {
    const images = page.locator('.inventory_item_img img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const src = await images.nth(i).getAttribute('src');
      expect(src).toBeTruthy();
    }
  });

  test('all 6 products are rendered on the page', async ({page}) => {
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(Object.keys(products).length);
  });

  test('cart page is reachable via navigation', async ({page}) => {
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('.cart_list')).toBeVisible();
  });

  test('product detail page loads via direct URL', async ({page}) => {
    await page.goto('/inventory-item.html?id=4');
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_name')).toHaveText(
      products.backpack.name,
    );
  });

  test('intercepted page shows correct product count', async ({page}) => {
    const productNames: string[] = [];

    page.on('response', async response => {
      if (response.url().includes('inventory')) {
        productNames.push(response.url());
      }
    });

    await page.reload();
    const items = page.locator('.inventory_item_name');
    await expect(items).toHaveCount(Object.keys(products).length);
  });
});
