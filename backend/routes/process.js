const express = require('express');
const router = express.Router();
const reasoningEngine = require('../services/reasoningEngine');
const graphBuilder = require('../services/graphBuilder');

router.post('/', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text input is required' });
    }

    try {
        const nodes = reasoningEngine.process(text);
        const graph = graphBuilder.build(nodes);
        res.json(graph);
    } catch (error) {
        console.error("Processing error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
