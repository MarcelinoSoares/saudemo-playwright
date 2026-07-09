# Test Plan — Sauce Demo (saucedemo.com)

## 1. Objectives

- Verify that all critical user flows (login → browse → cart → checkout) work correctly across browsers.
- Validate HTTP-layer behaviour (status codes, redirects, content) without full browser rendering.
- Identify accessibility violations on key pages using automated axe scanning.
- Catch regressions automatically on every push via CI.

---

## 2. Scope

### In scope

| Area | Coverage |
|---|---|
| Authentication | Valid login, invalid credentials, locked user, missing fields |
| Product inventory | Page load, sorting (A→Z, Z→A, price low→high, price high→low), item detail |
| Shopping cart | Add single/multiple items, remove items, badge count, cart page contents |
| Checkout | Form validation (all field combinations), order summary, order confirmation |
| HTTP / network | Status codes, redirect behaviour, content-type headers, asset loading |
| Accessibility | axe scan on login, inventory, cart, and checkout pages |

### Out of scope

| Area | Reason |
|---|---|
| Performance load testing | Separate tooling (k6, Gatling) |
| Security penetration testing | Separate engagement |
| Visual regression | Requires baseline images; tracked as future work |
| Mobile native apps | saucedemo.com is web-only |
| Real payment processing | Demo app — no actual payments |

---

## 3. Test Types and Locations

| Type | Directory | Runner |
|---|---|---|
| E2E (UI) | `tests/e2e/` | Playwright browser |
| API / network | `tests/network/` | Playwright request fixture |
| Accessibility | `tests/accessibility/` | Playwright + axe-core |

---

## 4. Feature Coverage

### 4.1 Login (`tests/e2e/login.spec.ts`)

| Test Case | Input | Expected Result |
|---|---|---|
| Valid login | `standard_user` / `secret_sauce` | Redirected to `/inventory.html` |
| Invalid credentials | `invalid_user` / `wrong_pass` | Error message displayed |
| Missing password | `standard_user` / (empty) | "Password is required" error |
| Missing username | (empty) / `secret_sauce` | "Username is required" error |
| Locked user | `locked_out_user` / `secret_sauce` | "Sorry, this user has been locked out" error |

### 4.2 Products (`tests/e2e/products.spec.ts`)

| Test Case | Action | Expected Result |
|---|---|---|
| Inventory loads | Navigate after login | Product grid visible |
| Sort A→Z | Select sort option | Items in alphabetical order |
| Sort Z→A | Select sort option | Items in reverse alphabetical order |
| Sort price low→high | Select sort option | Prices in ascending order |
| Sort price high→low | Select sort option | Prices in descending order |
| Product detail | Click item name | Detail page loads with correct info |

### 4.3 Cart (`tests/e2e/cart.spec.ts`)

| Test Case | Action | Expected Result |
|---|---|---|
| Add single item | Click "Add to cart" | Badge shows `1` |
| Add multiple items | Add N items | Badge shows `N` |
| Remove from inventory | Click "Remove" | Badge decrements |
| Cart page contents | Navigate to cart | Added items visible |
| Remove from cart | Click "Remove" in cart | Item removed, badge updates |

### 4.4 Checkout (`tests/e2e/checkout.spec.ts`)

| Test Case | Input | Expected Result |
|---|---|---|
| Missing first name | (empty) / last / zip | "First Name is required" error |
| Missing last name | first / (empty) / zip | "Last Name is required" error |
| Missing zip | first / last / (empty) | "Postal Code is required" error |
| Complete order | All fields valid | Order confirmation page |

### 4.5 API / Network (`tests/network/`)

| Test Case | File | Check |
|---|---|---|
| Login page availability | `auth.network.spec.ts` | HTTP 200 |
| Unauthenticated redirect | `auth.network.spec.ts` | `/inventory.html` → redirect |
| Inventory page content | `products.network.spec.ts` | Body contains product markup |
| Asset loading | `products.network.spec.ts` | Images return non-empty response |

### 4.6 Accessibility (`tests/accessibility/accessibility.spec.ts`)

| Page | URL | axe Rules |
|---|---|---|
| Login | `/` | WCAG 2.1 AA |
| Inventory | `/inventory.html` | WCAG 2.1 AA |
| Cart | `/cart.html` | WCAG 2.1 AA |
| Checkout step 1 | `/checkout-step-one.html` | WCAG 2.1 AA |

---

## 5. Test Data

All test data is centralised in `fixtures/`:

| File | Contents |
|---|---|
| `users.ts` | All user types: standard, locked, problem, performance glitch, invalid |
| `products.ts` | Full product catalogue (id, name, price, description, selector) |
| `personas.ts` | Checkout form combinations (valid, missing first name, last name, zip) |

---

## 6. Entry and Exit Criteria

### Entry criteria (before running)

- [ ] Application is accessible at `BASE_URL`
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] TypeScript compiles without errors (`./node_modules/.bin/tsc --noEmit`)

### Exit criteria (suite passes when)

- [ ] All tests pass on Chromium, Firefox, and WebKit
- [ ] Zero critical or serious axe violations on scanned pages
- [ ] No flaky tests in last 5 CI runs
- [ ] HTML report is published and readable

---

## 7. Test Execution

| Mode | Command |
|---|---|
| All tests (headless) | `npm test` |
| Single spec | `npx playwright test tests/e2e/login.spec.ts` |
| Single browser | `npx playwright test --project=chromium` |
| Accessibility only | `npx playwright test tests/accessibility/` |
| Headed (visible browser) | `npm run test:headless` |
| Interactive UI | `npm run test:ui` |
| Debug | `npx playwright test tests/e2e/login.spec.ts --debug` |
| View last report | `npm run test:report` |

---

## 8. CI/CD Integration

Tests run automatically on every `push` and `pull_request` to `main` via GitHub Actions (`.github/workflows/playwright.yml`):

1. **Validation** — lint (`gts check`) + type check (`tsc`)
2. **Test** — 3 parallel shards across all browsers
3. **Merge reports** — combine shard blobs into a single HTML report
4. **Deploy** — publish report to GitHub Pages

---

## 9. Risks and Mitigations

See [risk-analysis.md](risk-analysis.md) for the full risk matrix.

Key risks:

| Risk | Mitigation |
|---|---|
| Login flow breaks | `login.spec.ts` + `auth.network.spec.ts` are P1 and run first |
| Flaky tests on CI | `retries: 2` on CI; blob report for diagnosis |
| App breaks on Firefox/Safari | CI matrix covers all 3 browsers |

---

## 10. Deliverables

| Deliverable | Location |
|---|---|
| Automated test suite | `tests/` |
| HTML test report | GitHub Pages (CI) / `playwright-report/` (local) |
| Test strategy | `docs/test-strategy.md` |
| Risk analysis | `docs/risk-analysis.md` |
| This test plan | `docs/test-plan.md` |
