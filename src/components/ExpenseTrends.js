import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExpenseTrends = ({ expenses }) => {
  const data = expenses.reduce((acc, expense) => {
    const found = acc.find((item) => item.name === expense.category);
    if (found) {
      found.value += parseFloat(expense.amount);
    } else {
      acc.push({ name: expense.category, value: parseFloat(expense.amount) });
    }
    return acc;
  }, []);

  return (
    <div className="expense-trends">
      <h3>Expense Trends</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ExpenseTrends;
