import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import pixRoutes from './routes/pix.js';
import paymentRoutes from './routes/payments.js';
import rechargeRoutes from './routes/recharge.js';
import transactionRoutes from './routes/transactions.js';
import { initializeDatabase } from './db/database.js';

const app = express();
const PORT = process.env.PORT || 4000;

initializeDatabase();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Flux API está rodando');
});

app.use('/api/auth', authRoutes);
app.use('/api/pix', pixRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/recharge', rechargeRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => console.log(`Flux API ouvindo na porta ${PORT}`));
