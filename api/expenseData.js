import { clientCredentials } from '../utils/client';

const getExpenses = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses`, {
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

const deleteExpensePromise = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

const createExpense = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses`, {
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

const updateExpense = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses/${id}`, {
    method: 'PUT',
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

const getExpensesByUserID = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/expenses/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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

export {
  getExpenses,
  createExpense,
  deleteExpensePromise,
  updateExpense,
  getExpensesByUserID,
};
