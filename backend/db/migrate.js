/**
 * Migration script – creates database tables defined in schema.sql
 * Usage: node db/migrate.js
 */
require('dotenv').config();
const fs   = require('fs');
const path = require('path');
const { pool } = require('./index');

const runMigration = async () => {
    console.log('[Migrate] Reading schema.sql...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    try {
        await pool.query(sql);
        console.log('[Migrate] Migration completed successfully. Tables are ready.');
    } catch (err) {
        console.error('[Migrate] Migration failed:', err.message);
    } finally {
        await pool.end();
        process.exit(0);
    }
};

runMigration();
