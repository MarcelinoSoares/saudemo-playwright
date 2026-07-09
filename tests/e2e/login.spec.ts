import {test} from '@playwright/test';
import {LoginPage} from '../../pages/login-page';
import {users} from '../../fixtures/users';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should display login page', async () => {
    await loginPage.assertLoginPage();
  });

  test('should login successfully with valid credentials', async () => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await loginPage.assertLoginSuccess();
  });

  test('should login successfully with performance glitch user', async () => {
    await loginPage.login(
      users.performanceGlitchUser.username,
      users.performanceGlitchUser.password
    );
    await loginPage.assertLoginSuccess();
  });

  test('should display error for invalid credentials', async () => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await loginPage.assertLoginError(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('should display error for missing password', async () => {
    await loginPage.login(users.withoutPasswordUser.username, users.withoutPasswordUser.password);
    await loginPage.assertLoginError('Epic sadface: Password is required');
  });

  test('should display error for missing username', async () => {
    await loginPage.login(users.withoutUsernameUser.username, users.withoutUsernameUser.password);
    await loginPage.assertLoginError('Epic sadface: Username is required');
  });

  test('should display error for locked out user', async () => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
    await loginPage.assertLoginError(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('should dismiss error message', async () => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await loginPage.assertLoginError(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await loginPage.dismissError();
    await loginPage.assertErrorDismissed();
  });
});
