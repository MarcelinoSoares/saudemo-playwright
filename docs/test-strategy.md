# Test Strategy — Sauce Demo (saucedemo.com)

## Objective

Validate the end-to-end purchase flow of a web e-commerce application using Playwright with TypeScript, ensuring quality at both the UI and network layers.

---

## Scope

| In Scope | Out of Scope |
|---|---|
| Login / Authentication | Performance load testing |
| Product listing and sorting | Security penetration testing |
| Add/remove items from cart | Backend database validation |
| Checkout flow (info, overview, confirmation) | Third-party payment processing |
| HTTP layer (status codes, redirects, headers) | Mobile native apps |

---

## Test Pyramid

```
         /\
        /  \
       / E2E \        ← UI tests via Playwright (tests/e2e/)
      /--------\
     /  Network  \     ← HTTP/network layer (tests/network/)
    /------------\
   /   Unit (TBD) \   ← Pure logic functions (helpers/)
  /-----------------\
```

---

## Test Types

### E2E Tests (`tests/e2e/`)

UI-level tests that simulate real user flows through the browser. Each spec corresponds to a feature area:

- `login.spec.ts` — authentication scenarios (valid, invalid, locked)
- `products.spec.ts` — inventory listing, sorting, product detail
- `cart.spec.ts` — add, remove, verify cart contents
- `checkout.spec.ts` — form validation, order summary, order completion

### Network Tests (`tests/network/`)

Tests that validate HTTP behavior without full browser rendering:

- `auth.network.spec.ts` — page availability, redirect behavior, response content
- `products.network.spec.ts` — inventory endpoints, asset loading, network interception

---

## Design Patterns

### Page Object Model (POM)

Each page is encapsulated in a class under `pages/`. Tests interact with the page through its public API, not raw selectors.

```
Test → Page Object → Browser
```

### Data-Driven Testing

Test data is centralized in `fixtures/`:
- `users.ts` — all user types (standard, locked, problem, performance)
- `products.ts` — product catalog with IDs, names, prices, descriptions
- `personas.ts` — checkout persona combinations (valid, missing fields)

---

## Environments

Managed via `config/environments.ts`. Set `TEST_ENV=staging` to run against staging.

| Environment | URL |
|---|---|
| production (default) | https://www.saucedemo.com |
| staging | configurable via `TEST_ENV` |

---

## CI/CD

Tests run on every `push` / `pull_request` to `main` via GitHub Actions:

1. **Validation** — lint + type check
2. **Test** — 3 parallel shards, each running the full browser matrix (chromium, firefox, webkit)
3. **Merge reports** — combine shard results
4. **Deploy** — publish HTML report to GitHub Pages

---

## Definition of Done

A test suite is considered complete when:

- [ ] All happy path flows have automated tests
- [ ] All error/validation states are covered
- [ ] Tests pass on all 3 browsers in CI
- [ ] No flaky tests in last 5 runs
- [ ] Report is published and readable
