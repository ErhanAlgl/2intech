import { useState } from 'react';
import CategoryModal from './CategoryModal';

const AddIncomeExpense = ({ transactions, setTransactions, incomeCategories, expenseCategories, setIncomeCategories, setExpenseCategories }) => {
  // form için gerekli stateler
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(), // Benzersiz id oluşturur
      description,
      amount: parseFloat(amount),
      date,
      type,
      category,
    };
    setTransactions([...transactions, newTransaction]);
    // gönderdikten sonra form temizle
    setDescription('');
    setAmount('');
    setDate('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === 'income' ? 'Gelir Ekle' : 'Gider Ekle'}</h2>
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
        <button type="button" onClick={() => setIsModalOpen(true)}>+</button>
      </label>
      <button type="submit">Ekle</button>
      {isModalOpen && (
        <CategoryModal
          setIsModalOpen={setIsModalOpen}
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          setIncomeCategories={setIncomeCategories}
          setExpenseCategories={setExpenseCategories}
        />
      )}
    </form>
  );
};

export default AddIncomeExpense;