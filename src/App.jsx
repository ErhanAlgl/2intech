import { useState, useEffect } from 'react';
import AddIncomeExpense from './components/AddIncomeExpense';
import Reports from './components/Reports';
import TransactionList from './components/TransactionList';

const defaultIncomeCategories = ['Maaş', 'Yatırım Geliri', 'Hediye'];
const defaultExpenseCategories = ['Yemek', 'Eğlence', 'Gıda', 'Fatura', 'Kira', 'Sağlık', 'Ulaşım', 'Giyecek', 'Diğer'];

const App = () => {
  // işlemleri, gelir kategorilerini ve gider kategorilerini tutan state
  const [transactions, setTransactions] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState(defaultIncomeCategories);
  const [expenseCategories, setExpenseCategories] = useState(defaultExpenseCategories);
  const [limits, setLimits] = useState({});
  const [filterType, setFilterType] = useState('income'); // Gelir veya gider filtresi

  // uygulama yüklendiğinde localStorage dan verileri alır
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const storedIncomeCategories = JSON.parse(localStorage.getItem('incomeCategories')) || defaultIncomeCategories;
    const storedExpenseCategories = JSON.parse(localStorage.getItem('expenseCategories')) || defaultExpenseCategories;
    const storedLimits = JSON.parse(localStorage.getItem('limits')) || {};
    setTransactions(storedTransactions);
    setIncomeCategories(storedIncomeCategories);
    setExpenseCategories(storedExpenseCategories);
    setLimits(storedLimits);
  }, []);

  // işlemler değiştiğinde localstorage'a kaydeder
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // gelir kategorileri değiştiğinde localstorage'a kaydeder
  useEffect(() => {
    localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories));
  }, [incomeCategories]);

  // gider kategorileri değiştiğinde localgtorage'a kaydeder
  useEffect(() => {
    localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
  }, [expenseCategories]);

  // limitler değiştiğinde localStorage'a kaydeder
  useEffect(() => {
    localStorage.setItem('limits', JSON.stringify(limits));
  }, [limits]);

  return (
    <div className="App">
      <h1>Kişisel Bütçe ve Harcama Takip Uygulaması</h1>
      <AddIncomeExpense
        transactions={transactions}
        setTransactions={setTransactions}
        incomeCategories={incomeCategories}
        expenseCategories={expenseCategories}
        setIncomeCategories={setIncomeCategories}
        setExpenseCategories={setExpenseCategories}
      />
      <Reports transactions={transactions} />
      <TransactionList
        transactions={transactions}
        setTransactions={setTransactions}
        incomeCategories={incomeCategories}
        expenseCategories={expenseCategories}
        limits={limits}
        setLimits={setLimits}
        filterType={filterType}
        setFilterType={setFilterType}
      />
    </div>
  );
};

export default App;