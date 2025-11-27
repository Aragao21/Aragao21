import { Link } from 'react-router-dom';
import useFluxStore from '../store/useFluxStore';

export default function Header() {
  const user = useFluxStore((s) => s.user);
  return (
    <header className="flex items-center justify-between py-4">
      <Link to="/home" className="flex items-center gap-2 text-flux-red font-extrabold text-2xl">
        <div className="w-10 h-10 rounded-2xl bg-flux-red text-white flex items-center justify-center shadow-lg">F</div>
        Flux
      </Link>
      <div className="text-right text-sm text-flux-gray">
        <p className="font-semibold text-flux-dark">{user?.name ?? 'Visitante'}</p>
        <p>Hub financeiro inteligente</p>
      </div>
    </header>
  );
}
