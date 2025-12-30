# 🎭 Sauce Demo Playwright Automation

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## 📌 Introduction

This project utilizes [Playwright](https://playwright.dev/) for end-to-end test automation of the [Sauce Demo](https://www.saucedemo.com/) application. It ensures quality and reliability by simulating user interactions in a realistic e-commerce environment, covering scenarios like login, product navigation, cart management, and checkout.

## 🏗️ Project Architecture

This project follows the **Page Object Model (POM)** design pattern, which:

- **Separates test logic from page interaction logic**: Each application page has a dedicated class encapsulating selectors and interaction methods.
- **Enhances maintainability**: UI changes only require updates in the corresponding page object, not the tests.
- **Promotes code reuse**: Interaction methods are reusable across multiple tests.
- **Improves readability**: Tests use meaningful method names describing high-level actions.

### Page Objects Structure
- **`BasePage`**: Shared methods and utilities for all page objects.
- **`LoginPage`**: Interaction with the login screen.
- **`InventoryPage`**: Handling the product list and filtering.
- **`CartPage`**: Managing the shopping cart.
- **`CheckoutPage`**: Processing the checkout flow.

## 🛠️ Tech Stack

- **[Node.js](https://nodejs.org/)**: Runtime environment.
- **[Playwright](https://playwright.dev/)**: Browser automation framework.
- **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript for better tooling and error checking.
- **[Jest](https://jestjs.io/)** (Optional): Testing framework integration.

## 🚀 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/sauce-playwright.git
   cd sauce-playwright
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

## 📄 Project Structure

```
📂 sauce-playwright
 ┣ 📂 .github/workflows # GitHub Actions CI/CD configurations
 ┣ 📂 configs/          # Playwright environment configurations
 ┣ 📂 fixtures/         # Custom Playwright fixtures for test isolation
 ┣ 📂 pages/            # Page Object Model classes
 ┣ 📂 reports/          # Test execution reports
 ┣ 📂 tests/            # Playwright test specifications (*.spec.ts)
 ┣ 📂 utils/            # Helper functions and shared utilities
 ┣ 📄 .env.example      # Example environment variables file
 ┣ 📄 playwright.config.ts # Main Playwright configuration
 ┣ 📄 package.json      # Project dependencies and scripts
 ┗ 📄 README.md         # Project documentation
```

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm test` | Runs all Playwright tests. |
| `npm run test:ui` | Opens the interactive Playwright UI mode. |
| `npm run test:headless` | Runs tests in **headed** mode (visible browser). |
| `npm run test:debug` | Runs tests in debug mode (step-by-step execution). |
| `npm run test:report` | Generates and opens the HTML test report. |
| `npm run check` | Checks for code linting and formatting issues (gts). |
| `npm run fix` | Automatically fixes simple linting and formatting issues. |
| `npm run compile` | Compiles TypeScript code. |

## ⚙️ Configuration & Environment Variables

This project may require environment variables for sensitive data or configuration.

1. Create a `.env` file in the root directory (copy from `.env.example` if available).
2. Define the following variables:

| Variable | Description |
| :--- | :--- |
| `SLACK_WEBHOOK_URL` | Webhook URL to send test failure notifications to Slack. |
| `BASE_URL` | (Optional) Base URL for the application under test. |

## 🧪 Running Tests

- **Run all tests:**
  ```sh
  npx playwright test
  ```

- **Run a specific test file:**
  ```sh
  npx playwright test tests/example.spec.ts
  ```

- **View the test report:**
  ```sh
  npx playwright show-report
  ```

## 🏗️ Best Practices

### Selectors & Elements
- prioritize `data-testid` or stable attributes.
- Encapsulate selectors as private properties in Page Objects.
- Use robust CSS or text selectors.

### Test Structure
- Follow **AAA (Arrange, Act, Assert)** pattern.
- meaningful test names.
- Use `beforeEach` / `afterEach` for setup/teardown.

### Documentation
- Use JSDoc for classes and methods.
- Keep README and code comments updated.

## 🔄 CI/CD (Continuous Integration & Delivery)

This project uses **GitHub Actions** for automated testing.

### Referece Workflow
Located in `.github/workflows/playwright.yml`.

### Triggers
- Pushes to `main` / `master`.
- Pull Requests to `main` / `master`.
- Scheduled (Weekly).
- Manual dispatch.

### Features
- **Multi-version Node.js testing** (16, 18, LTS).
- **HTML Reports** published to GitHub Pages / Artifacts.
- **Slack Notifications** on failure.

## 🤝 Contribution

Contributions are welcome! Please follow the code style (`npm run check`) and submit a Pull Request.

## 📜 License

MIT License
