import { fetchRates } from './api.js';
import { createInitialState, addExpense, setRates, setHomeCurrency } from './state.js';
import { calculateTotal, formatMoney, filterByCategory } from './utils.js';
import { drawExpense, clearExpenses, displayTotal, fillCurrencySelect } from './ui.js';

let state = createInitialState();

const homeCurrencySelect = document.querySelector('#homeCurrency');
const expenseCurrencySelect = document.querySelector('#expenseCurrency');
const statusText = document.querySelector('#status');
const expenseForm = document.querySelector('#expenseForm');
const expensesContainer = document.querySelector('#expenseList');
const totalAmountEl = document.querySelector('#totalAmount');
const categoryFilter = document.querySelector('#categoryFilter');

// Safety check so a wrong ID shows up immediately and clearly
[homeCurrencySelect, expenseCurrencySelect, statusText, expenseForm, expensesContainer, totalAmountEl, categoryFilter]
  .forEach((el, i) => {
    if (!el) console.error(`Element #${i} is null — check your HTML ids.`);
  });

function renderExpenses() {
  console.log('renderExpenses running. Current expenses:', state.expenses);
  clearExpenses(expensesContainer);

  const filtered = filterByCategory(state.expenses, categoryFilter.value);
  filtered.forEach(expense => drawExpense(expense, expensesContainer));

  const total = calculateTotal(filtered, state.homeCurrency, state.rates);
  console.log('Calculated total:', total);
  displayTotal(formatMoney(total, state.homeCurrency), totalAmountEl);
}

async function loadRates(baseCurrency) {
  statusText.textContent = `Loading rates for ${baseCurrency}...`;
  try {
    const rates = await fetchRates(baseCurrency);
    state = setRates(state, rates);
    state = setHomeCurrency(state, baseCurrency);

    const allCodes = Object.keys(rates);
    fillCurrencySelect(homeCurrencySelect, allCodes, baseCurrency);
    fillCurrencySelect(expenseCurrencySelect, allCodes, allCodes.includes('USD') ? 'USD' : allCodes[0]);

    statusText.textContent = `Loaded ${allCodes.length} currencies.`;
    renderExpenses();
  } catch (error) {
    statusText.textContent = error.message;
    console.error('loadRates failed:', error);
  }
}

expenseForm.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('Submit handler fired.'); // if this never logs, it's the validation issue

  const description = document.getElementById('description').value;
  const amount = Number(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const currency = expenseCurrencySelect.value;

  console.log({ description, amount, category, currency });

  if (!description || amount <= 0 || !category) {
    alert('Please fill in description, a valid amount, and a category.');
    return;
  }

  const expense = { id: Date.now(), description, amount, category, currency };
  state = addExpense(state, expense);
  console.log('New state after adding expense:', state);

  expenseForm.reset();
  renderExpenses();
});

homeCurrencySelect.addEventListener('change', (event) => loadRates(event.target.value));
categoryFilter.addEventListener('change', renderExpenses);

loadRates('KES');