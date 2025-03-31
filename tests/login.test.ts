import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { users } from '../fixtures/users';

test.describe('Login Page', () => {
    let loginPage: LoginPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('should display login page', async ({ }) => {
        await loginPage.assertLoginPage();
    });
    
    test('should login successfully with valid credentials', async ({  }) => {
        const user = users.standardUser;
        await loginPage.login(user.username, user.password);
        await loginPage.assertLoginSuccess();
    });

    test('should display error message for invalid credentials', async ({ }) => {
        const user = users.invalidUser;
        await loginPage.login(user.username, user.password);
        await loginPage.assertLoginError('Epic sadface: Username and password do not match any user in this service');
    });

    test('should display error message for missing password', async ({ }) => {
        const user = users.withoutPasswordUser;
        await loginPage.login(user.username, user.password);
        await loginPage.assertLoginError('Epic sadface: Password is required');
    });

    test('should display error message for missing username', async ({ }) => {
        const user = users.withoutUsernameUser;
        await loginPage.login(user.username, user.password);
        await loginPage.assertLoginError('Epic sadface: Username is required');
    });
});