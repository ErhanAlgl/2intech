import { useState, useEffect } from 'react';

const TransactionModal = ({ transaction, setTransaction, setIsModalOpen, transactions, setTransactions, incomeCategories, expenseCategories }) => {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date);
  const [type, setType] = useState(transaction.type);
  const [category, setCategory] = useState(transaction.category);

  useEffect(() => {
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setDate(transaction.date);
    setType(transaction.type);
    setCategory(transaction.category);
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTransaction = {
      ...transaction,
      description,
      amount: parseFloat(amount),
      date,
      type,
      category,
    };
    setTransactions(transactions.map((t) => (t.id === transaction.id ? updatedTransaction : t)));
    setIsModalOpen(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>İşlemi Düzenle</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Açıklama:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <label>
            Tutar:
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </label>
          <label>
            Tarih:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <label>
            Tip:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Gelir</option>
              <option value="expense">Gider</option>
            </select>
          </label>
          <label>
            Kategori:
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Seçiniz</option>
              {type === 'income'
                ? incomeCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                : expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
            </select>
          </label>
          <button type="submit">Kaydet</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>İptal</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;