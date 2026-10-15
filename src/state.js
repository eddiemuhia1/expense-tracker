export function createInitialState() {
  return {
    expenses: [],
    homeCurrency: 'KES',
    rates: {}
  };
}

export function addExpense(state, expense) {
  return {
    ...state,
    expenses: [...state.expenses, expense]
  };
}

export function setRates(state, rates) {
  return { ...state, rates };
}

export function setHomeCurrency(state, currency) {
  return { ...state, homeCurrency: currency };
}