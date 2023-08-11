/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getBudgetExpenses, getBudgetsByUserID } from '../api/budgetData';
import ExpenseForm from './forms/expenseForm';
import { deleteExpensePromise } from '../api/expenseData';

const BudgetTable = ({
  initialIncome,
}) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

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

  const deleteExpenseFunc = (id) => {
    if (window.confirm('Delete this expense?')) {
      deleteExpensePromise(id).then(() => displayUserExpenses());
    }
  };

  return (
    <div>
      <h2>{user && user.displayName}</h2>
      <table
        style={{
          border: '1px solid lightgrey',
        }}
      >
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
              <tr
                key={expense.id}
                style={{
                  border: '1px solid lightgrey',
                }}
              >
                <td>{expense.title}</td>
                <td>{expense.description}</td>
                <td>${parseFloat(expense.price).toFixed(2)}</td>
                <td>
                  <Button
                    className="tablebutton"
                    onClick={() => {
                      setSelectedExpense(expense); // Set the selected expense before opening the modal
                      openExpenseForm();
                    }}
                  >
                    <img src="edit.png" className="icon" alt="editbutton" />
                  </Button>
                  <Button className="tablebutton" variant="danger" onClick={() => deleteExpenseFunc(expense.id)}><img src="bin.png" className="icon" alt="trash" /></Button>
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
      <Button onClick={() => {
        setSelectedExpense(null);
        openExpenseForm();
      }}
      >Add Expense
      </Button>
      <ExpenseForm isOpen={isExpenseFormOpen} closeModal={closeExpenseForm} obj={selectedExpense} />
      <hr />
      <p>
        Total Expenses: $
        {expenses
          ? expenses.reduce((total, expense) => total + parseFloat(expense.price), 0).toFixed(2)
          : '0.00'}
      </p>
      <hr />
      <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
      <hr />
    </div>
  );
};

BudgetTable.propTypes = {
  initialIncome: PropTypes.number.isRequired,
};

export default BudgetTable;
