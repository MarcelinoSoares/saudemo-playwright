import {Page} from '@playwright/test';
import {urls} from '../config/urls';
import {users} from '../fixtures/users';

export async function loginAs(
  page: Page,
  username: string,
  password: string,
): Promise<void> {
  await page.goto(urls.login);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
  await page.waitForURL(/inventory/);
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
