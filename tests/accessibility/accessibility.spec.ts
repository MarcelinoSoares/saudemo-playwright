import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {loginAsStandardUser} from '../../helpers/auth-helper';
import {urls} from '../../config/urls';

test.describe('Accessibility — WCAG 2.1 AA', () => {
  test('login page has no WCAG A/AA violations', async ({page}) => {
    await page.goto(urls.login);

    const results = await new AxeBuilder({page})
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('inventory page has no WCAG A/AA violations except known select-name issue', async ({
    page,
  }) => {
    await loginAsStandardUser(page);

    // Known app defect: the sort <select> has no accessible label (select-name / WCAG 4.1.2).
    // This is a bug in saucedemo.com that cannot be fixed from the test layer.
    // Suppressed here so CI catches *new* regressions without failing on this known issue.
    const results = await new AxeBuilder({page})
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['select-name'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('cart page has no WCAG A/AA violations', async ({page}) => {
    await loginAsStandardUser(page);
    await page.goto(urls.cart);

    const results = await new AxeBuilder({page})
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('checkout step 1 has no WCAG A/AA violations', async ({page}) => {
    await loginAsStandardUser(page);
    await page.goto(urls.checkoutStep1);

    const results = await new AxeBuilder({page})
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
