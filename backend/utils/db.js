const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chatapp',
    password: 'F7d8/hb!uS7$#',
    port: 5432,
});

module.exports = { pool }