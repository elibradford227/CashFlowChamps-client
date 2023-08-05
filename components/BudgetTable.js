import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getBudgetExpenses } from '../api/budgetData';
import { createExpense } from '../api/expenseData';
import ExpenseForm from './forms/expenseForm';

const BudgetTable = ({
  initialIncome, updateExpense, deleteExpense,
}) => {
  const user = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const totalExpenseAmount = expenses
    ? expenses.reduce((total, expense) => total + parseFloat(expense.price), 0)
    : 0;

  const remainingBudget = initialIncome - totalExpenseAmount;

  const displayUserExpenses = async () => {
    try {
      const userExpenses = await getBudgetExpenses(user.id);
      setExpenses(userExpenses);
    } catch (error) {
      console.error('Error fetching user expenses:', error);
    }
  };

  useEffect(() => {
    displayUserExpenses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
      <Button onClick={openModal}>Add Expense</Button>
      <Modal isOpen={modalIsOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Add Expense</ModalHeader>
        <ModalBody>
          <ExpenseForm addExpense={createExpense} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <p>
        Total Expenses: $
        {expenses && Array.isArray(expenses) && expenses.length > 0
          ? expenses.reduce((total, expense) => total + parseFloat(expense.price), 0).toFixed(2)
          : '0.00'}
      </p>
      <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
    </div>
  );
};

BudgetTable.propTypes = {
  initialIncome: PropTypes.string.isRequired,
  updateExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default BudgetTable;
