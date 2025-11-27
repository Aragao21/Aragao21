import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Pix from './pages/Pix.jsx';
import Payment from './pages/Payment.jsx';
import Recharge from './pages/Recharge.jsx';
import Statement from './pages/Statement.jsx';
import useFluxStore from './store/useFluxStore';

function PrivateRoute({ children }) {
  const user = useFluxStore((s) => s.user);
  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-flux-dark">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/pix"
          element={
            <PrivateRoute>
              <Pix />
            </PrivateRoute>
          }
        />
        <Route
          path="/pagamentos"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path="/recarga"
          element={
            <PrivateRoute>
              <Recharge />
            </PrivateRoute>
          }
        />
        <Route
          path="/extrato"
          element={
            <PrivateRoute>
              <Statement />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
