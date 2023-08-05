import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getBudgetExpenses, getBudgetsByUserID } from '../api/budgetData';
import ExpenseForm from './forms/expenseForm';

const BudgetTable = ({
  initialIncome, updateExpense, deleteExpense,
}) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

  const totalExpenseAmount = expenses
    ? expenses.reduce((total, expense) => total + parseFloat(expense.price), 0)
    : 0;

  const remainingBudget = initialIncome - totalExpenseAmount;

  const displayUserExpenses = async () => {
    try {
      const userBudgets = await getBudgetsByUserID(user.id);

      if (userBudgets.length > 0) {
        const budgetExpenses = await getBudgetExpenses(userBudgets[0].id);
        const returnedExpenses = budgetExpenses.map((expense) => expense.expense_id);
        setExpenses(returnedExpenses);
      }
    } catch (error) {
      console.error('Error fetching user expenses:', error);
    }
  };

  useEffect(() => {
    displayUserExpenses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const openExpenseForm = () => {
    setIsExpenseFormOpen(true);
  };

  const closeExpenseForm = () => {
    setIsExpenseFormOpen(false);
  };

  return (
    <div>
      <h2>{user && user.displayName}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses && Array.isArray(expenses) && expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>{expense.description}</td>
                <td>${parseFloat(expense.price).toFixed(2)}</td>
                <td>
                  <Button onClick={() => updateExpense(expense.id)}>Edit</Button>
                  <Button variant="danger" onClick={() => deleteExpense(expense.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No expenses to display</td>
            </tr>
          )}
        </tbody>
      </table>
      <Button onClick={openExpenseForm}>Add Expense</Button>
      <ExpenseForm isOpen={isExpenseFormOpen} closeModal={closeExpenseForm} />
      <p>
        Total Expenses: $
        {expenses
          ? expenses.reduce((total, expense) => total + parseFloat(expense.price), 0).toFixed(2)
          : '0.00'}
      </p>
      <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
    </div>
  );
};

BudgetTable.propTypes = {
  initialIncome: PropTypes.number.isRequired,
  updateExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default BudgetTable;
