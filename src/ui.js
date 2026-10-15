export function clearExpenses(container) {
  container.innerHTML = '';
}

export function drawExpense(expense, container) {
  const li = document.createElement('li');
  li.className = 'expense-item';

  li.innerHTML = `
    <div class="expense-details">
      <span class="expense-description">${expense.description}</span>
    </div>
    <span class="expense-amount">${expense.amount} ${expense.currency}</span>
  `;

  container.appendChild(li);
}

export function displayTotal(text, element) {
  element.textContent = text;
}

export function fillCurrencySelect(select, codes, selectedCode) {
  select.innerHTML = '';
  codes.forEach(code => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = code;
    select.appendChild(option);
  });
  select.value = selectedCode;
}