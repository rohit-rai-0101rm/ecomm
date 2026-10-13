export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
