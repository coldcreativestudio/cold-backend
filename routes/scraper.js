const express = require('express');
const router = express.Router();
const { runScrapingPipeline } = require('../services/mapsScraper');

router.post('/iniciar', async (req, res) => {
    const { nicho, cidade } = req.body;
    if (!nicho || !cidade) return res.status(400).json({ error: 'Nicho e cidade obrigatórios' });
    
    // Dispara em background
    runScrapingPipeline(nicho, cidade).catch(console.error);
    
    res.json({ message: 'Scraping iniciado em background', nicho, cidade });
});

module.exports = router;