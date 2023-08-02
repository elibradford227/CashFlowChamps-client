import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

const BudgetTable = ({
  initialIncome, expenses, editExpense, deleteExpense,
}) => {
  const user = useAuth();
  const remainingBudget = initialIncome - expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  return (
    <div>
      <h2>{user.fbUser.DisplayName}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* Display initial income */}
          <tr>
            <td>Initial Income</td>
            <td>${parseFloat(initialIncome).toFixed(2)}</td>
            <td>-</td>
          </tr>
          {/* Display expenses */}
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.category}</td>
              <td>${parseFloat(expense.price).toFixed(2)}</td>
              <td>{expense.date}</td>
              <td>
                <Button onClick={() => editExpense(expense.id /* updated expense object */)}>Edit</Button>
                <Button onClick={() => deleteExpense(expense.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Expenses: ${expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2)}</p>
      <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
    </div>
  );
};

BudgetTable.propTypes = {
  initialIncome: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  editExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default BudgetTable;
