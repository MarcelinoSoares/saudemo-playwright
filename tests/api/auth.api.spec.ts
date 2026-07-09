import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/login-page';
import {users} from '../../fixtures/users';

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
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('successful login navigates to inventory', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password,
    );
    await loginPage.assertLoginSuccess();
  });
});
