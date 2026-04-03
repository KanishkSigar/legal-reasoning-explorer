require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT || '5432'),
    user:     process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME     || 'legal_explorer',
});

// Test connection on startup
pool.connect((err, client, release) => {
    if (err) {
        console.warn('[DB] Warning: Could not connect to PostgreSQL:', err.message);
        console.warn('[DB] Case history features will be disabled. The rest of the API still works.');
    } else {
        console.log('[DB] Connected to PostgreSQL successfully.');
        release();
    }
});

/**
 * Safe query helper – returns null on DB error so routes can gracefully degrade.
 */
const query = async (text, params) => {
    try {
        return await pool.query(text, params);
    } catch (err) {
        console.error('[DB] Query error:', err.message);
        throw err;
    }
};

module.exports = { query, pool };
