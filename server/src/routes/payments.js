import { Router } from 'express';
import { run } from '../db/database.js';
import { categorizeTransaction } from '../utils/categorize.js';

const router = Router();

router.post('/', async (req, res) => {
  const { amount, code, description } = req.body;
  try {
    const category = categorizeTransaction('payment');
    await run(
      'INSERT INTO transactions (type, amount, description, category, metadata) VALUES (?, ?, ?, ?, ?)',
      [
        'payment',
        -Math.abs(amount),
        description || `Pagamento do boleto ${code}`,
        category,
        JSON.stringify({ code })
      ]
    );
    res.json({ message: 'Pagamento registrado com sucesso', confirmation: `Boleto ${code} pago` });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar pagamento', details: err.message });
  }
});

export default router;
