import { useState, useEffect } from 'react';

const BudgetLimit = ({ transactions, expenseCategories, limits, setLimits }) => {
  // Kategoriye göre harcamaları hesaplar
  const getCategoryExpenses = (category) => {
    return transactions
      .filter((t) => t.type === 'expense' && t.category === category)
      .reduce((total, t) => total + t.amount, 0);
  };

  // Limit değiştiğinde çalışacak fonksiyon
  const handleLimitChange = (category, limit) => {
    setLimits({ ...limits, [category]: parseFloat(limit) });
  };

  // Uyarı vermek için fonksiyon
  const checkLimits = () => {
    expenseCategories.forEach((category) => {
      const expenses = getCategoryExpenses(category);
      const limit = limits[category] || 0;
      if (limit > 0) {
        if (expenses >= limit * 0.8 && expenses < limit) {
          alert(`${category} kategorisinde limitinizin %80'ine ulaştınız!`);
        } else if (expenses >= limit) {
          alert(`${category} kategorisinde limitinizi aştınız!`);
        }
      }
    });
  };

  // Her işlem değiştiğinde uyarıları kontrol et
  useEffect(() => {
    checkLimits();
  }, [transactions]);

  return (
    <div>
      <h2>Bütçe Limitleri</h2>
      {expenseCategories.map((category) => (
        <div key={category}>
          <label>
            {category}:
            <input
              type="number"
              value={limits[category] || ''}
              onChange={(e) => handleLimitChange(category, e.target.value)}
            />
          </label>
          <p>
            Harcanan: {getCategoryExpenses(category)} / {limits[category] || '∞'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BudgetLimit;