import { useState } from 'react';
import Header from '../components/Header';
import { receivePix, sendPix } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Pix() {
  const [mode, setMode] = useState('send');
  const [amount, setAmount] = useState('150.00');
  const [counterparty, setCounterparty] = useState('Contato Flux');
  const [receipt, setReceipt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { amount: Number(amount), [mode === 'send' ? 'to' : 'from']: counterparty };
    const action = mode === 'send' ? sendPix : receivePix;
    const { data } = await action(payload);
    setReceipt(data.receipt);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <Header />
      <div className="card mb-4">
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 rounded-xl py-2 font-semibold ${mode === 'send' ? 'bg-flux-red text-white' : 'bg-gray-100'}`}
            onClick={() => setMode('send')}
          >
            Enviar PIX
          </button>
          <button
            className={`flex-1 rounded-xl py-2 font-semibold ${mode === 'receive' ? 'bg-flux-red text-white' : 'bg-gray-100'}`}
            onClick={() => setMode('receive')}
          >
            Receber PIX
          </button>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-flux-gray">Valor</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-flux-red"
            />
          </div>
          <div>
            <label className="block text-sm text-flux-gray">{mode === 'send' ? 'Destinatário' : 'Remetente'}</label>
            <input
              value={counterparty}
              onChange={(e) => setCounterparty(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-flux-red"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            {mode === 'send' ? 'Simular envio' : 'Registrar recebimento'}
          </button>
          {receipt && <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl p-3">{receipt}</p>}
        </form>
      </div>
      <button onClick={() => navigate('/home')} className="text-flux-red font-semibold">Voltar</button>
    </div>
  );
}
