# Risk Analysis — Sauce Demo Test Suite

## Risk Matrix

| Risk | Likelihood | Impact | Priority | Mitigation |
|---|---|---|---|---|
| Login flow breaks | Medium | High | P1 | Covered by `login.spec.ts` + `auth.network.spec.ts` |
| Add to cart silently fails | Low | High | P1 | `cart.spec.ts` asserts badge count + cart contents |
| Checkout form accepts invalid data | Low | Critical | P1 | `checkout.spec.ts` covers all missing-field combinations |
| Product prices change | Low | Medium | P2 | `products.spec.ts` verifies prices against fixture data |
| Redirect logic breaks for unauth users | Low | High | P2 | `auth.network.spec.ts` validates redirect behavior |
| App breaks on Firefox/Safari | Low | Medium | P2 | CI matrix runs chromium + firefox + webkit |
| Flaky tests on CI | Medium | Medium | P2 | Retry on CI (`retries: 2`), blob report for diagnosis |
| Slow UI on `performance_glitch_user` | Medium | Low | P3 | `users.ts` includes this persona; test can assert timeout |

---

## High-Risk Areas

### 1. Authentication

The login flow is the gateway to the entire application. A broken login blocks all other tests.

**Coverage:** `tests/e2e/login.spec.ts`, `tests/network/auth.network.spec.ts`

**Gaps:** Session expiry, token invalidation (not applicable for this SPA)

---

### 2. Cart State Management

The cart is managed client-side. State can be lost on navigation or page refresh.

**Coverage:** `tests/e2e/cart.spec.ts` — add, remove, verify count, verify items in cart page

**Gaps:** Cart persistence across browser sessions

---

### 3. Checkout Form Validation

Missing or invalid field combinations must show the right error messages. Silent failures here could allow broken orders.

**Coverage:** `tests/e2e/checkout.spec.ts` — all missing-field permutations tested

**Gaps:** Special characters in name fields, very long inputs

---

## Known Limitations

| Limitation | Reason |
|---|---|
| No real payment processing | saucedemo.com is a demo app |
| No REST API to test | App is a client-side SPA; network tests cover HTTP layer only |
| `problem_user` image bugs not asserted | Visual bugs require visual comparison tooling |

---

## Recommended Additions

| Item | Effort | Value |
|---|---|---|
| Axe a11y scan on login + inventory pages | Low | Medium |
| Visual regression (Playwright screenshots) | Medium | High |
| `performance_glitch_user` timeout assertions | Low | Medium |
| Data cleanup / state reset helper | Medium | High |
