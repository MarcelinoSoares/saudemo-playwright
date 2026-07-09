import {test, expect} from '@playwright/test';

test.describe('Auth - HTTP Layer', () => {
  test('login page returns 200', async ({request}) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
  });

  test('login page returns HTML content', async ({request}) => {
    const response = await request.get('/');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/html');
  });

  test('login page contains app title', async ({request}) => {
    const response = await request.get('/');
    const body = await response.text();
    expect(body).toContain('Swag Labs');
  });

  test('unauthenticated access to inventory redirects to login', async ({
    page,
  }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/^https:\/\/www\.saucedemo\.com\/?$/);
  });

  test('unauthenticated access to cart redirects to login', async ({page}) => {
    await page.goto('/cart.html');
    await expect(page).toHaveURL(/^https:\/\/www\.saucedemo\.com\/?$/);
  });

  test('login form is present on the page', async ({page}) => {
    await page.goto('/');
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('successful login navigates to inventory', async ({page}) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
    expect(page.url()).toContain('inventory');
  });
});
