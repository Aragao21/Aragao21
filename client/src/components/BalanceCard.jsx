import { Link } from 'react-router-dom';

export default function BalanceCard({ balance }) {
  return (
    <div className="card bg-gradient-to-r from-flux-red to-red-700 text-white flex justify-between items-center">
      <div>
        <p className="text-sm opacity-80">Saldo atual</p>
        <p className="text-3xl font-extrabold">R$ {Number(balance).toFixed(2)}</p>
      </div>
      <Link to="/extrato" className="bg-white text-flux-red font-semibold px-4 py-2 rounded-xl shadow">
        Ver extrato
      </Link>
    </div>
  );
}
