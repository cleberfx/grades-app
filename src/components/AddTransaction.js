import React, { useState } from 'react';
import TransactionDataService from '../services/TransactionService.js';

const AddTransaction = () => {
  const initialTransactionState = {
    id: null,
    description: '',
    category: '',
    type: '',
    value: 0,
  };
  const [transaction, setTransaction] = useState(initialTransactionState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { description, value } = event.target;
    setTransaction({ ...transaction, [description]: value });
  };

  const saveTransaction = () => {
    var data = {
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      value: transaction.value,
    };

    TransactionDataService.create(data)
      .then((response) => {
        setTransaction({
          id: response.data.id,
          description: response.data.description,
          category: response.data.category,
          type: response.data.type,
          value: response.data.value,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTransaction = () => {
    setTransaction(initialTransactionState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTransaction}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="description">Name</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={transaction.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Subject</label>
            <input
              type="text"
              className="form-control"
              id="category"
              required
              value={transaction.category}
              onChange={handleInputChange}
              name="category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              required
              value={transaction.type}
              onChange={handleInputChange}
              name="type"
            />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value</label>
            <input
              type="Number"
              className="form-control"
              id="value"
              required
              value={transaction.value}
              onChange={handleInputChange}
              name="value"
            />
          </div>
          <button onClick={saveTransaction} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
