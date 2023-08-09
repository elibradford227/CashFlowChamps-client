// eslint-disable-next-line react/no-deprecated
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import WelcomeForm from './WelcomeForm';

export default function EditIncomeForm({ currentIncome }) {
  const [editingIncome, setEditingIncome] = useState(false);

  const handleEditIncomeClick = () => {
    setEditingIncome(true);
  };

  useEffect(() => {
    setEditingIncome(false);
  }, [currentIncome]);

  return (
    <div>
      {editingIncome ? (
        <WelcomeForm initialIncome={currentIncome} />
      ) : (
        <div>
          <p>Your current income: {currentIncome}</p>
          <Button onClick={handleEditIncomeClick}>Edit Income</Button>
        </div>
      )}
    </div>
  );
}
EditIncomeForm.propTypes = {
  currentIncome: PropTypes.number,
};
EditIncomeForm.defaultProps = {
  currentIncome: 0,

};
