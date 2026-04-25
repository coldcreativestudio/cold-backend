const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock login simples para MVP
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@coldhunter.com' && password === 'admin123') {
        const token = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

module.exports = router;