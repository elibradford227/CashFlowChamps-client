/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import { useAuth } from '../../utils/context/authContext';
// eslint-disable-next-line no-unused-vars
import { createExpense, updateExpense } from '../../api/expenseData';
import { getBudgetsByUserID, createBudgetExpense } from '../../api/budgetData';

const initialState = {
  title: '',
  price: '',
  description: '',
};

const ExpenseForm = ({ isOpen, closeModal, obj }) => {
  const [formInput, setFormInputs] = useState(initialState);
  const { user } = useAuth();
  const [userBudget, setUserBudget] = useState([]);

  useEffect(() => {
    if (obj) {
      setFormInputs(obj);
    } else {
      setFormInputs(initialState);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const displayUserExpenses = async () => {
  //   try {
  //     const userExpenses = await getBudgetsByUserID(user.id);

  //     if (userExpenses.length > 0) {
  //       const budgetExpenses = await getBudgetExpenses(userExpenses[0].id);
  //       const returnedExpenses = budgetExpenses.map((expense) => expense.expense_id);
  //       setExpenses(returnedExpenses);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user expenses:', error);
  //   }
  // };
  useEffect(() => {
    getBudgetsByUserID(user.id).then(setUserBudget);
  }, [user.id]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (obj) {
      const payload = { userId: obj.user_id, ...formInput };
      const keys = Object.keys(payload);
      delete payload[keys[keys.length - 1]];
      updateExpense(obj.id, payload);
      window.location.reload();
    } else {
      const payload = {
        ...formInput,
        userId: user.id,
      };
      await createExpense(payload).then((item) => {
        if (userBudget.length > 0) {
          const userBudgetId = userBudget[0].id;
          createBudgetExpense({ budgetId: userBudgetId, expenseId: item.id });
          // await displayUserExpenses();
          setFormInputs(initialState);
          window.location.reload();
        }
      });
    }

    // const payload = {
    //   ...formInput,
    //   userId: user.id,
    // };
    // await createExpense(payload).then((item) => {
    //   if (userBudget.length > 0) {
    //     const userBudgetId = userBudget[0].id;
    //     createBudgetExpense({ budgetId: userBudgetId, expenseId: item.id });
    //     // await displayUserExpenses();
    //     setFormInputs(initialState);
    //     window.location.reload();
    //   }
    // });
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Add Expense</ModalHeader>
      <ModalBody>
        <Form onSubmit={HandleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              value={formInput.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              type="number"
              id="price"
              name="price"
              value={formInput.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formInput.description}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Add Expense
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ExpenseForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
  }),
};

ExpenseForm.defaultProps = {
  obj: initialState,
};

export default ExpenseForm;
