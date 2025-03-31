# 🎭 Playwright Test Automation

## 📌 Introdução
Este projeto utiliza o [Playwright](https://playwright.dev/) para automação de testes end-to-end, garantindo qualidade e confiabilidade nas aplicações web.

## 🛠️ Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Playwright](https://playwright.dev/)
- [Jest](https://jestjs.io/) (opcional)
- [TypeScript](https://www.typescriptlang.org/) (opcional)

## 🚀 Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Instale os navegadores necessários:
   ```sh
   npx playwright install
   ```

## 📄 Estrutura do Projeto
```
📂 projeto
 ┣ 📂 tests/           # Arquivos de teste Playwright
 ┣ 📂 configs/         # Configurações do Playwright
 ┣ 📂 reports/         # Relatórios de teste
 ┣ 📄 playwright.config.ts  # Configuração principal
 ┣ 📄 package.json     # Dependências do projeto
 ┗ 📄 README.md        # Documentação do projeto
```

## 📝 Configuração do Playwright
Exemplo de `playwright.config.ts`:
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['html', { outputFolder: 'reports' }]],
});
```

## 🧪 Executando os Testes
- Rodar todos os testes:
  ```sh
  npx playwright test
  ```
- Rodar testes específicos:
  ```sh
  npx playwright test tests/exemplo.spec.ts
  ```
- Gerar relatório:
  ```sh
  npx playwright show-report
  ```

## 🏗️ Boas Práticas
- Use `data-testid` para identificar elementos.
- Escreva testes modulares e reutilizáveis.
- Utilize `beforeEach` e `afterEach` para setup e teardown.

## 📌 Contribuindo
Contribuições são bem-vindas! Siga o padrão de código e abra um PR.

## 📜 Licença
MIT License

---
