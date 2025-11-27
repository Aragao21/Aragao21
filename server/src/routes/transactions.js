import { Router } from 'express';
import { all } from '../db/database.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const transactions = await all(
      'SELECT id, type, amount, description, category, metadata, created_at FROM transactions ORDER BY datetime(created_at) DESC'
    );
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar transações', details: err.message });
  }
});

router.get('/summary', async (_req, res) => {
  try {
    const rows = await all(
      `SELECT category, SUM(amount) as total FROM transactions GROUP BY category`
    );
    const balanceRow = await all('SELECT SUM(amount) as balance FROM transactions');
    const balance = balanceRow[0]?.balance || 0;
    res.json({ balance, categories: rows });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao resumir transações', details: err.message });
  }
});

export default router;
