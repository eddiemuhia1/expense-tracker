
export function drawExpense(expense, container) {
  const expenseItem = document.createElement("div");
  expenseItem.className = "expense-item";

  expenseItem.innerHTML = `
    <h3>${expense.title}</h3>
    <p>Amount: ${expense.amount}</p>
    <p>Category: ${expense.category}</p>
    <p>Currency: ${expense.currency}</p>
  `;

  container.appendChild(expenseItem);
}

export function clearExpenses(container) {
  container.innerHTML = "";
}

export function displayTotal(total, element) {
  element.textContent = `Total Expenses: ${total}`;
}
