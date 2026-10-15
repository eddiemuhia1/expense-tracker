export function convertAmount(amount, fromCurrency, toCurrency, rates) {
  if (!rates[fromCurrency] || !rates[toCurrency]) return null;
  const amountInBase = amount / rates[fromCurrency];
  return amountInBase * rates[toCurrency];
}

export function calculateTotal(expenses, homeCurrency, rates) {
  return expenses.reduce((total, exp) => {
    const converted = convertAmount(exp.amount, exp.currency, homeCurrency, rates);
    return total + (converted ?? 0);
  }, 0);
}

export function formatMoney(amount, currencyCode) {
  return `${amount.toFixed(2)} ${currencyCode}`;
}

export function filterByCategory(expenses, category) {
  if (!category) return expenses;
  return expenses.filter(e => e.category === category);
}