import { useState } from 'react';
import Header from '../components/Header';
import { payBill } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [code, setCode] = useState('23790.00012 34567.890123 45678.901234 5 67890000012345');
  const [amount, setAmount] = useState('120.00');
  const [confirmation, setConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await payBill({ code, amount: Number(amount) });
    setConfirmation(data.confirmation);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <Header />
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Pagamento de contas</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-flux-gray">Código de barras</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-flux-red"
            />
          </div>
          <div>
            <label className="block text-sm text-flux-gray">Valor</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-flux-red"
            />
          </div>
          <button className="btn-primary w-full" type="submit">Pagar</button>
          {confirmation && <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl p-3">{confirmation}</p>}
        </form>
      </div>
      <button onClick={() => navigate('/home')} className="text-flux-red font-semibold mt-3">Voltar</button>
    </div>
  );
}
