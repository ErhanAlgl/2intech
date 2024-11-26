import { useState } from 'react';

const CategoryModal = ({ setIsModalOpen, incomeCategories, expenseCategories, setIncomeCategories, setExpenseCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categoryType, setCategoryType] = useState('income');

  const handleAddCategory = () => {
    if (newCategory) {
      if (categoryType === 'income' && !incomeCategories.includes(newCategory)) {
        setIncomeCategories([...incomeCategories, newCategory]);
      } else if (categoryType === 'expense' && !expenseCategories.includes(newCategory)) {
        setExpenseCategories([...expenseCategories, newCategory]);
      }
      setNewCategory('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Yeni Kategori Ekle</h2>
        <label>
          Kategori Tipi:
          <select value={categoryType} onChange={(e) => setCategoryType(e.target.value)}>
            <option value="income">Gelir</option>
            <option value="expense">Gider</option>
          </select>
        </label>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Yeni Kategori Ekle"
        />
        <button onClick={handleAddCategory}>Ekle</button>
        <button onClick={() => setIsModalOpen(false)}>İptal</button>
      </div>
    </div>
  );
};

export default CategoryModal;