# Sauce Demo — Playwright Test Suite

[![CI](https://github.com/MarcelinoSoares/saudemo-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/MarcelinoSoares/saudemo-playwright/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-1.51-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-007ACC?logo=typescript&logoColor=white)
![Tests](https://img.shields.io/badge/tests-159-brightgreen)
![Browsers](https://img.shields.io/badge/browsers-chromium%20%7C%20firefox%20%7C%20webkit-blue)

End-to-end, API and accessibility test suite for [saucedemo.com](https://www.saucedemo.com) — a public e-commerce demo app. Built to demonstrate production-grade QA engineering: layered test architecture, Page Object Model, typed fixtures, and full CI/CD with report publishing.

---

## Test layers

| Layer | Location | What it covers |
| --- | --- | --- |
| E2E (UI) | `tests/e2e/` | Login, products, cart, checkout — full user flows through the browser |
| Network layer | `tests/network/` | HTTP status codes, redirects, content-type headers, asset loading |
| Accessibility | `tests/accessibility/` | WCAG 2.1 AA axe scan on login, inventory, cart and checkout pages |

**53 tests** per browser × 3 browsers = **159 total** on every CI run.

---

## Architecture

### Page Object Model

Every page lives in `pages/` and extends `BasePage`. Page classes expose typed `Locator` properties and high-level action methods — tests never touch raw selectors.

```text
Test → Page Object (Locators + methods) → Browser
```

| Class | Covers |
| --- | --- |
| `BasePage` | `navigate()`, `assertUrlContains()`, shared utilities |
| `LoginPage` | Login form, error handling, error dismiss |
| `InventoryPage` | Product listing, sorting, item detail |
| `CartPage` | Add/remove items, badge count, continue shopping |
| `CheckoutPage` | Form validation, order summary, tax/total, confirmation |

### Selector strategy

saucedemo.com does not expose `data-testid` attributes consistently. Selectors follow this priority:

1. `[data-test="…"]` — where the app provides it (e.g. sort container, remove buttons, error)
2. `#id` — form inputs and action buttons (`#login-button`, `#checkout`, `#finish`)
3. `:has-text("…")` — dynamic item lookup in lists
4. `.class` — content areas and titles

### Fixtures and data

All test data lives in `fixtures/` as typed objects — no magic strings in specs:

| File | Contents |
| --- | --- |
| `users.ts` | All user types: standard, locked, problem, performance glitch, invalid |
| `products.ts` | Full catalogue with `addToCartId`, `removeId`, sort expectations |
| `personas.ts` | Checkout form combinations: valid, missing first name, last name, zip, all empty |

### Helpers

| File | Purpose |
| --- | --- |
| `helpers/auth-helper.ts` | `loginAsStandardUser()`, `loginAsProblemUser()` — shorthand login for specs that don't test the login flow |
| `helpers/api-helper.ts` | `assertStatus()`, `assertContentType()`, `assertBodyContains()` — HTTP assertion wrappers |
| `helpers/test-utils.ts` | `calculateSubtotal()`, `sortByPrice*()`, `sortByName*()`, `formatPrice()` |

### Config

| File | Purpose |
| --- | --- |
| `config/urls.ts` | All app routes — single source of truth |
| `config/environments.ts` | Maps `TEST_ENV` values to base URLs |

---

## Project structure

```text
├── .github/workflows/playwright.yml   # CI: lint → test (3 shards) → merge → deploy
├── config/
│   ├── environments.ts
│   └── urls.ts
├── docs/
│   ├── test-strategy.md
│   ├── test-plan.md
│   └── risk-analysis.md
├── fixtures/
│   ├── users.ts
│   ├── products.ts
│   └── personas.ts
├── helpers/
│   ├── auth-helper.ts
│   ├── api-helper.ts
│   └── test-utils.ts
├── pages/
│   ├── base-page.ts
│   ├── login-page.ts
│   ├── inventory-page.ts
│   ├── cart-page.ts
│   └── checkout-page.ts
├── tests/
│   ├── e2e/
│   │   ├── login.spec.ts       # 8 tests
│   │   ├── products.spec.ts    # 9 tests
│   │   ├── cart.spec.ts        # 8 tests
│   │   └── checkout.spec.ts    # 11 tests
│   ├── api/
│   │   ├── auth.network.spec.ts
│   │   └── products.network.spec.ts
│   └── accessibility/
│       └── accessibility.spec.ts  # 4 tests — WCAG 2.1 AA via axe-core
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## Getting started

```sh
# Clone
git clone https://github.com/MarcelinoSoares/saudemo-playwright.git
cd saudemo-playwright

# Install dependencies
npm install

# Install browsers
npx playwright install
```

---

## Commands

| Command | What it does |
| --- | --- |
| `npm test` | Compile + run all tests headless (runs lint check after) |
| `npx playwright test tests/e2e/login.spec.ts` | Run a single spec |
| `npx playwright test -g "should login"` | Run tests matching a name pattern |
| `npx playwright test --project=chromium` | Run on a single browser |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:ui` | Open Playwright interactive UI |
| `npx playwright test --debug` | Step-through debugger |
| `npm run test:report` | Open last HTML report |
| `npm run check` | Lint check (gts) |
| `npm run fix` | Auto-fix lint and formatting |
| `./node_modules/.bin/tsc --noEmit` | Type-check only |

### Run by layer

```sh
# E2E only
npx playwright test tests/e2e/

# Network layer only
npx playwright test tests/network/

# Accessibility only
npx playwright test tests/accessibility/
```

### Environment

```sh
# Run against a different base URL
BASE_URL=https://staging.example.com npx playwright test
```

---

## CI/CD

Tests run automatically on every push and pull request to `main` via GitHub Actions.

```text
validation          lint (gts) + type check (tsc)
    │
    ▼
test                3 parallel shards × all browsers
    │
    ▼
merge-reports       combine shard blobs → single HTML report
    │
    ▼
deploy-report       publish to GitHub Pages (main branch only)
```

**Report:** [marcelinosoares.github.io/saudemo-playwright](https://marcelinosoares.github.io/saudemo-playwright)

---

## Documentation

- [Test Strategy](docs/test-strategy.md) — objectives, scope, test pyramid, CI/CD
- [Test Plan](docs/test-plan.md) — feature coverage tables, entry/exit criteria, execution modes
- [Risk Analysis](docs/risk-analysis.md) — risk matrix, high-risk areas, known limitations

---

## License

MIT
