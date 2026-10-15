
import {
  createInitialState,
  addExpense,
  removeExpense
} from "./state.js";

import {
  calculateTotal,
  formatMoney
} from "./utils.js";

import {
  drawExpense,
  clearExpenses,
  displayTotal
} from "./ui.js";

let state = createInitialState();

const expenseForm = document.getElementById("entryForm");
const expensesContainer = document.getElementById("expensesContainer");
const totalAmount = document.getElementById("totalAmount");

function renderExpenses() {
  clearExpenses(expensesContainer);

  state.expenses.forEach(expense => {
    drawExpense(expense, expensesContainer);
  });

  const total = calculateTotal(state.expenses);

  displayTotal(
    formatMoney(total, state.homeCurrency),
    totalAmount
  );
}

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("expenseTitle").value;
  const amount = Number(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;
  const currency = state.homeCurrency;

  if (!title || amount <= 0) {
    alert("Please enter a valid expense.");
    return;
  }

  const expense = {
    id: Date.now(),
    title,
    amount,
    category,
    currency
  };

  state = addExpense(state, expense);

  expenseForm.reset();

  renderExpenses();
});

renderExpenses();
