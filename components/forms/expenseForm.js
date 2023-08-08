/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import { useAuth } from '../../utils/context/authContext';
import { createExpense, updateExpense } from '../../api/expenseData';
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';

const initialState = {
  title: '',
  price: '',
  description: '',
};

const ExpenseForm = ({ isOpen, closeModal, obj }) => {
  const [formInput, setFormInputs] = useState(initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (obj) setFormInputs(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj) {
      updateExpense(obj, formInput)
        .then(() => closeModal())
        .catch((err) => console.error(err));
    } else {
      const payload = { ...formInput, budgetId: user.id };
      createExpense(payload)
        .then(({ id }) => updateExpense(id, payload))
        .then(() => closeModal())
        .catch((err) => console.error(err));
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Add Expense</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
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
          <Button type="submit" className="btn btn-primary" onClick={handleSubmit}>
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
  obj: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
  }),
};

ExpenseForm.defaultProps = {
  obj: initialState,
};

export default ExpenseForm;
