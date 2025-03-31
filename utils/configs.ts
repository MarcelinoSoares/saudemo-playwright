export const config = {
	browsers: ['chromium', 'firefox', 'webkit'], // Navegadores suportados
	timeout: 30000, // Tempo limite padrão para testes (em milissegundos)
	baseURL: 'http://localhost:3000', // URL base para os testes
	outputDir: './test-results', // Diretório para salvar os resultados dos testes
	retries: 2, // Número de tentativas em caso de falha
};
