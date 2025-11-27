import { Link } from 'react-router-dom';

export default function QuickAction({ icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex-1 bg-white border border-gray-100 rounded-2xl px-4 py-5 shadow-sm hover:-translate-y-1 transition transform text-center"
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-flux-red/10 text-flux-red flex items-center justify-center text-xl font-bold">
        {icon}
      </div>
      <p className="font-semibold text-flux-dark">{label}</p>
    </Link>
  );
}
