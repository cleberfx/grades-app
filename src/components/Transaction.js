import React, { useState, useEffect } from 'react';
import TransactionDataService from '../services/TransactionService.js';

const Transaction = (props) => {
  const initialTransactionState = {
    id: null,
    description: '',
    category: '',
    type: '',
    value: 0,
  };
  const [currentTransaction, setCurrentTransaction] = useState(
    initialTransactionState
  );
  const [message, setMessage] = useState('');

  const getTransaction = (id) => {
    TransactionDataService.get(id)
      .then((response) => {
        setCurrentTransaction(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTransaction(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { description, value } = event.target;
    setCurrentTransaction({ ...currentTransaction, [description]: value });
  };

  const updateTransaction = () => {
    TransactionDataService.update(currentTransaction.id, currentTransaction)
      .then((response) => {
        setMessage('The transaction was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTransaction = () => {
    TransactionDataService.remove(currentTransaction.id)
      .then((response) => {
        props.history.push('/transaction');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTransaction ? (
        <div className="edit-form">
          <h4>Transaction</h4>
          <form>
            <div className="form-group">
              <label htmlFor="description">Name</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTransaction.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Subject</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={currentTransaction.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                name="type"
                value={currentTransaction.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="value">Value</label>
              <input
                type="number"
                className="form-control"
                id="value"
                name="value"
                value={currentTransaction.value}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            className="badge badge-danger mr-2"
            onClick={deleteTransaction}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTransaction}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Transaction...</p>
        </div>
      )}
    </div>
  );
};

export default Transaction;
