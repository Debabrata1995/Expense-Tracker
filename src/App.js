// import React, { useState } from 'react';
// import Header from './components/Header/Header';
// import SummarySection from './components/SummarySection/SummarySection';
// import TransactionList from './components/TransactionList/TransactionList';
// import TopExpensesChart from './components/TopExpensesChart/TopExpensesChart';
// import Pagination from './components/Pagination/Pagination';
// import styles from './App.module.css';

// const App = () => {
//   const [transactions] = useState([
//     { title: 'Samosa', date: 'March 20, 2024', amount: 150 },
//     { title: 'Movie', date: 'March 21, 2024', amount: 300 },
//     { title: 'Auto', date: 'March 22, 2024', amount: 50 },
//   ]);
//   const [balance] = useState(4500);
//   const [expenses] = useState(500);
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 1; // Assuming only one page for simplicity

//   return (
//     <div className={styles.app}>
//       <Header />
//       <div className={styles.mainContent}>
//         <SummarySection balance={balance} expenses={expenses} />
//         <div className={styles.chartsContainer}>
//           <TransactionList transactions={transactions} />
//           <TopExpensesChart />
//         </div>
//         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import WalletBalance from './components/WalletBalance';
import AddExpenseModal from './components/AddExpenseModal';
import AddIncomeModal from './components/AddIncomeModal';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseTrends from './components/ExpenseTrends';
import { SnackbarProvider, useSnackbar } from 'notistack';

import './App.css';

const App = () => {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const storedBalance = localStorage.getItem('balance');
    const storedExpenses = localStorage.getItem('expenses');

    if (storedBalance) setBalance(JSON.parse(storedBalance));
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [balance, expenses]);

  const addExpense = (expense) => {
    const expenseAmount = parseFloat(expense.amount);
    if (balance >= expenseAmount) {
      setExpenses([...expenses, expense]);
      setBalance(balance - expenseAmount);
      enqueueSnackbar('Expense added successfully!', { variant: 'success' });
    } else {
      enqueueSnackbar('Insufficient balance!', { variant: 'error' });
    }
  };

  const addIncome = (amount) => {
    setBalance(balance + parseFloat(amount));
    enqueueSnackbar('Income added successfully!', { variant: 'success' });
  };

  const editExpense = (index) => {
    // Implement edit functionality
  };

  const deleteExpense = (index) => {
    const expense = expenses[index];
    setBalance(balance + parseFloat(expense.amount));
    setExpenses(expenses.filter((_, i) => i !== index));
    enqueueSnackbar('Expense deleted successfully!', { variant: 'success' });
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <h1>Expense Tracker</h1>
        <WalletBalance balance={balance} />
        <button onClick={() => setIsAddIncomeOpen(true)}>+ Add Income</button>
        <button onClick={() => setIsAddExpenseOpen(true)}>+ Add Expense</button>
        <AddIncomeModal isOpen={isAddIncomeOpen} onRequestClose={() => setIsAddIncomeOpen(false)} addIncome={addIncome} />
        <AddExpenseModal isOpen={isAddExpenseOpen} onRequestClose={() => setIsAddExpenseOpen(false)} addExpense={addExpense} />
        <ExpenseList expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense} />
        <ExpenseSummary expenses={expenses} />
        <ExpenseTrends expenses={expenses} />
      </div>
    </SnackbarProvider>
  );
};

export default App;

