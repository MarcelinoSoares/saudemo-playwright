// Capitaliza a primeira letra de uma string
export function capitalize(text: string): string {
	if (!text) return '';
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Trunca uma string se ela exceder um comprimento máximo
export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + '...';
}

// Remove duplicados de um array
export function removeDuplicates<T>(array: T[]): T[] {
	return Array.from(new Set(array));
}

// Divide um array em pedaços menores
export function chunkArray<T>(array: T[], size: number): T[][] {
	const result: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}
	return result;
}

// Formata uma data no formato DD/MM/YYYY
export function formatDate(date: Date): string {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

// Calcula a diferença em dias entre duas datas
export function daysBetween(date1: Date, date2: Date): number {
	const diffTime = Math.abs(date2.getTime() - date1.getTime());
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Verifica se um e-mail é válido
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Verifica se uma string é um número
export function isNumeric(value: string): boolean {
	return !isNaN(Number(value));
}

// Gera um número aleatório entre dois valores
export function randomBetween(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Faz um "debounce" de uma função (útil para otimizar eventos como scroll ou input)
export function debounce(
	func: Function,
	wait: number
): (...args: any[]) => void {
	let timeout: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}
