import React, { useState } from 'react';
import Modal from 'react-modal';

const AddIncomeModal = ({ isOpen, onRequestClose, addIncome }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(amount);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit">Add Income</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddIncomeModal;
