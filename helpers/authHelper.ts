import {Page} from '@playwright/test';
import {LoginPage} from '../pages/login-page';
import {users} from '../fixtures/users';

export async function loginAs(
  page: Page,
  username: string,
  password: string,
): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(username, password);
  await loginPage.assertLoginSuccess();
}

export async function loginAsStandardUser(page: Page): Promise<void> {
  await loginAs(page, users.standardUser.username, users.standardUser.password);
}

export async function loginAsProblemUser(page: Page): Promise<void> {
  await loginAs(page, users.problemUser.username, users.problemUser.password);
}

export async function loginAsPerformanceGlitchUser(page: Page): Promise<void> {
  await loginAs(
    page,
    users.performanceGlitchUser.username,
    users.performanceGlitchUser.password,
  );
}
