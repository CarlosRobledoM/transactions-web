export function parseCurrencyInput(value: string): number {
  const numeric = value.replace(/[^\d.-]/g, "");
  const parsed = Number(numeric);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatCurrency(
  amount: number,
  locale = "es-ES",
  currency = "COP"
) {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });
}
