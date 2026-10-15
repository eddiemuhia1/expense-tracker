
export function convert(amount, rate) {
  return amount * rate;
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);
}

export function formatMoney(amount, currency = "KES") {
  return `${currency} ${Number(amount).toFixed(2)}`;
}
