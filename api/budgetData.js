import { clientCredentials } from '../utils/client';

const getBudgets = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/budgets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createBudget = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/budgets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getBudgetsByUserID = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/budgets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data).filter((item) => item.user_id.id === id));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getBudgets,
  createBudget,
  getUsers,
  getBudgetsByUserID,
};
