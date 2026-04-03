const express = require('express');
const router  = express.Router();
const db      = require('../db');

/**
 * GET /api/cases
 * List all saved cases (id, title, created_at only – not the full graph)
 */
router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, title, created_at FROM cases ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        res.status(503).json({ error: 'Database unavailable. Please ensure PostgreSQL is running.' });
    }
});

/**
 * GET /api/cases/:id
 * Get a specific saved case with full graph JSON
 */
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM cases WHERE id = $1',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Case not found.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(503).json({ error: 'Database unavailable.' });
    }
});

/**
 * POST /api/cases
 * Save a new case to the database
 * Body: { title, text, graphData }
 */
router.post('/', async (req, res) => {
    const { title, text, graphData } = req.body;
    if (!title || !text || !graphData) {
        return res.status(400).json({ error: 'title, text, and graphData are required.' });
    }
    try {
        const result = await db.query(
            'INSERT INTO cases (title, raw_text, graph_json) VALUES ($1, $2, $3) RETURNING *',
            [title, text, JSON.stringify(graphData)]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(503).json({ error: 'Database unavailable. Could not save case.' });
    }
});

/**
 * DELETE /api/cases/:id
 * Delete a saved case
 */
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query(
            'DELETE FROM cases WHERE id = $1 RETURNING id',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Case not found.' });
        }
        res.json({ message: 'Case deleted successfully.', id: result.rows[0].id });
    } catch (err) {
        res.status(503).json({ error: 'Database unavailable.' });
    }
});

module.exports = router;
