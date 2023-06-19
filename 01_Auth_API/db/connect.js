require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');
const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB_NAME,
});

const dbCheck = async () => {
  try {
    await client.connect();
    const res = await client.query('SELECT $1::text as message', [
      'Connection to DB established',
    ]);
    console.log(res.rows[0].message);
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

module.exports = dbCheck;
