import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ExpenseSummary = ({ expenses }) => {
  const data = expenses.reduce((acc, expense) => {
    const found = acc.find((item) => item.name === expense.category);
    if (found) {
      found.value += parseFloat(expense.amount);
    } else {
      acc.push({ name: expense.category, value: parseFloat(expense.amount) });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="expense-summary">
      <h3>Expense Summary</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpenseSummary;
