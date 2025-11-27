import { Router } from 'express';
import { run } from '../db/database.js';
import { categorizeTransaction } from '../utils/categorize.js';

const router = Router();

router.post('/', async (req, res) => {
  const { amount, phone, description } = req.body;
  try {
    const category = categorizeTransaction('recharge');
    await run(
      'INSERT INTO transactions (type, amount, description, category, metadata) VALUES (?, ?, ?, ?, ?)',
      [
        'recharge',
        -Math.abs(amount),
        description || `Recarga para ${phone}`,
        category,
        JSON.stringify({ phone })
      ]
    );
    res.json({ message: 'Recarga simulada com sucesso', phone });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar recarga', details: err.message });
  }
});

export default router;
