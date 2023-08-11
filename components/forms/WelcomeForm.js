/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { createBudget, getBudgetsByUserID, updateBudget } from '../../api/budgetData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  income: '',
};

export default function WelcomeForm({ initialIncome, obj }) {
  const [formInput, setFormInput] = useState({ income: initialIncome || initialState.income });
  const { user } = useAuth();
  const [userBudget, setUserBudget] = useState(null);

  useEffect(() => {
    getBudgetsByUserID(user.id)
      .then((budget) => {
        if (budget) {
          setUserBudget(budget);
          console.warn(budget, 'budget');
          setFormInput({ income: budget.income });
        }
      })
      .catch((error) => {
        console.error('Error fetching user budget:', error);
      });
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.warn(userBudget, 'userBudget.id');
      const payload = {
        id: userBudget[0].id, income: formInput.income, userId: user.id, total: 0,
      };
      if (userBudget) {
        await updateBudget(payload);
      } else {
        await createBudget(payload);
      }

      window.location.reload(true);
    } catch (error) {
      console.error('Error creating/updating budget:', error);
    }
  };

  return (
    <Form className="welcomeForm" onSubmit={handleSubmit}>
      <h2 id="welcomeFormh2" className="text-white mt-5">
        {obj ? 'Welcome, let&apos;s create your' : 'Edit your'} budget.
      </h2>
      <FloatingLabel controlId="floatingInput1" label="Income" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter your income"
          name="income"
          value={formInput.income}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{!obj ? 'Edit' : 'Create Your'} Budget</Button>
      <hr />
    </Form>
  );
}

WelcomeForm.propTypes = {
  initialIncome: PropTypes.number,
  obj: PropTypes.shape({
    id: PropTypes.number,
    income: PropTypes.number,
    user_id: PropTypes.number,
  }),
};

WelcomeForm.defaultProps = {
  initialIncome: initialState.income,
};
