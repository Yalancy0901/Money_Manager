import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');

  const handleAddTransaction = () => {
    if (description && amount) {
      const newTransaction = {
        id: transactions.length + 1,
        description,
        amount: parseFloat(amount),
        type,
        date: new Date()
      };
      setTransactions([...transactions, newTransaction]);
      setAmount('');
      setDescription('');
    }
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income'
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
  };

  const calculateTotalIncome = () => {
    return transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const calculateTotalExpense = () => {
    return transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const getMonthlyTransactions = () => {
    const months = {};
    transactions.forEach(transaction => {
      const month = transaction.date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!months[month]) {
        months[month] = [];
      }
      months[month].push(transaction);
    });
    return months;
  };

  const monthlyTransactions = getMonthlyTransactions();

  return (
    <div className="App">
      <header>
        <h1>Money Manager</h1>
      </header>
      <main>
        <div className="summary">
          <div className="box income">
            <h3>Total Income</h3>
            <p>${calculateTotalIncome().toFixed(2)}</p>
          </div>
          <div className="box expense">
            <h3>Total Expense</h3>
            <p>${calculateTotalExpense().toFixed(2)}</p>
          </div>
          <div className="box balance">
            <h3>Balance</h3>
            <p>${calculateBalance().toFixed(2)}</p>
          </div>
        </div>
        <div className="container">
          <div className="calculator">
            <div className="transaction-form">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <button onClick={handleAddTransaction}>Add Transaction</button>
            </div>
          </div>
          <div className="transactions">
            <h3>Transactions by Month</h3>
            {Object.keys(monthlyTransactions).map(month => (
              <div key={month} className="month">
                <h4>{month}</h4>
                <ul>
                  {monthlyTransactions[month].map(transaction => (
                    <li key={transaction.id} className={transaction.type}>
                      <span>{transaction.description}</span>
                      <span>${transaction.amount.toFixed(2)}</span>
                      <span>({transaction.type})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
