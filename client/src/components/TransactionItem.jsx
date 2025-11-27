import { ArrowDownLeft, ArrowUpRight, Smartphone, Receipt } from 'lucide-react';

const iconByCategory = {
  Transferência: ArrowUpRight,
  Recebimento: ArrowDownLeft,
  Telefone: Smartphone,
  Contas: Receipt
};

export default function TransactionItem({ tx }) {
  const Icon = iconByCategory[tx.category] || Receipt;
  const amount = Number(tx.amount);
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-flux-red/10 text-flux-red flex items-center justify-center">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-semibold text-flux-dark">{tx.description}</p>
          <p className="text-xs text-flux-gray">{new Date(tx.created_at).toLocaleString('pt-BR')}</p>
        </div>
      </div>
      <div className={`font-bold ${amount < 0 ? 'text-flux-dark' : 'text-green-600'}`}>
        {amount < 0 ? '-' : '+'} R$ {Math.abs(amount).toFixed(2)}
        <p className="text-xs text-flux-gray text-right">{tx.category}</p>
      </div>
    </div>
  );
}
