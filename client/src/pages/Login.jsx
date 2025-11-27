import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFluxStore from '../store/useFluxStore';
import { login } from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('fluxuser');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useFluxStore((s) => s.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      setUser(data);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao entrar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-red-50 px-4">
      <div className="max-w-md w-full card">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 rounded-3xl bg-flux-red text-white flex items-center justify-center text-2xl font-extrabold shadow-lg mb-3">
            F
          </div>
          <h1 className="text-2xl font-bold text-flux-dark">Flux</h1>
          <p className="text-flux-gray">Hub financeiro móvel, seguro e inteligente</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-flux-gray mb-1">Usuário</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-flux-red"
            />
          </div>
          <div>
            <label className="block text-sm text-flux-gray mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-flux-red"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full">Entrar</button>
          <p className="text-xs text-center text-flux-gray">Use: fluxuser / 1234</p>
        </form>
      </div>
    </div>
  );
}
