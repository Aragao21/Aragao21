import { Router } from 'express';
import { run } from '../db/database.js';
import { categorizeTransaction } from '../utils/categorize.js';

const router = Router();

router.post('/send', async (req, res) => {
  const { amount, to, description } = req.body;
  try {
    const category = categorizeTransaction('pix_send');
    await run(
      'INSERT INTO transactions (type, amount, description, category, metadata) VALUES (?, ?, ?, ?, ?)',
      ['pix_send', -Math.abs(amount), description || `PIX para ${to}`, category, JSON.stringify({ to })]
    );
    const receipt = `PIX enviado para ${to} no valor de R$ ${Number(amount).toFixed(2)} | Protocolo ${Date.now()}`;
    res.json({ message: 'PIX enviado com sucesso', receipt });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar PIX', details: err.message });
  }
});

router.post('/receive', async (req, res) => {
  const { amount, from, description } = req.body;
  try {
    const category = categorizeTransaction('pix_receive');
    await run(
      'INSERT INTO transactions (type, amount, description, category, metadata) VALUES (?, ?, ?, ?, ?)',
      ['pix_receive', Math.abs(amount), description || `PIX de ${from}`, category, JSON.stringify({ from })]
    );
    const receipt = `PIX recebido de ${from} no valor de R$ ${Number(amount).toFixed(2)} | Protocolo ${Date.now()}`;
    res.json({ message: 'PIX recebido', receipt });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar PIX recebido', details: err.message });
  }
});

export default router;
