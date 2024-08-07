import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  return (
    <div className="expense-list">
      <h3>Recent Transactions</h3>
      {expenses.map((expense, index) => (
        <div key={index} className="expense-item">
          <span>{expense.title}</span>
          <span>₹{expense.amount}</span>
          <span>{expense.category}</span>
          <span>{expense.date}</span>
          <FaEdit onClick={() => editExpense(index)} />
          <FaTrash onClick={() => deleteExpense(index)} />
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
