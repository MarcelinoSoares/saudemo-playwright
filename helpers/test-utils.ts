import {type Product} from '../fixtures/products';

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function calculateSubtotal(items: Product[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

export function sortByNameAsc(items: Product[]): Product[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortByNameDesc(items: Product[]): Product[] {
  return [...items].sort((a, b) => b.name.localeCompare(a.name));
}

export function sortByPriceAsc(items: Product[]): Product[] {
  return [...items].sort((a, b) => a.price - b.price);
}

export function sortByPriceDesc(items: Product[]): Product[] {
  return [...items].sort((a, b) => b.price - a.price);
}
