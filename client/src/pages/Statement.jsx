import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TransactionItem from '../components/TransactionItem';
import CategoryChart from '../components/CategoryChart';
import { fetchSummary, fetchTransactions } from '../services/api';
import useFluxStore from '../store/useFluxStore';

export default function Statement() {
  const [transactions, setTransactions] = useState([]);
  const { categories, setCategories, setBalance } = useFluxStore((s) => ({
    categories: s.categories,
    setCategories: s.setCategories,
    setBalance: s.setBalance
  }));

  useEffect(() => {
    fetchTransactions().then(({ data }) => setTransactions(data)).catch(() => {});
    fetchSummary()
      .then(({ data }) => {
        setCategories(data.categories);
        setBalance(data.balance);
      })
      .catch(() => {});
  }, [setBalance, setCategories]);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-12">
      <Header />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-flux-dark">Extrato inteligente</h2>
            <span className="text-sm text-flux-gray">Categorização automática</span>
          </div>
          <div>
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} tx={tx} />
            ))}
            {!transactions.length && <p className="text-flux-gray">Nenhuma transação registrada.</p>}
          </div>
        </div>
        <CategoryChart data={categories} />
      </div>
    </div>
  );
}
