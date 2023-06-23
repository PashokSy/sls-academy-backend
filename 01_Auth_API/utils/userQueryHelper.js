const { pool } = require('../db/connect');

const userFindOneByEmail = async (email) => {
  const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
    email,
  ]);

  return await user.rows[0];
};

const userInsert = async (userData) => {
  const user = await pool.query(
    'INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *',
    [userData.email, userData.hashedPassword]
  );

  return await user.rows[0];
};

const userDeleteById = async (id) => {
  await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
};

module.exports = { userFindOneByEmail, userInsert, userDeleteById };
