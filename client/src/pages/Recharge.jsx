import { useState } from 'react';
import Header from '../components/Header';
import { recharge } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Recharge() {
  const [phone, setPhone] = useState('(11) 99999-9999');
  const [amount, setAmount] = useState('30.00');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await recharge({ phone, amount: Number(amount) });
    setMessage(`Recarga de R$ ${amount} para ${data.phone} registrada.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <Header />
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recarga de celular</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-flux-gray">Número</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <button type="submit" className="btn-primary w-full">Confirmar recarga</button>
          {message && <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl p-3">{message}</p>}
        </form>
      </div>
      <button onClick={() => navigate('/home')} className="text-flux-red font-semibold mt-3">Voltar</button>
    </div>
  );
}
