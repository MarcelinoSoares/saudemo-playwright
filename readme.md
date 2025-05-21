# 🎭 Playwright Test Automation para Sauce Demo

## 📌 Introdução
Este projeto utiliza o [Playwright](https://playwright.dev/) para automação de testes end-to-end da aplicação [Sauce Demo](https://www.saucedemo.com/), garantindo qualidade e confiabilidade. O Sauce Demo é uma aplicação web de demonstração que simula uma loja online, permitindo testar diversos cenários de e-commerce como login, navegação de produtos, adição ao carrinho e checkout.

## 🏗️ Arquitetura do Projeto
Este projeto implementa o **Padrão Page Object Model (POM)**, uma prática recomendada para automação de testes que:

- **Separa a lógica de teste da lógica de interação com a página**: Cada página da aplicação tem sua própria classe que encapsula os seletores e métodos para interagir com ela.
- **Melhora a manutenibilidade**: Alterações na interface da aplicação afetam apenas o page object correspondente, não os testes.
- **Promove a reutilização de código**: Os métodos de interação com a página podem ser reutilizados em vários testes.
- **Torna os testes mais legíveis**: Os testes usam métodos com nomes significativos que descrevem ações de alto nível.

### Estrutura dos Page Objects
- **BasePage**: Classe base que fornece métodos comuns para todos os page objects
- **LoginPage**: Interage com a página de login
- **InventoryPage**: Interage com a página de inventário (lista de produtos)
- **CartPage**: Interage com a página do carrinho de compras
- **CheckoutPage**: Interage com as páginas do processo de checkout

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
📂 sauce-playwright
 ┣ 📂 tests/           # Arquivos de teste Playwright
 ┣ 📂 configs/         # Configurações do Playwright
 ┣ 📂 reports/         # Relatórios de teste
 ┣ 📂 utils/           # Funções utilitárias para os testes
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
    baseURL: 'http://localhost:3000', // URL base para os testes
  },
  reporter: [['html', { outputFolder: 'reports' }]],
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
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

### Seletores e Elementos
- Use `data-testid` para identificar elementos sempre que possível.
- Defina seletores como propriedades privadas no topo da classe page object.
- Use seletores CSS ou seletores de texto que sejam resilientes a mudanças na estrutura da página.

### Estrutura de Testes
- Escreva testes modulares e reutilizáveis.
- Utilize `beforeEach` e `afterEach` para setup e teardown.
- Configure variáveis de ambiente para dados sensíveis.
- Siga o padrão AAA (Arrange, Act, Assert) para estruturar seus testes.

### Documentação
- Documente todas as classes com descrições detalhadas e exemplos de uso.
- Documente todos os métodos explicando o que fazem, seus parâmetros e valores de retorno.
- Inclua exemplos de uso para métodos complexos ou que tenham múltiplos casos de uso.
- Mantenha a documentação atualizada quando o código for modificado.
- Use JSDoc para documentar classes, métodos, parâmetros e tipos de retorno.

### Padrão Page Object
- Estenda a classe BasePage para todos os page objects.
- Implemente métodos que representem ações de alto nível que um usuário pode realizar.
- Mantenha a lógica de interação com a página dentro dos page objects, não nos testes.
- Retorne outros page objects quando a ação navega para outra página.

## 🔄 CI/CD (Integração e Entrega Contínua)

Este projeto utiliza GitHub Actions para automação de testes e integração contínua. O pipeline de CI/CD inclui:

### 🔄 Execução Automática de Testes

Os testes são executados automaticamente nas seguintes situações:
- Em cada push para as branches `main` ou `master`
- Em cada pull request para as branches `main` ou `master`
- Semanalmente (toda segunda-feira à meia-noite)
- Manualmente através da opção "workflow_dispatch" no GitHub

### 🧪 Matriz de Testes

Os testes são executados em múltiplas versões do Node.js:
- Node.js 16
- Node.js 18
- Última versão LTS do Node.js

### 📊 Relatórios de Teste

- **Relatórios HTML**: Gerados automaticamente após cada execução de teste
- **Artefatos**: Os relatórios são salvos como artefatos no GitHub Actions
- **GitHub Pages**: Os relatórios são publicados no GitHub Pages para fácil acesso

### 📢 Notificações

- **Slack**: Notificações são enviadas para o Slack quando os testes falham
- As notificações incluem informações sobre o workflow, job, branch e um link para a execução

### ⚙️ Configuração

Para configurar as notificações do Slack, adicione o seguinte segredo no seu repositório GitHub:
- `SLACK_WEBHOOK_URL`: URL do webhook do Slack para receber notificações

### 📋 Arquivo de Workflow

O arquivo de workflow está localizado em `.github/workflows/playwright.yml` e pode ser personalizado conforme necessário.

## 📌 Contribuindo
Contribuições são bem-vindas! Siga o padrão de código e abra um PR.

## 📜 Licença
MIT License

---
