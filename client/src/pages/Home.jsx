import { useEffect } from 'react';
import Header from '../components/Header';
import QuickAction from '../components/QuickAction';
import BalanceCard from '../components/BalanceCard';
import { fetchSummary } from '../services/api';
import useFluxStore from '../store/useFluxStore';

export default function Home() {
  const { balance, setBalance } = useFluxStore((s) => ({ balance: s.balance, setBalance: s.setBalance }));

  useEffect(() => {
    fetchSummary().then(({ data }) => setBalance(data.balance)).catch(() => {});
  }, [setBalance]);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-10">
      <Header />
      <BalanceCard balance={balance} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        <QuickAction label="PIX" to="/pix" icon="⇄" />
        <QuickAction label="Pagamentos" to="/pagamentos" icon="₪" />
        <QuickAction label="Recarga" to="/recarga" icon="☎" />
      </div>
    </div>
  );
}
