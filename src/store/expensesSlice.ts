import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonExpense {
  id: string;
  name: string;
  amount: number;
}

interface PersonalExpense {
  id: string;
  name: string;
  amount: number;
  installments: number;
  totalAmount: number;
}

interface ExpensesState {
  commonExpenses: CommonExpense[];
  person1Expenses: PersonalExpense[];
  person2Expenses: PersonalExpense[];
  person1Salary: number;
  person2Salary: number;
  person1Name: string;
  person2Name: string;
}

// Cargar el estado inicial desde localStorage
const loadState = (): ExpensesState => {
  try {
    const serializedState = localStorage.getItem('expensesState');
    if (serializedState === null) {
      return {
        commonExpenses: [],
        person1Expenses: [],
        person2Expenses: [],
        person1Salary: 0,
        person2Salary: 0,
        person1Name: 'Persona 1',
        person2Name: 'Persona 2',
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      commonExpenses: [],
      person1Expenses: [],
      person2Expenses: [],
      person1Salary: 0,
      person2Salary: 0,
      person1Name: 'Persona 1',
      person2Name: 'Persona 2',
    };
  }
};

const initialState: ExpensesState = loadState();

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    // Acciones para gastos comunes
    addCommonExpense: (state, action: PayloadAction<CommonExpense>) => {
      state.commonExpenses.push(action.payload);
    },
    updateCommonExpense: (state, action: PayloadAction<{ id: string; name: string; amount: number }>) => {
      const index = state.commonExpenses.findIndex(expense => expense.id === action.payload.id);
      if (index !== -1) {
        state.commonExpenses[index] = {
          ...state.commonExpenses[index],
          name: action.payload.name,
          amount: action.payload.amount,
        };
      }
    },
    removeCommonExpense: (state, action: PayloadAction<string>) => {
      state.commonExpenses = state.commonExpenses.filter(expense => expense.id !== action.payload);
    },

    // Acciones para gastos personales
    addPersonalExpense: (state, action: PayloadAction<{ person: '1' | '2'; expense: PersonalExpense }>) => {
      if (action.payload.person === '1') {
        state.person1Expenses.push(action.payload.expense);
      } else {
        state.person2Expenses.push(action.payload.expense);
      }
    },
    updatePersonalExpense: (state, action: PayloadAction<{ 
      person: '1' | '2'; 
      id: string; 
      name: string; 
      amount: number;
      installments: number;
      totalAmount: number;
    }>) => {
      const expenses = action.payload.person === '1' ? state.person1Expenses : state.person2Expenses;
      const index = expenses.findIndex(expense => expense.id === action.payload.id);
      if (index !== -1) {
        expenses[index] = {
          ...expenses[index],
          name: action.payload.name,
          amount: action.payload.amount,
          installments: action.payload.installments,
          totalAmount: action.payload.totalAmount,
        };
      }
    },
    removePersonalExpense: (state, action: PayloadAction<{ person: '1' | '2'; id: string }>) => {
      if (action.payload.person === '1') {
        state.person1Expenses = state.person1Expenses.filter(expense => expense.id !== action.payload.id);
      } else {
        state.person2Expenses = state.person2Expenses.filter(expense => expense.id !== action.payload.id);
      }
    },

    // Acciones para salarios
    setPerson1Salary: (state, action: PayloadAction<number>) => {
      state.person1Salary = action.payload;
    },
    setPerson2Salary: (state, action: PayloadAction<number>) => {
      state.person2Salary = action.payload;
    },

    // Acciones para nombres de personas
    setPerson1Name: (state, action: PayloadAction<string>) => {
      state.person1Name = action.payload;
    },
    setPerson2Name: (state, action: PayloadAction<string>) => {
      state.person2Name = action.payload;
    },
  },
});

// Middleware para guardar en localStorage
export const saveToLocalStorage = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  if (action.type.startsWith('expenses/')) {
    localStorage.setItem('expensesState', JSON.stringify(store.getState().expenses));
  }
  return result;
};

export const {
  addCommonExpense,
  updateCommonExpense,
  removeCommonExpense,
  addPersonalExpense,
  updatePersonalExpense,
  removePersonalExpense,
  setPerson1Salary,
  setPerson2Salary,
  setPerson1Name,
  setPerson2Name,
} = expensesSlice.actions;

export default expensesSlice.reducer; 