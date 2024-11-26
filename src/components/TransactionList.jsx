import { useState } from 'react';
import TransactionModal from './TransactionModal';
import LimitModal from './LimitModal';

const TransactionList = ({ transactions, setTransactions, incomeCategories, expenseCategories, limits, setLimits, filterType, setFilterType }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsLimitModalOpen(true);
  };

  const filteredTransactions = transactions.filter((t) => t.type === filterType);

  return (
    <div className="transaction-list">
      <div className="filter-buttons">
        <button onClick={() => setFilterType('income')}>Gelir</button>
        <button onClick={() => setFilterType('expense')}>Gider</button>
      </div>
      <div className="transaction-headers">
        <span>Açıklama</span>
        <span>Tarih</span>
        <span>Tutar</span>
        <span>Kategori</span>
        <span>İşlemler</span>
      </div>
      {filteredTransactions.map((transaction) => (
        <div key={transaction.id} className="transaction-item">
          <div className="description">{transaction.description}</div>
          <div className="date">{transaction.date}</div>
          <div className="amount">{transaction.amount}</div>
          <div className="category" onClick={() => handleCategoryClick(transaction.category)}>{transaction.category}</div>
          <div className="actions">
            <button onClick={() => handleEdit(transaction)}>Edit</button>
            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <TransactionModal
          transaction={selectedTransaction}
          setTransaction={setSelectedTransaction}
          setIsModalOpen={setIsModalOpen}
          transactions={transactions}
          setTransactions={setTransactions}
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
        />
      )}
      {isLimitModalOpen && (
        <LimitModal
          category={selectedCategory}
          limits={limits}
          setLimits={setLimits}
          setIsLimitModalOpen={setIsLimitModalOpen}
        />
      )}
    </div>
  );
};

export default TransactionList;