import { React, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const initialState = {
  income: '',
};

export default function WelcomeForm() {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // eslint-disable-next-line no-undef
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">Welcome, lets create your budget</h2>
      {/* INCOME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Income" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="income"
          value={formInput.income}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">Create Your Budget</Button>
    </Form>
  );
}
