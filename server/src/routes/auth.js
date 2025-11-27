import { Router } from 'express';
import { get } from '../db/database.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
    res.json({ id: user.id, name: user.name, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao autenticar', details: err.message });
  }
});

export default router;
