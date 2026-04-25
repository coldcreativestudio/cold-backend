const express = require('express');
const router = express.Router();
const Lead = require('../models/leadModel');

router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (req.query.nicho) filters.nicho = req.query.nicho;
        if (req.query.status) filters.status = req.query.status;
        const leads = await Lead.find(filters).sort({ dataCriacao: -1 }).limit(100);
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id/status', async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(lead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;