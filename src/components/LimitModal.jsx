import { useState } from 'react';

const LimitModal = ({ category, limits, setLimits, setIsLimitModalOpen }) => {
  const [limit, setLimit] = useState(limits[category] || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLimits({ ...limits, [category]: parseFloat(limit) });
    setIsLimitModalOpen(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{category} Kategorisi için Limit Belirle</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Limit:
            <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} required />
          </label>
          <button type="submit">Kaydet</button>
          <button type="button" onClick={() => setIsLimitModalOpen(false)}>İptal</button>
        </form>
      </div>
    </div>
  );
};

export default LimitModal;