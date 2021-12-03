const { Pool } = require('pg');

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB;

const pool = new Pool({
    user,
    password,
    host: host || 'localhost',
    port: port || 5432,
    database,
});

module.exports = pool;
