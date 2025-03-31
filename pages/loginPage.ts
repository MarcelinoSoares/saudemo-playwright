import { expect, Page } from '@playwright/test';

export class LoginPage {
	constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('/');
    }

	async assertLoginPage() {
		const loginLogo = this.page.locator('.login_logo');
		await expect(loginLogo).toBeVisible();
		await expect(loginLogo).toHaveText('Swag Labs');
	}

	async login(username: string, password: string) {
		await this.page.fill('#user-name', username);
		await this.page.fill('#password', password);
		await this.page.click('#login-button');
	}

	async assertLoginSuccess() {
		await expect(this.page).toHaveURL(/inventory/);
	}

	async assertLoginError(message: string) {
		const errorMessage = this.page.locator('[data-test="error"]');
		await expect(errorMessage).toBeVisible();
		await expect(errorMessage).toHaveText(message);
	}
}
