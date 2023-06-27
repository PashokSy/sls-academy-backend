require('dotenv').config({ path: '../.env' });

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB_NAME,
  max: 30,
  connectionTimeoutMillis: 60000,
  idleTimeoutMillis: 0,
});

const dbConnectionCheck = async () => {
  try {
    const result = await pool.query('SELECT $1::text as message', [
      'Connection to DB established',
    ]);
    console.log(result.rows[0].message);
  } catch (error) {
    throw error;
  }
};

module.exports = { dbConnectionCheck, pool };
