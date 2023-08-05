import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import WelcomeForm from '../components/forms/WelcomeForm';
// import BudgetTable from '../components/BudgetTable';
import { getBudgetsByUserID } from '../api/budgetData';

function Home() {
  const { user } = useAuth();

  const [budget, setBudget] = useState([]);

  useEffect(() => {
    getBudgetsByUserID(user.id).then((result) => setBudget(result));
  }, [user.id]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {
        budget.length !== 0 ? (
          <>
            <WelcomeForm />
          </>
        ) : (
          <div>
            <h1>Hello {user.fbUser.displayName} </h1>
            <p>Click the button below to logout</p>
            <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        )
    }
    </div>
  );
}

export default Home;
