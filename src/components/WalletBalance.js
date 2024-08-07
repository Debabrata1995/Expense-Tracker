import React from 'react';

const WalletBalance = ({ balance }) => {
  return (
    <div className="wallet-balance">
      <h3>Wallet Balance: ₹{balance}</h3>
    </div>
  );
};

export default WalletBalance;
