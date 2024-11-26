import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns'; // date-fns kütüphanesi ile tarih formatlama

const Reports = ({ transactions }) => {
  // Aylık gelir ve giderleri hesaplar
  const monthlyData = transactions.reduce((acc, t) => {
    const month = format(new Date(t.date), 'MMMM'); // Tarihi ay adına çeviriyoruz.
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (t.type === 'income') acc[month].income += t.amount;
    else acc[month].expense += t.amount;
    return acc;
  }, {});

  // Grafik için veriyi hazırlar
  const data = Object.keys(monthlyData).map((month) => ({
    month,
    income: monthlyData[month].income,
    expense: monthlyData[month].expense,
  }));

  return (
    <div>
      <h2>Aylık Rapor</h2>
      <BarChart width={350} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#8884d8" />
        <Bar dataKey="expense" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default Reports;